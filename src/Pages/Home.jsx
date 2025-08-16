import React from 'react';
import Banner from '../Components/Banner';
import ContactUs from '../Components/ContactUs';
import FeaturedStories from '../Components/FeaturedStories';
import FeaturedDonors from '../Components/FeaturedDonors';
import HowItWorks from '../Components/HowITWorks';
import Facts from '../Components/Facts';
import Impacts from '../Components/Impacts';
import Events from '../Components/Events';

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <Impacts />
      <FeaturedStories />
      <Facts />
      <FeaturedDonors />
      <Events />
      <ContactUs />
    </div>
  );
};

export default Home;