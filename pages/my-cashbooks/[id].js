import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import API from "@/component/api/Auth";
import BackButton from "@/component/common/BackButton";
import Buttons from "@/component/common/Buttons";
import UpdateTransactionOffcanvas from "@/component/my-bank/modals/UpdateTransactionOffcanvas";
import {checkField, deepClone, getFormatDate, getFormatTime} from "@/component/helpers";
import {transactionsFormData} from "../../constant";
import Tag from "@/component/common/Tag";
import CommonTags from "@/component/common/CommonTags";
import CommonDropdown from "@/component/common/CommonDropdown";
import {More} from "iconsax-react";

const api = new API();

function CashbookId(props) {

    const router = useRouter();
    const {id} = router?.query;
    const [cashBookData, setCashbookData] = useState({});
    const [showUpdateTransactionModal, setShowUpdateTransactionModal] = useState('');
    const [formData, setFormData] = useState(transactionsFormData);
    const [message, setMessage] = useState({});
    const [transactionItemId, setTransactionItemId] = useState(null);
    const [deletingItemId , setDeletingItemId] = useState(null)

    useEffect(() => {
        if (!!transactionItemId){
            const transactionItem = cashBookData?.transactions?.find(item => String(item?._id) === String(transactionItemId));
            if (transactionItem) {
                transactionItem.amount = transactionItem?.transaction_amount
                transactionItem.payment_mode = transactionItem?.transaction_mode
                setFormData(transactionItem)
            }
        }
    }, [transactionItemId]);

    useEffect(() => {
        if (!!id) {
            getCashbookSingleDetails(id)
        }
    }, [id]);

    const getCashbookSingleDetails = (id) => {
        api.getCashbookSingleDetails(id).then(res => {
            setCashbookData(res?.data?.data)
        })
    }

    const handleChange = (e) => {
        const shallowCopy = deepClone(formData);
        setMessage({});
        const {name, value} = e.target;
        shallowCopy[name] = value;
        setFormData(shallowCopy)
    }

    const getUpdateTransaction = (type) => {
        setShowUpdateTransactionModal(type);
    }

    const getLayout = (label = '', value = null, labelClass = '', showMb = false) => {
        return (
            <div className={`col-12  ${showMb ? 'mb-2' : ''}`}>
                <div className="row">
                    <div className="col">
                        <h6 className="mb-0 fw-medium">{label}</h6>
                    </div>
                    <div className="col-auto">
                        <h6 className={`mb-0 fw-medium ${labelClass}`}>{value}</h6>
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmit = (type) => {
        const payload = deepClone(formData);

        if (!checkField(payload, 'amount', 'Enter amount', setMessage)) return
        if (!checkField(payload, 'payment_mode', 'Select payment mode', setMessage)) return

        if (type === 'edit') {
            const transactionItem = cashBookData?.transactions?.find(item => String(item?._id) === String(transactionItemId));
            payload.transaction_type = transactionItem?.transaction_type || '';

            api.editAndUpdateTransactions(payload, id, transactionItemId).then(res => {
                setMessage({transaction_update: true, text: res?.data?.message, type: 'text-success'})
                getCashbookSingleDetails(id);
                setTimeout(() => {
                    setShowUpdateTransactionModal('');
                    setFormData(transactionsFormData);
                    setMessage({})
                }, 1000)
            }).catch(e => {
                console.log(e)
            })
        }else {
            payload.transaction_type = type;

            api.updateTransactions(payload, id, transactionItemId).then(res => {
                setMessage({transaction_update: true, text: res?.data?.message, type: 'text-success'})
                getCashbookSingleDetails(id);
                setTimeout(() => {
                    setShowUpdateTransactionModal('');
                    setFormData(transactionsFormData);
                    setMessage({})
                }, 1000)
            }).catch(e => {
                console.log(e)
            })
        }

    }

    const groupedDataBasedOnDate = useMemo(() => {
        const {transactions} = cashBookData;
        return transactions
            ?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at))
            ?.reduce((acc, item) => {
                const date = getFormatDate(item?.created_at);
                if (!acc[date]) acc[date] = [];
                acc[date]?.push(item);
                return acc
            }, [])
    }, [cashBookData]);

    const handleSelectTransactionItem = (transaction) => {
        setShowUpdateTransactionModal('edit');
        setTransactionItemId(transaction?._id);
    }

    const getDropdownItems = (item) =>  {
        return(
            [
                {label: 'Edit', onClick: (e) => {
                        e.stopPropagation()
                        handleSelectTransactionItem(item);
                    }},
                {label: 'Delete', onClick: (e) => {
                        e.stopPropagation()
                        handleDeleteCashbookItem(item)
                    }},
            ]
        )
    };

    const handleDeleteCashbookItem = (item) => {
        const {_id: transactionId} = item;
        api.deleteTransactions(id, transactionId).then(res => {
            setDeletingItemId(item?._id);
            setTimeout(() => {
                setDeletingItemId(null);
                getCashbookSingleDetails(id);
            }, 1500)
        }).catch(e => {
            console.log(e)
        })
    }


    return (
        <React.Fragment>
            <div className="col-7 mx-auto py-5">
                <div className="mb-2">
                    <div className="row">
                        <div className="col-auto">
                            <BackButton/>
                        </div>
                        <div className="col">
                            <h4 className="mb-0">{cashBookData?.book_title}</h4>
                        </div>
                    </div>
                </div>
                <div className="card p-3 mb-3">
                    <div className={`col-12  mb-3 border-bottom pb-3`}>
                        <div className="row">
                            <div className="col">
                                <h5 className="mb-0 fw-semibold">Net balance</h5>
                            </div>
                            <div className="col-auto">
                                <h5 className="mb-0 fw-semibold">{cashBookData?.net_balance}</h5>
                            </div>
                        </div>
                    </div>
                    {getLayout('Total In (+)', cashBookData?.total_in, 'text-success', true)}
                    {getLayout('Total Out (-)', cashBookData?.total_out, 'text-danger', false)}
                </div>
                <div className="row">
                    <div className="col">
                        <Buttons
                            label={"+ CASH IN"}
                            className="w-100 rounded-3"
                            type={'btn-success'}
                            onClick={() => getUpdateTransaction('Credit')}
                        />
                    </div>
                    <div className="col">
                        <Buttons
                            label={"- CASH OUT"}
                            className="w-100 rounded-3"
                            type={'btn-danger'}
                            onClick={() => getUpdateTransaction('Debit')}
                        />
                    </div>
                </div>
                <div className="col-12 mt-4 pt-3">
                    <h4 className="fw-semibold mb-3">All transactions</h4>
                    <div className="px-3">
                        {
                            !!cashBookData?.transactions?.length ?
                                Object.entries(groupedDataBasedOnDate)?.map(([date, transactions], index, arr) => {
                                    const isLast = arr.length - 1 === index;
                                    return (
                                        <div className={`${isLast ? '' : 'mb-3'} `} key={index}>
                                            <CommonTags
                                                tagType={'h6'}
                                                content={date}
                                                className={`mb-1 fw-medium`}
                                            />
                                            {
                                                transactions?.map((transaction, transactionIndex, arr) => {
                                                    return (
                                                        <div className={`card pointer mb-2 is-item-deleting ${deletingItemId === transaction?._id ? 'deleting-active' : ''} `}
                                                             key={transactionIndex}
                                                             onClick={() => handleSelectTransactionItem(transaction)}
                                                        >
                                                            <div className="row">
                                                                <div className="col">
                                                                    <Tag
                                                                        tag={transaction?.transaction_mode}
                                                                    />
                                                                    {
                                                                        transaction?.category &&
                                                                        <CommonTags
                                                                            tagType={'p'}
                                                                            content={`${transaction?.category}`}
                                                                            className={`mb-0 fw-normal mt-1`}
                                                                        />
                                                                    }
                                                                </div>
                                                                <div className="col-auto">
                                                                    <CommonTags
                                                                        tagType={'h6'}
                                                                        content={transaction?.transaction_amount}
                                                                        className={`fw-medium mb-0 text-end ${transaction?.transaction_type === 'Credit' ? 'text-success' : 'text-danger'}`}
                                                                    />
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
                                                                        dropdownItems={getDropdownItems(transaction)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 border-top pt-2 mt-2">
                                                                <div className="row">
                                                                    <div className="col-auto">
                                                                        <CommonTags
                                                                            tagType={'p'}
                                                                            content={`Balance: ${transaction?.transaction_net_balance}`}
                                                                            className={`mb-0 text-secondary fw-normal`}
                                                                        />
                                                                    </div>
                                                                    <div className="col separator-start">
                                                                        <CommonTags
                                                                            tagType={'p'}
                                                                            content={`Entry by You at ${getFormatTime(transaction?.created_at)}`}
                                                                            className={`mb-0 fw-normal text-secondary`}
                                                                        />
                                                                    </div>
                                                                    {
                                                                        !!transaction?.last_edit &&
                                                                        <div className="col-auto">
                                                                            <CommonTags
                                                                                tagType={'p'}
                                                                                content={`Last edit at ${getFormatTime(transaction?.last_edit)}`}
                                                                                className={`mb-0 fw-normal text-secondary`}
                                                                            />
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                                :
                                <>
                                    <CommonTags
                                        tagType={'p'}
                                        content={`No transactions added at.`}
                                        className={`mb-0 fw-normal text-secondary`}
                                    />
                                </>
                        }
                    </div>
                </div>
            </div>
            <UpdateTransactionOffcanvas
                {...{
                    handleSubmit,
                    showUpdateTransactionModal,
                    setShowUpdateTransactionModal,
                    handleChange,
                    formData,
                    message,
                    transactionItemId,
                }}
                handleClose={() =>{
                    setFormData(transactionsFormData);
                    setShowUpdateTransactionModal('');
                    setTransactionItemId(null);
                }}
            />
        </React.Fragment>
    );
}

export default CashbookId;