import { FaUserCog, FaUserTag } from 'react-icons/fa'
import MenuItem from './MenuItem';


const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={FaUserCog}
                label='Manage Users'
                address='manage-users'
            />

            <MenuItem
                icon={FaUserTag}
                label='Manage Tickets'
                address='Manage-Tickets'
            />

            <MenuItem
                icon={FaUserTag}
                label='Advertise Tickets'
                address='advertise-tickets'
            />
        </>
    )
}

export default AdminMenu;
