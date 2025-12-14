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
                label='vendor Requests'
                address='vendor-requests'
            />

            <MenuItem
                icon={FaUserTag}
                label='advertise-tickets'
                address='advertise-tickets'
            />
        </>
    )
}

export default AdminMenu;
