import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem';


const VendorMenu = () => {
    return (
        <>

            <MenuItem
                icon={BsFillHouseAddFill}
                label='My Added Tickets'
                address='my-added-tickets'
            />
            <MenuItem
                icon={BsFillHouseAddFill}
                label='Add Tickets'
                address='add-tickets'
            />

            <MenuItem
                icon={BsFillHouseAddFill}
                label='Requested Booking'
                address='Requested-Booking'
            />

            <MenuItem icon={MdHomeWork}
                label='Revenue Overview'
                address='revenue-overview'
            />
        </>
    )
}

export default VendorMenu;
