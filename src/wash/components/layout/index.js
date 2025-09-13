import React from 'react';
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

function Index({children}) {
    return (
        <React.Fragment>
            <Header/>
            {children}
            <Footer/>
        </React.Fragment>
    );
}

export default Index;