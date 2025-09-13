import React, {useEffect} from 'react';
import {images} from "../../../constant";
import AOS from 'aos';
import 'aos/dist/aos.css';

function DownloadOurAppCard(props) {

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
            <div className="container">
                <div className="download-our-app-card-sec">
                    <div className="main-card-sec">
                        <div className="col-md-9 h-100 mx-auto">
                            <div className="row h-100 align-items-md-center justify-content-md-end">
                                <div className="col-md-8 text-white" data-aos-delay={'50'} data-aos={'fade-left'}>
                                    <h2 className="mb-md-3">Download our app now</h2>
                                    <h4 className="mb-40 fs-20px">Get started with our app, available on the App Store
                                        and
                                        Google Play. Enjoy the convenience of self-service car cleaning right at your
                                        fingertips.</h4>
                                    <div
                                        className="row px-1 flex-column flex-md-row justify-content-end justify-content-md-start">
                                        {
                                            downloadLinks?.map((link, index) => {
                                                return (
                                                    <div className="col-auto px-2 text-end mb-12 mb-md-0" key={index}>
                                                        <img src={link?.image}
                                                             className="img-fluid download-apk-image" alt=""/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <img src={images.downloadCard.default.src}
                                 data-aos-delay={'100'}
                                 data-aos={'flip-right'}
                                 className="download-app-card-image img-fluid" alt="download-app-card"/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DownloadOurAppCard;