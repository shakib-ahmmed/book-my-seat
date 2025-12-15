import { BsFingerprint, BsCashStack } from 'react-icons/bs';
import MenuItem from './MenuItem';

const UserMenu = () => {
    return (
        <>
            <MenuItem
                icon={BsFingerprint}
                label="My Booked Tickets"
                address="my-tickets"
            />

            <MenuItem
                icon={BsCashStack}
                label="Transaction History"
                address="transaction-history"
            />
        </>
    );
};

export default UserMenu;
