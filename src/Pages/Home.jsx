import React from 'react';
import Banner from '../Components/Banner';
import ContactUs from '../Components/ContactUs';
import FeaturedStories from '../Components/FeaturedStories';
import FeaturedDonors from '../Components/FeaturedDonors';

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedStories />
      <FeaturedDonors />
      <ContactUs />
    </div>
  );
};

export default Home;