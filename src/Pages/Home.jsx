import React from 'react';
import HeroSection from '../components/Home/HeroSection';

import HomeAdvertisedTickets from '../components/Home/HomeAdvertisedTickets';
import LatestTickets from '../components/Home/LatestTickets';



const Home = () => {
    return (
        <div>
            <div>
                <HeroSection />
            </div>

            <div>
                <HomeAdvertisedTickets />
            </div>

            <div>
                <LatestTickets />
            </div>
        </div>
    );
};

export default Home;