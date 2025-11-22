import React from 'react';
import {ArrowLeft} from "iconsax-react";
import {useRouter} from "next/router";

function BackButton(props) {

    const router = useRouter();

    return (
        <React.Fragment>
            <ArrowLeft
                className="back-arrow"
                onClick={() => router.back()}
            />
        </React.Fragment>
    );
}

export default BackButton;