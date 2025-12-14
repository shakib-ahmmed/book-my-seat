import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem';


const VendorMenu = () => {
    return (
        <>
            <MenuItem
                icon={BsFillHouseAddFill}
                label='Add Ticket'
                address='add-Ticlket'
            />

            <MenuItem
                icon={BsFillHouseAddFill}
                label='Requested-Bookings'
                address='Requested-Bookings'
            />

            <MenuItem icon={MdHomeWork}
                label='revenue-overview'
                address='revenue-overview'
            />
            
            <MenuItem
                icon={MdOutlineManageHistory}
                label='Manage Orders'
                address='manage-orders'
            />
        </>
    )
}

export default VendorMenu;
