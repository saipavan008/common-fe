import React, {useEffect} from 'react';
import {images} from "../../../constant";
import AOS from 'aos';
import 'aos/dist/aos.css';

function QuickSteps(props) {

    useEffect(() => {
        AOS.init({
            duration: 400,
            easing: 'ease-in-out',
            once: false,
        });
    }, []);

    const stepsData = [
        {title: 'Download app' , description: 'Get our app from the App Store or Google Play to access top-tier car cleaning services anytime.'},
        {title: 'Create account' , description: 'Sign up quickly and securely to personalize your car care experience and access exclusive deals.'},
        {title: 'Choose wash plan' , description: 'Select the ideal self-cleaning plan that fits your needs, from quick rinses to detailed cleans.'},
        {title: 'Get your car cleaned' , description: 'Select the service you need with ease and clean your car effortlessly using our intuitive guides and tools.'},
    ];

    return (
        <React.Fragment>
            <div className="container quick-steps-section">
                <div className="col-md-10 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-md order-1 order-md-0 py-5 mt-4 mt-md-0 py-md-0">
                            <div className="col-12 steps-borders-image-card-sec" data-aos-delay={'100'} data-aos="zoom-in">
                                <img src={images.quickSteps.default.src}  className="img-fluid steps-image" alt="steps"/>
                            </div>
                        </div>
                        <div className="col">
                            <h2 className="mb-md-4" data-aos-delay={'50'} data-aos={'fade-left'}>4 Quick steps to use wash agent</h2>
                            {
                                stepsData?.map((dataItem , index,arr) => {
                                    const isLast = arr.length - 1 === index;
                                    return(
                                        <div className={`col-12 ps-30 ${isLast ? '' : 'mb-4 border-lines-card-sec'}`}
                                             key={index}
                                             data-aos-delay={'70'}
                                             data-aos={'fade-up'}
                                        >
                                            <h4 className="mb-0 fw-semibold steps-indicator-circle-sec">{dataItem?.title}</h4>
                                            <h5 className="mb-0 mt-2 fw-light">{dataItem?.description}</h5>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuickSteps;