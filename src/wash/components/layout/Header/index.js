import React, {useState} from 'react';
import {images} from "../../../../constant";
import MobileMenuModal from "@/components/layout/Header/MobileMenuModal";
import {useRouter} from "next/router";

function Header(props) {

    const router = useRouter();
    const [showMenuModal , setShowMenuModal] = useState(false);

    const headerLinks = [
        {label: 'About us' , link: ''},
        {label: 'Why us' , link: ''},
        {label: 'Privacy policy' , link: '/privacy-policy'},
        {label: 'Terms & conditions' , link: '/terms-and-conditions'},
        {label: 'Contact us' , link: '' , isButton: true , className: 'btn btn-primary'},
    ];

    return (
        <React.Fragment>
            <div className="header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-auto col">
                            <img
                                onClick={() => router.push('/')}
                                src={images.colorLogo.default.src}
                                 alt="logo"
                                 className="header-logo pointer img-fluid"
                            />
                        </div>
                        <div className="col-auto d-md-none">
                            <svg onClick={() => setShowMenuModal(true)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff"
                                 className="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </div>
                        <div className="col d-none d-md-block">
                            <div className="row align-items-center px-1 justify-content-end">
                                {
                                    headerLinks?.map((link, index) => {
                                        return (
                                            <div className="col-auto" key={index}>
                                                {
                                                    link?.isButton ?
                                                        <button onClick={() => !!link?.link && router.push(link?.link)} className={link?.className}>{link?.label}</button>
                                                        :
                                                        <a onClick={() => !!link?.link && router.push(link?.link)} className="header-link">{link?.label}</a>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <div className="col-auto">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileMenuModal {...{showMenuModal , setShowMenuModal , headerLinks}} />
        </React.Fragment>
    );
}

export default Header;