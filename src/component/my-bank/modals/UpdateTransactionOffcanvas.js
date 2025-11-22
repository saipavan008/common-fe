import React, {useState} from 'react';
import {Offcanvas} from "react-bootstrap";
import InputFiled from "@/component/common/InputFiled";
import SelectField from "@/component/common/SelectField";
import Buttons from "@/component/common/Buttons";
import MessageHandler from "@/component/common/MessageHandler";
import CommonDatePicker from "@/component/common/CommonDatePicker";
import moment from "moment/moment";

function UpdateTransactionOffcanvas({
                                        showUpdateTransactionModal,
                                        setShowUpdateTransactionModal,
                                        handleSubmit,
                                        handleChange,
                                        formData,
                                        message,
                                        transactionItemId,
                                        handleClose
}) {

    const isEditTransaction = showUpdateTransactionModal === 'edit';

    const paymentTypeOptions = [
        {label: 'Cash', value: 'Cash'},
        {label: 'Online', value: 'Online'},
    ];


    return (
        <React.Fragment>
            <Offcanvas
                show={showUpdateTransactionModal}
                onHide={handleClose}
                placement={'end'}
            >
                <Offcanvas.Header className="border-bottom" closeButton>
                    <Offcanvas.Title className="fw-bold text-uppercase">{isEditTransaction ? 'Transaction details' : `Cash ${showUpdateTransactionModal} entry`}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column">
                    <>
                        <div className="flex-grow-1">
                            <InputFiled
                                label={'Enter amount'}
                                name={'amount'}
                                type={'number'}
                                placeholder={'Enter amount'}
                                handleChange={handleChange}
                                value={formData?.amount}
                                message={message}
                                showAsterisk={true}
                            />
                            <InputFiled
                                name={'remark'}
                                label={'Remark'}
                                placeholder={'Enter remark'}
                                handleChange={handleChange}
                                value={formData?.remark}
                            />
                            <InputFiled
                                name={'category'}
                                label={'Category'}
                                placeholder={'Enter category'}
                                handleChange={handleChange}
                                value={formData?.category}
                            />
                            <SelectField
                                name={'payment_mode'}
                                label={'Payment mode'}
                                options={paymentTypeOptions}
                                placeholder={'Select mode'}
                                handleChange={handleChange}
                                message={message}
                                showAsterisk={true}
                                value={paymentTypeOptions?.filter(item => item.value === formData?.payment_mode)}
                            />
                            <CommonDatePicker
                                label={'Select transaction date'}
                                date={formData?.created_at}
                                handleChange={handleChange}
                                name={'created_at'}
                            />
                        </div>
                        <div className="mt-4">
                            <MessageHandler message={message} name={'transaction_update'} className={'mb-1'} textCenter={true}/>
                            <Buttons
                                label={isEditTransaction ? 'UPDATE' : "SAVE"}
                                type={'btn-success'}
                                className="w-100 rounded-3"
                                onClick={() => handleSubmit(showUpdateTransactionModal)}
                            />
                        </div>
                    </>
                </Offcanvas.Body>
            </Offcanvas>
        </React.Fragment>
    );
}

export default UpdateTransactionOffcanvas;