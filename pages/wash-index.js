import React from 'react';
import Banner from "@/components/home/Banner";
import EasyAndHustleCard from "@/components/home/EasyAndHustleCard";
import QuickSteps from "@/components/home/QuickSteps";
import QuestionsAboutSection from "@/components/home/QuestionsAboutSection";
import DownloadOurAppCard from "@/components/home/DownloadOurAppCard";

function Home(props) {
    return (
        <React.Fragment>
            <div className="col-12 overflow-hidden">
                <Banner/>
                <EasyAndHustleCard/>
                <QuickSteps/>
                <QuestionsAboutSection/>
                <DownloadOurAppCard/>
            </div>
        </React.Fragment>
    );
}

export default Home;