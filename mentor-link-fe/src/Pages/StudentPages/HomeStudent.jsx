import React from 'react';
import { Header, Sidebar, NotificationPanel, Footer, InfoCard, DeadlineItem } from '../../components/ui/StudentUi.jsx';

const HomeStudent = () => {
    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <InfoCard title="Upcoming Deadline" icon="📅">
                            <DeadlineItem title="Report 1" date="10.02.2024" />
                            <DeadlineItem title="Checkpoint 1" date="15.02.2024" />
                        </InfoCard>

                        <InfoCard title="Upcoming Appointment" icon="📅">
                            <p className="text-[#FF9E6D] font-bold">Mentor: Mr. Hoang Nguyen The</p>
                            <p>05.02.2024 - 14:00</p>
                        </InfoCard>
                    </div>

                    <h2 className="text-xl font-bold mt-6">🚀 Featured Projects</h2>

                    <div className="mt-4 flex bg-white shadow-lg p-4">
                        <img
                            className="w-1/3 object-cover"
                            src="https://placehold.co/300x200"
                            alt="Project Preview"
                        />
                        <div className="flex-1 ml-4">
                            <h3 className="text-2xl font-bold text-[#FF9E6D]">Solara</h3>
                            <p className="text-sm text-gray-600">Lessons on survival skills for every situation</p>
                            <div className="flex justify-between items-center mt-4">
                                <button className="px-4 py-2 bg-[#FF9E6D] text-white rounded hover:bg-[#FF7043]">Detail</button>
                                <span className="text-green-500 text-xl">9.0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

export default HomeStudent;