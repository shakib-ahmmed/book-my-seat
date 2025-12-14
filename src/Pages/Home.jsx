import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import LatestTickets from '../components/Home/LatestTickets';
import AdvertiseTickets from './dashboard/admin/AdvertiseTickets';



const Home = () => {
    return (
        <div>
            <div>
                <HeroSection />
            </div>
            <div>
                {/* <LatestTickets /> */}
            </div>
            <div>
                {/* <AdvertiseTickets /> */}
            </div>
        </div>
    );
};

export default Home;