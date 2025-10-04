import React from 'react';
import Banner from '../Banner/Banner';
import HowWorks from '../HowWorks/HowWorks';
import SalesTeam from '../SalesTeam/SalesTeam';
import CustomerSay from '../CustomerSay/CustomerSay';
import HomeFeatures from '../HomeFeatures/HomeFeatures';
import BeMerchant from '../BeMerchant/BeMerchant';
import HomeFaq from '../HomeFaq/HomeFaq';
import HomeServices from '../HomeServices/HomeServices';

const Home = () => {
    return (
        <div>
            <Banner />
            <HowWorks />
            <HomeServices />
            <SalesTeam />
            <HomeFeatures />
            <BeMerchant />
            <CustomerSay />
            <HomeFaq />
        </div>
    );
};

export default Home;