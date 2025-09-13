import React from 'react';
import {images} from "../../../constant";

function HomeBannerImageDetailsCard(props) {
    return (
        <React.Fragment>
            <div className="col-12 position-relative text-center" data-aos-delay="100" data-aos="zoom-in">
                <img src={images.homeBanner.default.src} alt="google"
                     className="img-fluid home-banner-image"/>
                <div className="quick-wash-card text-white text-start">
                    <p className="mb-0 mb-md-1 fw-semibold fs-7">Quick wash plan</p>
                    <p className="fs-9px mb-2 mb-md-3">Get a 5min quick wash every day</p>
                    <p className="mb-md-12 mb-2 fs-9px">Valid till: July 5, 2024</p>
                    <button className="btn btn-dark-blue">Start your first wash</button>
                </div>
                <div className="quick-wash-card pay-as-you-go-card text-start text-dark">
                    <p className="mb-0 mb-md-1 fw-semibold">Pay as you go</p>
                    <p className="text-secondary fs-9px mb-md-10 mb-2">Best way to maintain that showroom shine.</p>
                    <p className="mb-md-12 mb-2 fs-9px">Keep your wallet topped up and get easy wash
                        at just <span className="fw-semibold">0.50 cents a minute.</span></p>
                    <button className="btn btn-lavender-blue">Start wash now</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default HomeBannerImageDetailsCard;