import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Header, Sidebar, NotificationPanel, Footer } from '../../components/ui/StudentUi.jsx';
import { getGroupInfoById, removeMember, createGroup, addMember } from '../../api/groupApi';
import { useAuth } from '../../context/AuthContext';

const ProjectDetails = () => {
    const [groupInfo, setGroupInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();
    const [isUserLeader, setIsUserLeader] = useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);

    useEffect(() => {
        const fetchGroupInfo = async () => {
            try {
                if (!auth?.result?.accountId || !auth?.result?.token) {
                    throw new Error('Account ID or token not found');
                }

                const response = await getGroupInfoById(auth.result.accountId, auth.result.token);
                if (response.isSuccess) {
                    setGroupInfo(response.result);
                    
                    // Simplified leader check - just compare current user's code with leader's code
                    const leaderMember = response.result.group.members.find(
                        member => member.fullName === response.result.group.leaderName
                    );
                    setIsUserLeader(auth.result.userCode === leaderMember?.userCode);
                }
            } catch (err) {
                console.error('Failed to fetch group info:', err);
                // If it's a 404 error, set groupInfo to null but don't set error
                if (err.response?.status === 404) {
                    setGroupInfo(null);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGroupInfo();
    }, [auth]);

    const handleRemoveMember = async (memberToRemove) => {
        try {
            if (!isUserLeader || !auth?.result?.token) {
                alert("Only group leaders can remove members");
                return;
            }

            const groupId = groupInfo.group.id;
            const newLeaderUserCode = auth.result.userCode;

            const response = await removeMember(
                groupId,
                memberToRemove.userCode,
                auth.result.userCode,
                newLeaderUserCode,
                auth.result.token
            );

            if (!response.isSuccess) {
                alert(response.message || "Failed to remove member");
                return;
            }

            // Only refresh data if removal was successful
            const refreshedData = await getGroupInfoById(auth.result.accountId, auth.result.token);
            if (refreshedData.isSuccess) {
                setGroupInfo(refreshedData.result);
            }
        } catch (error) {
            console.error("Failed to remove member:", error);
            alert(error.response?.data?.message || "Failed to remove member. Please try again.");
        }
    };

    const handleAddMember = async (memberCode) => {
        try {
            if (!isUserLeader || !auth?.result?.token) {
                alert("Only group leaders can add members");
                return;
            }

            if (groupInfo.group.members.length >= 5) {
                alert("Maximum 5 members allowed in a group");
                return;
            }

            const response = await addMember(
                groupInfo.group.id,
                memberCode,
                auth.result.userCode,
                auth.result.token
            );

            if (!response.isSuccess) {
                alert(response.message || "Failed to add member");
                return;
            }

            // Refresh data after successful addition
            const refreshedData = await getGroupInfoById(auth.result.accountId, auth.result.token);
            if (refreshedData.isSuccess) {
                setGroupInfo(refreshedData.result);
            }
        } catch (error) {
            console.error("Failed to add member:", error);
            alert(error.response?.data?.message || "Failed to add member. Please try again.");
        }
    };

    const groupValidationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Group name is required')
            .min(3, 'Group name must be at least 3 characters'),
        memberUserCodes: Yup.array()
            .of(Yup.string().required('Member code is required'))
            .min(4, 'Group must have at least 4 members')
            .max(5, 'Maximum 5 members allowed')
    });

    const handleCreateGroup = async (values, { setSubmitting }) => {
        try {
            const filteredMemberCodes = values.memberUserCodes.filter(code => code.trim() !== '');
            
            // Validate member count including the leader
            if (filteredMemberCodes.length < 3) { // 3 other members + leader = 4 minimum
                alert("Group must have at least 4 members including the leader");
                setSubmitting(false);
                return;
            }

            if (!filteredMemberCodes.includes(auth.result.userCode)) {
                filteredMemberCodes.push(auth.result.userCode);
            }

            if (filteredMemberCodes.length > 5) {
                alert("Group cannot have more than 5 members including the leader");
                setSubmitting(false);
                return;
            }

            const groupData = {
                name: values.name,
                leaderUserCode: auth.result.userCode,
                memberUserCodes: filteredMemberCodes
            };

            setIsCreatingGroup(true);
            const response = await createGroup(groupData, auth.result.token);
            
            if (response.isSuccess) {
                const refreshedData = await getGroupInfoById(auth.result.accountId, auth.result.token);
                if (refreshedData.isSuccess) {
                    setGroupInfo(refreshedData.result);
                }
            }
        } catch (error) {
            console.error("Failed to create group:", error);
            alert(error.response?.data?.message || "Failed to create group. Please try again.");
        } finally {
            setIsCreatingGroup(false);
            setSubmitting(false);
        }
    };

    const CreateGroupForm = () => (
        <Formik
            initialValues={{
                name: '',
                memberUserCodes: ['', '', ''] // Start with 3 empty member inputs + leader = 4 minimum
            }}
            validationSchema={groupValidationSchema}
            onSubmit={handleCreateGroup}
        >
            {({ values, errors, touched, isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Group Name</label>
                        <Field
                            name="name"
                            type="text"
                            className="mt-1 block w-full rounded-md border border-orange-300 p-2"
                        />
                        {errors.name && touched.name && (
                            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Leader (You)</label>
                        <input
                            type="text"
                            value={auth.result.userCode}
                            className="mt-1 block w-full rounded-md border border-orange-300 p-2 bg-gray-100"
                            disabled
                        />
                    </div>

                    <FieldArray name="memberUserCodes">
                        {({ push, remove }) => (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Other Member Codes (Min 3, Max 4)
                                </label>
                                <div className="text-sm text-gray-500 mb-2">
                                    You will be automatically added as a member
                                </div>
                                {values.memberUserCodes.map((code, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Field
                                            name={`memberUserCodes.${index}`}
                                            type="text"
                                            className="flex-1 rounded-md border border-orange-300 p-2"
                                            placeholder="Enter member code"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {values.memberUserCodes.length < 4 && (
                                    <button
                                        type="button"
                                        onClick={() => push('')}
                                        className="px-3 py-1 bg-orange-300 rounded hover:bg-orange-400"
                                    >
                                        Add Member
                                    </button>
                                )}
                                {errors.memberUserCodes && touched.memberUserCodes && (
                                    <div className="text-red-500 text-sm mt-1">{errors.memberUserCodes}</div>
                                )}
                            </div>
                        )}
                    </FieldArray>

                    <button
                        type="submit"
                        disabled={isSubmitting || isCreatingGroup}
                        className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400"
                    >
                        {isCreatingGroup ? 'Creating...' : 'Create Group'}
                    </button>
                </Form>
            )}
        </Formik>
    );

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

    return (
        <div className="min-h-screen bg-orange-50">
            <Header />
            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />
                <div className="flex-1 p-6 overflow-y-auto">
                    <h1 className="text-3xl font-bold text-center mb-6">Project Details Information</h1>

                    {/* Member Information */}
                    <div className="bg-white border border-orange-300 rounded-lg p-4 space-y-4">
                        <h2 className="font-bold text-lg">Member Information</h2>
                        {!groupInfo ? (
                            <>
                                <div className="text-center text-gray-500 mb-4">
                                    You are not part of any group yet. Create a new group to get started.
                                </div>
                                <CreateGroupForm />
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoRow 
                                        label="Project Name" 
                                        value={groupInfo.project?.topic || "Not assigned"} 
                                    />
                                    <InfoRow 
                                        label="Group Name" 
                                        value={groupInfo.group?.name || "Not assigned"} 
                                    />
                                </div>
                                
                                {/* Members Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {groupInfo.group?.members?.length > 0 ? (
                                        <>
                                            {groupInfo.group.members.map((member, index) => (
                                                <div key={member.userCode} className="bg-orange-50 p-4 rounded-lg">
                                                    <MemberRow 
                                                        memberNumber={index + 1}
                                                        userCode={member.userCode}
                                                        fullName={member.fullName}
                                                        isLeader={member.userCode === groupInfo?.group?.members.find(m => 
                                                            m.fullName === groupInfo.group.leaderName)?.userCode}
                                                        showRemoveButton={isUserLeader && member.userCode !== auth.result.userCode}
                                                        onRemove={() => handleRemoveMember(member)}
                                                    />
                                                </div>
                                            ))}
                                            {/* Add new member slot if less than 5 members */}
                                            {isUserLeader && groupInfo.group.members.length < 5 && (
                                                <div className="bg-orange-50 p-4 rounded-lg">
                                                    <MemberRow 
                                                        memberNumber={groupInfo.group.members.length + 1}
                                                        onAdd={handleAddMember}
                                                        isAddNew={true}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="col-span-2 text-center text-gray-500 py-4">
                                            No members assigned yet
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Progress Tracker - Only show if group exists */}
                    {groupInfo && (
                        <>
                            <h2 className="font-bold text-lg mt-6 mb-2">Progress Tracker</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <Checkpoint 
                                    title="CHECKPOINT 1" 
                                    date="Feb 5, 2025" 
                                    submission="Proposal Submission"
                                    grade="9.5"
                                    status="Approved"
                                    document="checkpoint_1_team_1.pdf"
                                    feedback="Good structure, proceed to CP2."
                                />
                                <Checkpoint 
                                    title="CHECKPOINT 2" 
                                    date="Mar 15, 2025" 
                                    submission="Name of checkpoint"
                                    grade="0.0"
                                    status="Not started"
                                    document="(File pdf, doc, docx, excel)"
                                    feedback="Feedback of my lecture"
                                />
                                <Checkpoint 
                                    title="CHECKPOINT 3" 
                                    date="Due Date"
                                    submission="Proposal Submission"
                                    grade="0.0"
                                    status="Not started"
                                    document="(File pdf, doc, docx, excel)"
                                    feedback="Feedback of my lecture"
                                />
                            </div>
                        </>
                    )}
                </div>
                <NotificationPanel />
            </div>
            <Footer />
        </div>
    );
};

// Update MemberRow component to handle both display and input modes
const MemberRow = ({ memberNumber, userCode, fullName, isLeader, showRemoveButton, onRemove, onAdd, isAddNew }) => {
    const [inputCode, setInputCode] = useState('');
    
    const handleAdd = () => {
        if (!inputCode.trim()) {
            alert("Please enter a member code");
            return;
        }
        onAdd(inputCode.trim());
        setInputCode('');
    };

    if (isAddNew) {
        return (
            <div className="flex flex-col space-y-2">
                <span className="font-bold">Add Member {memberNumber}</span>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Enter member code"
                        className="flex-1 rounded-md border border-orange-300 p-2"
                    />
                    <button 
                        onClick={handleAdd}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }

    const [inputName, setInputName] = useState(fullName || '');
    const hasExistingMember = userCode && fullName;

    return (
        <div className="flex flex-col space-y-2">
            <span className="font-bold">
                Member {memberNumber} {isLeader && "(Leader)"}
            </span>
            <div className="flex items-center space-x-2">
                {hasExistingMember ? (
                    <>
                        <span className="px-3 py-1 bg-orange-300 rounded">{userCode}</span>
                        <span>{fullName}</span>
                        {showRemoveButton && (
                            <button 
                                onClick={onRemove}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-auto"
                            >
                                Remove
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="Student Code"
                            className="px-3 py-1 border rounded"
                        />
                        <input
                            type="text"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                            placeholder="Member Name"
                            className="px-3 py-1 border rounded"
                        />
                        <button className="px-3 py-1 bg-green-300 rounded">Add</button>
                    </>
                )}
            </div>
        </div>
    );
};

// Keep other component definitions as they are
const InfoRow = ({ label, value, buttonLabel }) => (
    <div className="flex justify-between items-center">
        <span className="font-bold">{label}</span>
        <div className="flex items-center space-x-2">
            <span className="text-sm">{value}</span>
            {buttonLabel && <button className="px-2 py-1 bg-gray-500 text-white rounded">{buttonLabel}</button>}
        </div>
    </div>
);

const Checkpoint = ({ title, date, submission, grade, status, document, feedback }) => (
    <div className="border border-orange-300 bg-white rounded-lg p-4 space-y-2">
        <div className="flex justify-between font-bold">
            <span>{title}</span>
            <span>{date}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="bg-orange-300 px-3 py-1 rounded">{submission}</span>
            <span className="text-2xl font-bold text-orange-500">{grade}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="font-bold">Status</span>
            <span className={`px-3 py-1 rounded ${status === 'Approved' ? 'bg-green-300' : 'bg-gray-300'}`}>{status}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="font-bold">Document</span>
            <span className="text-sm">{document}</span>
        </div>
        <div>
            <span className="font-bold block">Feedback</span>
            <p className="italic">{feedback}</p>
        </div>
    </div>
);

export default ProjectDetails;
