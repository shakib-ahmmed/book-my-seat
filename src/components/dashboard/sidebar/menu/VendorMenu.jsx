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
            <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
            <MenuItem
                icon={MdOutlineManageHistory}
                label='Manage Orders'
                address='manage-orders'
            />
        </>
    )
}

export default VendorMenu;
