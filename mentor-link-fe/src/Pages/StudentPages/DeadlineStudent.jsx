import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Header, Sidebar, NotificationPanel, Footer } from '../../components/ui/StudentUi.jsx';
import { reportCreate } from '../../api/reportApi';
import { getGroupInfoById } from '../../api/groupApi';
import { mentorGetAllFromAccount } from '../../api/mentorApi';
import { lecturerGetAllFromAccount } from '../../api/lecturerApi';
import { useAuth } from '../../context/AuthContext';
import { getGroupTasks } from '../../api/checkpointApi';
import { viewAllReportStudent } from '../../api/studentApi';

const DeadlineStudent = () => {
    const [checkpoints, setCheckpoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth();

    useEffect(() => {
        const fetchCheckpoints = async () => {
            try {
                const response = await getGroupTasks(auth?.result?.userCode);
                if (response.isSuccess) {
                    const processedCheckpoints = response.result.map(checkpoint => {
                        const hasReview = checkpoint.checkpointReviews.length > 0;
                        const deadline = new Date(checkpoint.deadline);
                        const today = new Date();
                        const timeDiff = deadline - today;
                        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                        const isOverdue = timeDiff < 0;

                        return {
                            id: checkpoint.id,
                            checkpointNumber: checkpoint.cpName.split(' ')[1],
                            dueDate: checkpoint.deadline,
                            documentName: checkpoint.document ? 'View Document' : '[No document uploaded]',
                            documentUrl: checkpoint.document,
                            status: hasReview ? 'COMPLETED' : isOverdue ? 'OVERDUE' : 'PENDING',
                            daysRemaining: Math.abs(daysRemaining),
                            isOverdue
                        };
                    });
                    setCheckpoints(processedCheckpoints);
                }
            } catch (error) {
                console.error('Error fetching checkpoints:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCheckpoints();
    }, [auth?.result?.userCode]);

    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {/* Deadline Section */}
                    <h1 className="text-3xl font-bold text-center">Deadline Section</h1>
                    {loading ? (
                        <div className="text-center">Loading checkpoints...</div>
                    ) : checkpoints.length > 0 ? (
                        <div className="grid grid-cols-3 gap-6">
                            {checkpoints.map((checkpoint, index) => (
                                <CheckpointCard
                                    key={index}
                                    checkpoint={`CHECKPOINT ${checkpoint.checkpointNumber}`}
                                    date={new Date(checkpoint.dueDate).toLocaleDateString()}
                                    documentName={checkpoint.documentName}
                                    documentUrl={checkpoint.documentUrl}
                                    status={checkpoint.status}
                                    overdueText={checkpoint.isOverdue ? `Overdue: ${checkpoint.daysRemaining} days` : null}
                                    reminderText={!checkpoint.isOverdue ? `Due in: ${checkpoint.daysRemaining} days` : null}
                                    hasSubmitButton={checkpoint.status === "PENDING"}
                                    hasCancelButton={checkpoint.status === "IN_PROGRESS"}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 text-lg">No deadlines now</div>
                    )}

                    {/* Weekly Report Section */}
                    <h1 className="text-3xl font-bold text-center mt-6">Weekly Report</h1>
                    <WeeklyReport />
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

const CheckpointCard = ({ checkpoint, date, documentName, documentUrl, status, overdueText, reminderText, hasCancelButton, hasSubmitButton }) => (
    <div className="border border-orange-300 bg-white rounded-lg p-4 space-y-2">
        <div className="flex justify-between font-bold">
            <span>{checkpoint}</span>
            <span className="text-orange-600">{date}</span>
        </div>
        <div className="flex justify-between">
            <div className="space-x-2">
                {hasCancelButton && <button className="px-3 py-1 bg-gray-500 text-white rounded">Cancel</button>}
                {hasSubmitButton && <button className="px-3 py-1 bg-black text-white rounded">Submit</button>}
            </div>
        </div>
        <div className="flex justify-between">
            <span className="font-bold">Status</span>
            <span className={`px-3 py-1 rounded ${
                status === 'COMPLETED' ? 'bg-green-300' : 
                status === 'OVERDUE' ? 'bg-red-300' : 
                'bg-gray-300'
            }`}>{status}</span>
        </div>
        <div className="flex justify-between">
            <span className="font-bold">Document</span>
            {documentUrl ? (
                <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                    {documentName}
                </a>
            ) : (
                <span className="text-sm">{documentName}</span>
            )}
        </div>
        {overdueText && (
            <p className="text-red-500 text-xs mt-1">{overdueText}</p>
        )}
        {reminderText && (
            <p className="text-orange-500 text-xs mt-1">{reminderText}</p>
        )}
    </div>
);

const WeeklyReport = () => {
    const { auth } = useAuth();
    const [receiverType, setReceiverType] = useState('MENTOR');
    const [receivers, setReceivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [groupInfo, setGroupInfo] = useState(null);
    const [reports, setReports] = useState([]);
    const userCode = auth?.result?.userCode;
    const [reloadTrigger, setReloadTrigger] = useState(0);

    useEffect(() => {
        const fetchGroupInfo = async () => {
            const accountId = localStorage.getItem('accountId');
            try {
                const data = await getGroupInfoById(accountId);
                setGroupInfo(data.result);
            } catch (error) {
                console.error('Error fetching group info:', error);
            }
        };

        const fetchReceivers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await (receiverType === 'MENTOR' ? mentorGetAllFromAccount() : lecturerGetAllFromAccount());
                if (response) {
                    // Handle both response types
                    const receiversList = response.result || response;
                    if (Array.isArray(receiversList)) {
                        setReceivers(receiversList);
                        console.log(receiversList)
                    } else {
                        setReceivers([]);
                        setError('Invalid response format');
                    }
                } else {
                    setReceivers([]);
                    setError('Failed to fetch receivers');
                }
            } catch (error) {
                console.error('Error fetching receivers:', error);
                setReceivers([]);
                setError('Error fetching receivers');
            } finally {
                setLoading(false);
            }
        };

        fetchGroupInfo();
        fetchReceivers();
    }, [receiverType]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const accountId = localStorage.getItem('accountId');
                const response = await viewAllReportStudent(accountId);
                if (response.isSuccess) {
                    setReports(response.result);
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
                setError('Failed to fetch reports');
            }
        };

        fetchReports();
    }, [reloadTrigger]);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Create Report Section */}
            <div className="border border-orange-300 bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-orange-600">Create New Report</h2>
                <Formik
                    initialValues={{
                        title: '',
                        content: '',
                        receiverId: ''
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const reportResponse = await reportCreate(
                                userCode,
                                groupInfo?.group?.id,
                                groupInfo?.project?.id,
                                values.receiverId,
                                receiverType,
                                values.title,
                                values.content
                            );

                            if (reportResponse.isSuccess) {
                                console.log('Report submitted:', reportResponse);
                                alert('Report submitted successfully!');
                                resetForm();
                                setReloadTrigger(prev => prev + 1);
                            } else {
                                throw { statusCode: reportResponse.statusCode };
                            }
                        } catch (error) {
                            console.error('Error submitting report:', error);
                            switch (error.statusCode) {
                                case 400:
                                    alert('Invalid report data. Please check your input.');
                                    break;
                                case 401:
                                    alert('Unauthorized. Please log in again.');
                                    break;
                                case 403:
                                    alert('You do not have permission to submit reports.');
                                    break;
                                case 404:
                                    alert('Receiver not found. Please select a valid receiver.');
                                    break;
                                default:
                                    alert('Failed to submit report. Please try again later.');
                            }
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Receiver Type</label>
                                    <select
                                        className="w-full border rounded px-3 py-2"
                                        value={receiverType}
                                        onChange={(e) => setReceiverType(e.target.value)}
                                    >
                                        <option value="MENTOR">Mentor</option>
                                        <option value="LECTURE">Lecturer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Select Receiver</label>
                                    <Field
                                        name="receiverId"
                                        as="select"
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="">Choose a receiver</option>
                                        {loading ? (
                                            <option>Loading...</option>
                                        ) : error ? (
                                            <option>{error}</option>
                                        ) : (
                                            receivers.map(receiver => (
                                                <option key={receiver.id} value={receiver.id}>
                                                    {receiver.fullName}
                                                </option>
                                            ))
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Report Title</label>
                                <Field
                                    name="title"
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Report Content</label>
                                <Field
                                    name="content"
                                    as="textarea"
                                    rows="4"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Reports List Section */}
            <div className="border border-orange-300 bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-orange-600">Submitted Reports</h2>
                <div className="divide-y divide-gray-200">
                    {reports.length === 0 ? (
                        <p className="text-gray-500 text-center py-4 text-lg">No reports submitted yet</p>
                    ) : (
                        reports.map(report => (
                            <div key={report.id} className="py-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-xl">{report.title}</h3>
                                        <p className="text-base text-gray-600">{report.content}</p>
                                        <div className="text-sm text-gray-500">
                                            Submitted: {new Date(report.submittedTime).toLocaleString()}
                                            <br />
                                            By: {report.accountName}
                                            <br />
                                            Project: {report.projectTopic}
                                            {report.feedback && (
                                                <>
                                                    <br />
                                                    Feedback: {report.feedback}
                                                    <br />
                                                    Feedback Time: {new Date(report.feedbackTime).toLocaleString()}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-base ${
                                        report.reportStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                        report.reportStatus === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {report.reportStatus}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeadlineStudent;