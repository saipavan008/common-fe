import React, {useEffect} from 'react';
import {images} from "../../../constant";
import AOS from 'aos';
import 'aos/dist/aos.css';

function EasyAndHustleCard(props) {

    useEffect(() => {
        AOS.init({
            duration: 400,
            easing: 'ease-in-out',
            once: false,
        });
    }, []);

    const cardsData = [
        {title: 'Wallet to have a hustle free wash experience.' , description: 'We have made the washing experience easiy and cashless. ' , image: images.easy1.default.src , position: 'bottom'},
        {title: 'Pay as you go, as easy as it sounds' , description: 'Reach out to the the wash bay and get your car clean, just with a tap.' , image: images.easy2.default.src , position: 'top'},
        {title: 'Quick wash plan 5mins free every day' , description: 'Subscribe to our quick wash plan and get 5min free wash everyday.' , image: images.easy3.default.src , position: 'bottom'},
    ];

    return (
        <React.Fragment>
            <div className="container">
                <div className="easy-hustle-card-sec ">
                    <div className="col-12" data-aos-delay={'50'} data-aos={'fade-right'}>
                        <h2 className="mb-md-1  text-white">Easy and hustle free wash with wash agent</h2>
                        <h5 className="mb-4 mb-md-0 text-white">Keep your car shiny as new every day with ease.</h5>
                    </div>
                    <div className="col-12 data-cards-main-sec">
                        <div className="row mx-md-0">
                            {
                                cardsData?.map((card , index, arr) => {
                                    const isLastImage = arr?.length - 1 === index;
                                    return(
                                        <div className={`col-md ${isLastImage ? '' : 'mb-4 mb-md-0'}`} key={index}>
                                            <div className="col-12 data-card-sec card"  data-aos-delay={index === 0 ? '100' : index === 1 ? '200' : '300'} data-aos={'fade-up'}>
                                                <img src={card.image}
                                                     className={`img-fluid ${isLastImage ? 'object-fit-md-contain' : ''} ${card?.position === 'top' ? 'top-position-image mb-md-40 mb-3' : 'data-card-image'}`}/>
                                                <h3 className="mb-md-12">{card?.title}</h3>
                                                <h5 className="mb-0 text-secondary">{card.description}</h5>
                                            </div>
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

export default EasyAndHustleCard;