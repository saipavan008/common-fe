import React, {useEffect, useState} from 'react';
import CommonDropdown from "@/component/common/CommonDropdown";
import Buttons from "@/component/common/Buttons";
import {ArrowLeft, More, ProfileCircle} from "iconsax-react";
import InputFiled from "@/component/common/InputFiled";
import SelectField from "@/component/common/SelectField";
import {bankBookInitialFormData} from "../../constant";
import {checkField, deepClone, getBalanceType, getFormatDate} from "@/component/helpers";
import API from "@/component/api/Auth";
import MessageHandler from "@/component/common/MessageHandler";
import CashBookEditModal from "@/component/my-bank/modals/CashBookEditModal";
import {useRouter} from "next/router";

const api = new API();

function MyCashbooks(props) {

    const router = useRouter();
    const [formData , setFormData] = useState(bankBookInitialFormData);
    const [message , setMessage] = useState({});
    const [allCashbooks , setAllCashbooks] = useState([]);
    const [showAddNewBookFields , setShowAddNewBookFields] = useState(false);
    const [editCashbookItem , setEditCashbookItem] = useState(null);
    const [deletingItemId , setDeletingItemId] = useState(null)

    const getDropdownItems = (item) =>  {
        return(
            [
                {label: 'Rename', onClick: (e) => {
                        e.stopPropagation()
                        setEditCashbookItem(item);
                    }},
                {label: 'Delete', onClick: (e) => {
                        e.stopPropagation()
                        handleDeleteCashbookItem(item)
                    }},
            ]
        )
    };


    useEffect(() => {
        getAllMyCashBooks();
    }, []);

    const handleChange = (e) => {
        setMessage({})
        const shallowCopy = deepClone(formData);
        const {name , value} = e.target;
        shallowCopy[name] = value;
        setFormData(shallowCopy);
    }

    const getAllMyCashBooks = () => {
        api.getAllCashbooks().then(res => {
            setAllCashbooks(res.data?.data)
        })
    }

    const handleDeleteCashbookItem = (item) => {
        const newId = {_id: item?._id};
        api.deleteCashbook(newId).then(res => {
            setDeletingItemId(item?._id);
            setTimeout(() => {
                setDeletingItemId(null);
                getAllMyCashBooks();
            }, 1500)
        }).catch(e => {
            console.log(e)
        })
    }

    const createNewBook = () => {
        const data = deepClone(formData);
        if (!checkField(data , 'book_title', 'Enter cashbook title' , setMessage)) return
        // if (!checkField(data , 'balance_type', 'Select balance type' , setMessage)) return
        // if (!checkField(data , 'payment_type', 'Select payment type' , setMessage)) return

        api.addCashBook(data).then(res => {
            setMessage({bookCreated: true , text: res?.data?.message})
            setTimeout(() => {
                setFormData(bankBookInitialFormData);
                setMessage({});
                getAllMyCashBooks();
                setShowAddNewBookFields(false);
            }, 1500)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <React.Fragment>
            <div className="container py-4">
                <div className="col-12">
                    <h4 className="mb-3 fw-semibold">Your books</h4>
                    <div className="row">
                        <div className="col">
                            {
                                !!allCashbooks?.length ?
                                    allCashbooks?.map((book , index,arr) => {
                                        const isLast = arr.length - 1 === index;
                                        return(
                                            <div
                                                className={`col-12 card p-3 pointer is-item-deleting ${deletingItemId === book?._id ? 'deleting-active' : ''} ${isLast ? '' : 'mb-3'}`}
                                                key={index}
                                                onClick={() => router.push(`/my-cashbooks/${book?._id}`)}
                                            >
                                                <div className="row">
                                                    <div className="col">
                                                        <h6 className="mb-1 fw-semibold">{book?.book_title}</h6>
                                                        <p className="mb-0 text-secondary">Updated on {getFormatDate(book?.createdAt)}</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <h6 className={`mb-0 fw-semibold ${getBalanceType(book?.net_balance)}`}>{book?.net_balance}</h6>
                                                    </div>
                                                    <div className="col-auto">
                                                        <CommonDropdown
                                                            toggleButton={
                                                                <Buttons
                                                                    type={'btn-blank'}
                                                                    size={'btn-sm'}
                                                                    onClick={() => {}}
                                                                    icon={<More className={'more-icon'}/>}
                                                                    iconOnly={true}
                                                                    className={'border-0 p-0 h-100'}
                                                                />
                                                            }
                                                            dropdownItems={getDropdownItems(book)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <p className="mb-0 text-secondary">Currently no cashbooks available at the moment</p>
                            }
                        </div>
                        <div className="col">
                            {
                                showAddNewBookFields ?
                                    <>
                                        <div className="card p-3 mb-3">
                                            <h5 className="mb-3 fw-semibold">
                                                <ArrowLeft

                                                    className="back-arrow"
                                                    onClick={() => setShowAddNewBookFields(false)}
                                                />&nbsp;
                                                Add your new cashbook</h5>
                                            <InputFiled
                                                label={'Book Title'}
                                                name={'book_title'}
                                                placeholder={'Enter title'}
                                                handleChange={handleChange}
                                                value={formData?.book_title}
                                                message={message}
                                                showAsterisk={true}
                                            />
                                            <InputFiled
                                                name={'description'}
                                                label={'Description'}
                                                placeholder={'Enter description'}
                                                handleChange={handleChange}
                                                value={formData?.description}
                                            />
                                        </div>
                                        <Buttons
                                            label={'Add New Cashbook'}
                                            className={'w-100'}
                                            onClick={() => createNewBook()}
                                        />
                                        <MessageHandler message={message} name={'bookCreated'} type={'text-success text-center'}/>
                                    </>
                                    :
                                    <>
                                        <div className="add-new-csh-book-button-section" onClick={() => setShowAddNewBookFields(true)}>
                                            <h6 className="mb-0">Add your new cashbook</h6>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <CashBookEditModal
                {...{
                    editCashbookItem,
                    setEditCashbookItem,
                    getAllMyCashBooks
                }}
            />
        </React.Fragment>
    );
}

export default MyCashbooks;
