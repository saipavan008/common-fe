import React from 'react';
import {Modal} from "react-bootstrap";
import {images} from "../../../../constant";
import {useRouter} from "next/router";

function MobileMenuModal({showMenuModal , setShowMenuModal , headerLinks}) {

    const router = useRouter();
    const handleClose = () => {
        setShowMenuModal(false);
    };

    return (
        <React.Fragment>
            <Modal
                show={showMenuModal}
                dialogClassName={'slide-modal'}
                onHide={handleClose}
            >
                <Modal.Header className="py-2" closeButton>
                    <img src={images.colorLogo.default.src} alt="logo" className="header-logo img-fluid"/>
                </Modal.Header>
                <Modal.Body>
                    {
                        headerLinks?.map((link, index) => {
                            return (
                                <div className="col-12 mb-2" key={index}>
                                    <a className="text-dark" onClick={() => {
                                        if(!!link?.link) {
                                            router.push(link?.link);
                                            // handleClose();
                                        }
                                        handleClose();
                                    }}>{link?.label}</a>
                                </div>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default MobileMenuModal;