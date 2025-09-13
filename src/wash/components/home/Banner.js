import React, {useEffect} from 'react';
import {images} from "../../../constant";
import HomeBannerImageDetailsCard from "@/components/home/HomeBannerImageDetailsCard";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Banner(props) {

    useEffect(() => {
        AOS.init({
            duration: 400,
            easing: 'ease-in-out',
            once: false,
        });
    }, []);

    const downloadLinks = [
        {image: images.appleStore.default.src , link: ''},
        {image: images.googleStore.default.src , link: ''},
    ];


    return (
        <React.Fragment>
            <div className="col-12 bg-dark-blue home-banner-sec py-md-3">
                <div className="container py-md-5 py-4">
                    <div className="row align-items-center">
                        <div className="col text-white text-center text-md-start">
                            <div className="col-12" data-aos-delay={'100'} data-aos={'fade-right'}>
                                <h1 className="mb-2 mb-md-1">WASH AGENT</h1>
                                <h3 className="mb-12 pb-md-4 pb-3">Get a Sparkling Clean Carin Just 5 Minutes!</h3>
                                <div className="col-12 d-md-none mb-4 pb-1">
                                    <HomeBannerImageDetailsCard/>
                                </div>
                                <h4 className="mb-4 pb-1 pb-md-0 mb-md-40">Experience hassle-free car cleaning with our
                                    fully equipped wash bays.
                                    Save time and money with our easy and efficient car wash service.</h4>
                            </div>
                            <div className="row justify-content-center justify-content-md-start">
                                {
                                    downloadLinks?.map((link, index) => {
                                        return (
                                            <div className="col-auto" key={index}>
                                                <img src={link?.image} data-aos-delay='100'
                                                     data-aos={index === 0 ? 'fade-right' : 'fade-left'}
                                                     className="img-fluid download-apk-image" alt={link?.image}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-md-4 d-none d-md-block">
                            <HomeBannerImageDetailsCard/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Banner;