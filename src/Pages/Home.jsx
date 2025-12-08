import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import AdvertisementSection from '../components/AdvertisementSection.jsx';


const Home = () => {
    return (
        <div>
            <div>
                <HeroSection />
            </div>
            <div>
                <AdvertisementSection />
            </div>
        </div>
    );
};

export default Home;