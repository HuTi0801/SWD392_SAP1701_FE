import React, { useState, useEffect } from "react";
import { Header, Sidebar, Footer, NotificationPanel } from "../../components/ui/LecturerUi";
import { viewAllReportOfLecture, updateFeedbackReportLecturer } from "../../api/lecturerApi";
import { useAuth } from "../../context/AuthContext";

const ReportLecturer = () => {
    const [reportList, setReportList] = useState([]);
    const { auth } = useAuth();
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await viewAllReportOfLecture(auth.result.accountId);
                if (response.isSuccess) {
                    setReportList(response.result);
                }
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            }
        };
        fetchReports();
    }, [auth.result.accountId]);

    const markAsCompleted = (id) => {
        setReportList(
            reportList.map((report) =>
                report.id === id ? { ...report, reportStatus: "COMPLETED" } : report
            )
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleFeedbackClick = (report) => {
        setSelectedReport(report);
        setShowFeedbackModal(true);
        setFeedbackText(report.feedback || "");
    };

    const handleFeedbackSubmit = async () => {
        try {
            await updateFeedbackReportLecturer(
                auth.result.accountId,
                selectedReport.id,
                feedbackText
            );
            setShowFeedbackModal(false);
            setFeedbackText("");
            // Refresh reports
            const response = await viewAllReportOfLecture(auth.result.accountId);
            if (response.isSuccess) {
                setReportList(response.result);
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold text-center">Weekly Reports</h1>
                    <div className="mt-6">
                        {reportList.map((report) => (
                            <div key={report.id} className="p-4 bg-white rounded-lg shadow-md mb-4 border-2 border-orange-400">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="font-bold text-lg">{report.title}</h2>
                                        <p className="text-sm text-gray-600">
                                            By {report.accountName} - Group: {report.groupName} - Project: {report.projectTopic}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Submitted: {formatDate(report.submittedTime)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleFeedbackClick(report)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                        >
                                            Feedback
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-2 p-3 bg-orange-300 rounded-lg">{report.content}</p>
                                {report.feedback && (
                                    <div className="mt-2 bg-green-100 p-2 rounded">
                                        <span className="font-semibold">Feedback: </span>
                                        <span>{report.feedback}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>
                <NotificationPanel />
            </div>
            <Footer />

            {/* Feedback Modal */}
            {showFeedbackModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Provide Feedback</h3>
                        <textarea
                            className="w-full h-32 p-2 border rounded mb-4"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Enter your feedback here..."
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer transition-colors"
                                onClick={() => setShowFeedbackModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer transition-colors"
                                onClick={handleFeedbackSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportLecturer;
