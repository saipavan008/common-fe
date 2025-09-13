import React from 'react';
import {images} from "../../../constant";
import {useRouter} from "next/router";

function Footer(props) {

    const router = useRouter();
    const footerLinks = [
        {title: 'Contact us' , link: ''},
        {title: 'Privacy policy' , link: '/privacy-policy'},
        {title: 'Terms & conditions' , link: '/terms-and-conditions'},
    ];

    return (
        <React.Fragment>
            <div className="col-12 footer">
                <div className="container">
                    <img src={images.whiteLogo.default.src} className="footer-logo mb-10 d-none d-md-block" alt="log"/>
                    <div className="row text-white align-items-center justify-content-center">
                        <div className="col-md order-1 order-md-0 mt-3 mt-md-0">
                            <h6 className="mb-0 text-center text-md-start">© 2023 Qualwebs. All rights reserved.</h6>
                        </div>
                        {
                            footerLinks?.map((link , index, arr) => {
                                const isLast = arr.length - 1 === index;
                                return (
                                    <div className={`col-auto ${isLast ? '' : 'border-end'}`} key={index}>
                                        <h6 className="mb-0 lh-1 footer-links" onClick={() => link?.link ? router.push(link.link) : null}>{link?.title}</h6>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Footer;