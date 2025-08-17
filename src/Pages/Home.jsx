import React from 'react';
import Banner from '../Components/Banner';
import ContactUs from '../Components/ContactUs';
import FeaturedStories from '../Components/FeaturedStories';
import FeaturedDonors from '../Components/FeaturedDonors';
import HowItWorks from '../Components/HowITWorks';
import Facts from '../Components/Facts';
import Impacts from '../Components/Impacts';
import Events from '../Components/Events';
import CTA from '../Components/CTA';
import FAQ from '../Components/FAQ';
import RecentRequest from '../Components/RecentRequest';

const Home = () => {
  return (
    <div className='mt-16'>
      <Banner />
      <HowItWorks />
      <Impacts />
      <FeaturedStories />
      <RecentRequest />
      <Facts />
      <FeaturedDonors />
      <Events />
      <CTA />
      <FAQ />
      <ContactUs />
    </div>
  );
};

export default Home;