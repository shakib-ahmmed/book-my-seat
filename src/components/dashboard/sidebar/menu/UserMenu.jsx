import { BsPersonCircle, BsFingerprint, BsCardChecklist } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';
import { useState } from 'react';
import MenuItem from './MenuItem';
import BecomeVendorModal from '../../../model/BecomeVendorModal';

const UserMenu = ({ activeTab, setActiveTab }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="flex flex-col w-64 bg-white shadow-lg min-h-screen p-4">
                <h2 className="text-2xl font-bold mb-6 text-center">User Dashboard</h2>

                {/* User Profile */}
                <div
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center px-4 py-3 mb-2 cursor-pointer rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-yellow-400 font-semibold' : 'hover:bg-yellow-200'
                        }`}
                >
                    <BsPersonCircle className="w-5 h-5 mr-3" />
                    <span>User Profile</span>
                </div>

                {/* My Booked Tickets */}
                <div
                    onClick={() => setActiveTab('tickets')}
                    className={`flex items-center px-4 py-3 mb-2 cursor-pointer rounded-lg transition-colors ${activeTab === 'tickets' ? 'bg-yellow-400 font-semibold' : 'hover:bg-yellow-200'
                        }`}
                >
                    <BsFingerprint className="w-5 h-5 mr-3" />
                    <span>My Booked Tickets</span>
                </div>

                {/* Transaction History */}
                <div
                    onClick={() => setActiveTab('transactions')}
                    className={`flex items-center px-4 py-3 mb-2 cursor-pointer rounded-lg transition-colors ${activeTab === 'transactions' ? 'bg-yellow-400 font-semibold' : 'hover:bg-yellow-200'
                        }`}
                >
                    <BsCardChecklist className="w-5 h-5 mr-3" />
                    <span>Transaction History</span>
                </div>

                {/* Become Vendor */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-3 mt-auto cursor-pointer rounded-lg hover:bg-red-400 hover:text-white transition-colors"
                >
                    <GrUserAdmin className="w-5 h-5 mr-3" />
                    <span>Become a Vendor</span>
                </div>
            </div>

            <BecomeVendorModal isOpen={isModalOpen} closeModal={closeModal} />
        </>
    );
};

export default UserMenu;
