import React, { useState } from "react";
import { Header, Sidebar, Footer, NotificationPanel } from "../../components/ui/LecturerUi";

const reports = [
    { id: 1, title: "Report 1", task: "Research on project topic", status: "Pending" },
    { id: 2, title: "Report 2", task: "Research on project topic", status: "Pending" },
    { id: 3, title: "Report 3", task: "Research on project topic", status: "Pending" },
];

const ReportLecturer = () => {
    const [reportList, setReportList] = useState(reports);

    const markAsCompleted = (id) => {
        setReportList(
            reportList.map((report) =>
                report.id === id ? { ...report, status: "Completed" } : report
            )
        );
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
                                    <h2 className="font-bold text-lg">{report.title}</h2>
                                    <div className="flex gap-2">
                                        <span className={`px-3 py-1 rounded-lg text-white ${report.status === "Completed" ? "bg-red-500" : "bg-yellow-500"}`}>
                                            {report.status}
                                        </span>
                                        {report.status !== "Completed" && (
                                            <button
                                                onClick={() => markAsCompleted(report.id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                            >
                                                Mark as Completed
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="mt-2 p-3 bg-orange-300 rounded-lg">{report.task}</p>
                            </div>
                        ))}
                    </div>
                </main>
                <NotificationPanel />
            </div>
            <Footer />
        </div>
    );
};

export default ReportLecturer;
