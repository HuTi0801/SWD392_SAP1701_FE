import React, { useState, useEffect } from "react";
import { Header, Sidebar, Footer, NotificationPanel } from "../../components/ui/MentorUi";
import { viewAllReportOfMentor, updateFeedbackReportMentor } from "../../api/mentorApi";
import { useAuth } from "../../context/AuthContext";

const WeeklyReportMentor = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.result?.accountId) {
      fetchReports();
    }
  }, [auth]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await viewAllReportOfMentor(auth.result.accountId);
      console.log(response);
      setReports(response.result || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackClick = (report) => {
    setSelectedReport(report);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = async () => {
    try {
      await updateFeedbackReportMentor(
        auth.token,
        auth.result.accountId,  // Changed from auth.result.userCode to auth.result.accountId
        selectedReport.id,
        feedbackText
      );
      setShowFeedbackModal(false);
      setFeedbackText("");
      // Reload reports
      fetchReports();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-10">
          <div className="text-center text-4xl font-serif">Weekly Report</div>
          
          {/* Filters */}
          <div className="flex justify-center space-x-4 my-5">
            <select className="p-2 border rounded">
              <option>Week</option>
            </select>
            <select className="p-2 border rounded">
              <option>Semester</option>
            </select>
            <select className="p-2 border rounded">
              <option>Team</option>
            </select>
            <select className="p-2 border rounded">
              <option>Status</option>
            </select>
          </div>

          {/* Report Items */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center">Loading reports...</div>
            ) : (
              reports.map((report) => (
                <div key={report.id} className="bg-orange-300 p-5 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg">Team {report.groupId}</h2>
                    <div className="flex space-x-2">
                      <span className="bg-green-200 px-2 py-1 rounded">{report.reportStatus}</span>
                      <button 
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded cursor-pointer transition-colors"
                        onClick={() => handleFeedbackClick(report)}
                      >
                        Feedback
                      </button>
                    </div>
                  </div>
                  <button className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded cursor-pointer transition-colors">Reason</button>
                  <div className="mt-2">
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="whitespace-pre-line">{report.content}</p>
                  </div>
                  {/* Add feedback display */}
                  {report.feedback && (
                    <div className="mt-2 bg-green-100 p-2 rounded">
                      <span className="font-semibold">Feedback: </span>
                      <span>{report.feedback}</span>
                    </div>
                  )}
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-600">
                      Created: {new Date(report.submittedTime).toLocaleString()}
                    </span>
                    <button className="bg-green-400 hover:bg-green-500 px-4 py-1 rounded cursor-pointer transition-colors">Chat</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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

export default WeeklyReportMentor;