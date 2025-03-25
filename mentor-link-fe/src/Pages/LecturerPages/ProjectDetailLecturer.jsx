import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Sidebar, Footer, NotificationPanel } from '../../components/ui/LecturerUi';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';
import * as projectApi from '../../api/projectApi';
import * as notificationApi from '../../api/notificationApi';

const ProjectDetailLecturer = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await projectApi.getProjectLecturer(id, auth.result.token);
                if (response.isSuccess) {
                    setProject(response.result);
                } else {
                    throw new Error(response.message || 'Failed to fetch project details');
                }
            } catch (err) {
                console.error('Error fetching project details:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (id && auth) {
            fetchProjectDetails();
        }
    }, [id, auth]);

    const handleApprove = async () => {
        try {
            setIsUpdating(true);
            const response = await projectApi.updateStatusProjectLecturer(
                project.id,
                "APPROVED",
                null,
                auth.result.token
            );
            
            if (response.isSuccess) {
                // Send notification to group
                const groupNotifResponse = await notificationApi.sendNotifProjectGroup(id);
                console.log('Group notification response:', groupNotifResponse);

                // Send notifications to each member
                const members = groupNotifResponse.groupInfo.members;
                for (const member of members) {
                    const studentNotifResponse = await notificationApi.sendNotifProjectStudent(member.userCode);
                    console.log(`Student notification response for ${member.userCode}:`, studentNotifResponse);
                }

                // Refresh project data
                setProject({
                    ...project,
                    projectStatus: "APPROVED"
                });
            } else {
                throw new Error(response.message || 'Failed to approve project');
            }
        } catch (err) {
            console.error('Error approving project:', err);
            alert('Failed to approve project: ' + err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleReject = async () => {
        const reason = window.prompt("Please enter rejection reason:");
        if (!reason) return; // User cancelled or entered empty reason
        
        try {
            setIsUpdating(true);
            const response = await projectApi.updateStatusProjectLecturer(
                project.id,
                "REJECTED",
                reason,
                auth.result.token
            );
            
            if (response.isSuccess) {
                // Send notification to group
                const groupNotifResponse = await notificationApi.sendNotifProjectGroup(id);
                console.log('Group notification response:', groupNotifResponse);

                // Send notifications to each member
                const members = groupNotifResponse.groupInfo.members;
                for (const member of members) {
                    const studentNotifResponse = await notificationApi.sendNotifProjectStudent(member.userCode);
                    console.log(`Student notification response for ${member.userCode}:`, studentNotifResponse);
                }

                // Refresh project data
                setProject({
                    ...project,
                    projectStatus: "REJECTED",
                    rejectionReason: reason
                });
            } else {
                throw new Error(response.message || 'Failed to reject project');
            }
        } catch (err) {
            console.error('Error rejecting project:', err);
            alert('Failed to reject project: ' + err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!project) return <div>No project data available</div>;

    return (
        <div className="flex flex-col min-h-screen bg-[#FCEFE3]">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6">
                    <h1 className="text-4xl font-semibold mb-6">Project Details</h1>
                    <p>Project ID: {project.id}</p>
                    {/* Group Info */}
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-bold">Topic</p>
                                <p>{project.topic}</p>
                            </div>
                            <div>
                                <p className="font-bold">Members</p>
                                <div className="flex space-x-2 mt-2">
                                    <AccountCircleIcon className="text-red-500 text-4xl" />
                                    <AccountCircleIcon className="text-orange-500 text-4xl" />
                                    <AccountCircleIcon className="text-purple-500 text-4xl" />
                                    <AccountCircleIcon className="text-blue-500 text-4xl" />
                                    <AccountCircleIcon className="text-green-500 text-4xl" />
                                </div>
                            </div>
                        </div>

                        <p className="font-bold">Description</p>
                        <p>{project.description}</p>

                        <p className="font-bold">Document</p>
                        <p>{project.document}</p>

                        <p className="font-bold">Status</p>
                        <p>{project.projectStatus}</p>

                        <p className="font-bold">Rejection Reason</p>
                        <p>{project.rejectionReason || 'None'}</p>
                    </div>

                    {/* Member Details Card */}
                    <div className="mt-6 border border-red-400 p-4 w-64 rounded-md">
                        <p><span className="font-bold">Student ID:</span> SE183385</p>
                        <p><span className="font-bold">Name:</span> Khoa Tran Nguyen Nhat</p>
                    </div>

                    {/* Action Buttons */}
                    {project.projectStatus === "PENDING" && (
                        <div className="mt-6 flex space-x-4">
                            <button 
                                onClick={handleReject}
                                disabled={isUpdating}
                                className={`bg-yellow-400 px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-500 transition-colors
                                    ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isUpdating ? 'Processing...' : 'Reject'}
                            </button>
                            <button 
                                onClick={handleApprove}
                                disabled={isUpdating}
                                className={`bg-green-400 px-4 py-2 rounded-md cursor-pointer hover:bg-green-500 transition-colors
                                    ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isUpdating ? 'Processing...' : 'Approve'}
                            </button>
                        </div>
                    )}
                </main>
                <NotificationPanel />
            </div>
            <Footer />
        </div>
    );
};

export default ProjectDetailLecturer;
