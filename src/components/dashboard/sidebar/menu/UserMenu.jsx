import { BsFingerprint, BsCashStack } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeVendorModal from '../../../model/BecomeVendorModal'

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)

    return (
        <>

        
            {/* My Tickets */}
            <MenuItem
                icon={BsFingerprint}
                label="My Tickets"
                address="/dashboard/my-tickets"
                className="hover:bg-[#4d1d1a] rounded-lg"
            />

            {/* Become a Vendor */}
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center px-4 py-2 mt-2 transition-colors duration-300 transform text-gray-600 hover:bg-gray-300 hover:text-gray-700 cursor-pointer rounded-lg"
            >
                <GrUserAdmin className="w-5 h-5" />
                <span className="mx-4 font-medium">Become A Vendor</span>
            </div>
            <BecomeVendorModal closeModal={closeModal} isOpen={isOpen} />

            {/* Transaction History */}
            <MenuItem
                icon={BsCashStack}
                label="Transaction History"
                address="/dashboard/transaction-history"
                className="hover:bg-[#4d1d1a] rounded-lg mt-2"
            />
        </>
    )
}

export default UserMenu
