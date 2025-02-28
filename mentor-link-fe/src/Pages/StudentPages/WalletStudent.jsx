import React from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';

const WalletStudent = () => {
    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                <div className="flex-1 p-6 overflow-y-auto">
                    <h1 className="text-4xl font-bold text-center">Wallet</h1>

                    {/* Current Balance */}
                    <div className="mt-6 border rounded-lg p-4 bg-white">
                        <h2 className="text-2xl font-bold">Current Balance</h2>
                        <div className="mt-2 flex items-center justify-between bg-orange-300 p-4 rounded">
                            <span className="text-4xl font-bold">1.000.000</span>
                            <span className="text-2xl">VND</span>
                        </div>
                    </div>

                    {/* Top Up Section */}
                    <div className="mt-6 border rounded-lg p-4 bg-white">
                        <h2 className="text-2xl font-bold">Top Up Your Wallet</h2>
                        <div className="mt-4 flex items-center space-x-4">
                            <div className="flex-1">
                                <label className="block font-bold">Amount Input</label>
                                <input type="text" placeholder="Enter amount (VND)" className="w-full px-3 py-2 border rounded bg-orange-200"/>
                            </div>
                            <div className="flex-1">
                                <label className="block font-bold">Payment Method</label>
                                <div className="px-3 py-2 bg-orange-200 rounded">VNPAY</div>
                            </div>
                            <button className="px-4 py-2 bg-green-500 text-white rounded">Top Up Now</button>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="mt-6 border rounded-lg p-4 bg-white">
                        <h2 className="text-2xl font-bold">Transaction History</h2>
                        <div className="mt-4 flex space-x-4 items-center">
                            <span className="font-bold">Data range from</span>
                            <input type="date" className="border px-3 py-2 rounded"/>
                            <span>to</span>
                            <input type="date" className="border px-3 py-2 rounded"/>
                            <select className="border px-3 py-2 rounded">
                                <option>Payment to Mentor</option>
                            </select>
                            <button className="px-3 py-2 bg-orange-400 text-white rounded">🔍</button>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div>02/02/2023: Payment to Mentor - 200,000 VND</div>
                            <div>03/02/2023: Payment to Mentor - 200,000 VND</div>
                            <div>04/02/2023: Payment to Mentor - 200,000 VND</div>
                            <div>05/02/2023: Payment to Mentor - 200,000 VND</div>
                        </div>

                        <div className="mt-4 text-center">
                            <button className="px-4 py-2 bg-gray-300 rounded">1</button>
                        </div>
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

export default WalletStudent;