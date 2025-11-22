import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import InputFiled from "@/component/common/InputFiled";
import Buttons from "@/component/common/Buttons";
import {deepClone} from "@/component/helpers";
import API from "@/component/api/Auth";
import MessageHandler from "@/component/common/MessageHandler";

const api = new API();
function CashBookEditModal({
                               editCashbookItem ,
                               setEditCashbookItem,
                               getAllMyCashBooks
}) {

    const [formData , setFormData] = useState({});
    const [message , setMessage] = useState({});
    const [buttonDisabled , setButtonDisabled] = useState(true);

    useEffect(() => {
        setFormData(editCashbookItem);
    }, [editCashbookItem]);

    const handleChange = (e) => {
        setMessage({});
        const shaLLowCopy = deepClone(formData);
        const {value , name} = e.target;
        shaLLowCopy[name] = value;
        setButtonDisabled(editCashbookItem?.book_title === value)
        setFormData(shaLLowCopy);
    }

    const handleClose = () => {
        setEditCashbookItem(null)
    }

    const updateCashBook = () => {
        const data = deepClone(formData);

        api.updateCashbook(data).then((res) => {
            setMessage({updateSuccess: true , text: res.data?.message})
            getAllMyCashBooks();
            setTimeout(() => {
                handleClose();
                setMessage({});
            }, 1000)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <React.Fragment>
            <Modal
                show={!!editCashbookItem}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <h5 className="mb-0 fw-semibold">Rename Cashbook</h5>
                </Modal.Header>
                <Modal.Body>
                    <InputFiled
                        label={'Book Title'}
                        name={'book_title'}
                        placeholder={'Enter title'}
                        handleChange={handleChange}
                        value={formData?.book_title}
                        message={message}
                        showAsterisk={true}
                    />
                    <Buttons
                        label={'Save'}
                        className={'w-100'}
                        onClick={() => updateCashBook()}
                        disabled={buttonDisabled}
                    />
                    <MessageHandler message={message} name={'updateSuccess'} type={'text-success'} textCenter={true}/>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default CashBookEditModal;