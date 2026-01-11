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
      {/* Hero Section */}
      <div className="transition-colors duration-500">
        <HeroSection />
      </div>

      {/* Advertised Tickets */}
      <div className="transition-colors duration-500">
        <HomeAdvertisedTickets />
      </div>

      {/* Latest Tickets */}
      <div className="transition-colors duration-500">
        <LatestTickets />
      </div>

      {/* Categories */}
      <div className="transition-colors duration-500">
        <Categories />
      </div>

      {/* Popular Routes */}
      <div className="transition-colors duration-500">
        <PopularRoutes />
      </div>

      {/* How It Works */}
      <div className="transition-colors duration-500">
        <HowItWorks />
      </div>

      {/* Testimonials */}
      <div className="transition-colors duration-500">
        <Testimonials />
      </div>

      {/* Stats */}
      <div className="transition-colors duration-500">
        <Stats />
      </div>

      {/* Blog */}
      <div className="transition-colors duration-500">
        <Blog />
      </div>

      {/* Newsletter */}
      <div className="transition-colors duration-500">
        <Newsletter />
      </div>

      {/* FAQ */}
      <div className="transition-colors duration-500">
        <FAQ />
      </div>

      {/* Call To Action */}
      <div className="transition-colors duration-500">
        <CTA />
      </div>
    </div>
  );
};

export default Home;
