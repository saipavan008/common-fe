import React from 'react';
import AddItemsSection from "@/component/admin/AddItemsSection";

function Admin(props) {
    return (
        <React.Fragment>
            <div className="container py-5">
                <AddItemsSection />
            </div>
        </React.Fragment>
    );
}

export default Admin;