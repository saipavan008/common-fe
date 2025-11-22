import React, {useEffect, useState} from 'react';
import {Offcanvas} from "react-bootstrap";

function EditTransactionOffcanvas({
                                      transactionItemId=null,
                                      setTransactionItemId,
                                      allTransactions=[]
                                  }) {

    const [formData , setFormData] = useState({});

    useEffect(() => {
        setFormData(allTransactions?.filter(item => item?._id === transactionItemId)?.[0])
    }, [transactionItemId]);

    return (
        <React.Fragment>
            <Offcanvas
                show={transactionItemId}
                onHide={() => setTransactionItemId(null)}
                placement={'end'}
            >
                <Offcanvas.Header className="border-bottom" closeButton>
                    <Offcanvas.Title className="fw-bold text-uppercase">Transaction details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column">
                </Offcanvas.Body>
            </Offcanvas>
        </React.Fragment>
    );
}

export default EditTransactionOffcanvas;