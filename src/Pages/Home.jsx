import React from "react";
import HeroSection from "../components/Home/HeroSection";
import HomeAdvertisedTickets from "../components/Home/HomeAdvertisedTickets";
import LatestTickets from "../components/Home/LatestTickets";
import Categories from "../components/Home/Categories";
import PopularRoutes from "../components/Home/PopularRoutes";
import HowItWorks from "../components/Home/HowItWorks";
import Testimonials from "../components/Home/Testimonials";
import Stats from "../components/Home/Stats";
import Blog from "../components/Home/Blog";
import Newsletter from "../components/Home/Newsletter";
import FAQ from "../components/Home/FAQ";
import CTA from "../components/Home/CTA";

const Home = () => {
    return (
        <div className="bg-white dark:bg-[#1B1B1B] text-black dark:text-white transition-colors duration-500">
            <HeroSection />
            <HomeAdvertisedTickets />
            <LatestTickets />
            <Categories />
            <PopularRoutes />
            <HowItWorks />
            <Testimonials />
            <Stats />
            <Blog />
            <Newsletter />
            <FAQ />
            <CTA />
        </div>
    );
};

export default Home;
