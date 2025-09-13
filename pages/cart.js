import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import API from "@/component/api/Auth";
import ProductsCard from "@/component/home/ProductsCard";
import {updateCart} from "@/redux/actions/stateActions";
import Buttons from "@/component/common/Buttons";
import {useRouter} from "next/router";
import {ShoppingCart} from "iconsax-react";
import {Stripe} from "stripe";
import {loadStripe} from '@stripe/stripe-js';


const api = new API();

function Cart(props) {

    const dispatch = useDispatch();
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userData = useSelector(state => state?.state?.data)

    useEffect(() => {
        getCartData();
    }, []);

    const getCartData = () => {
        api.getCartItems().then(res => {
            if (res?.data?.data) {
                setCartItems(res?.data?.data);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err)
            setIsLoading(false);
        })
    }

    const handleClickItem = (item, type) => {
        if (!item) return;
        let data = item;
        data.is_added_to_cart = type === 'add';
        api.updatePackage(data).then((res => {
            if (res?.data?.data) {
                dispatch(updateCart(res?.data?.data));
                getCartData();
            }
        })).catch(err => {
            console.log(err)
        })
    }

    const BillingSummaryLabelLayout = ({
                                           title = '',
                                           value = null,
                                           isLast = false,
                                           showBorderBottom = false,
                                           fontSemibold = false
                                       }) => {
        return (
            <div className={`col-12 ${isLast ? '' : 'mb-3'} ${showBorderBottom ? 'border-bottom pb-3' : ''}`}>
                <div className="row">
                    <div className="col">
                        <h6 className={`mb-0 ${fontSemibold ? 'fw-semibold' : ''}`}>{title}</h6>
                    </div>
                    <div className="col-auto">
                        <h6 className={`mb-0 ${fontSemibold ? 'fw-semibold' : ''}`}>{value}</h6>
                    </div>
                </div>
            </div>
        )
    };

    const proceedToPay = async () => {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        const {data} = await api.checkout(cartItems)
        const result = stripe.redirectToCheckout({
            sessionId: data.id,
        })
    }

    return (
        <React.Fragment>
            <div className="container py-4">
                <h3 className="mb-3">Cart</h3>
                {
                    !!cartItems?.length ?
                        <div className="row">
                            <div className="col">
                                {
                                    !!cartItems?.length &&
                                    cartItems?.map((item, index, arr) => {
                                        return (
                                            <ProductsCard
                                                {...{
                                                    item,
                                                    isLoading,
                                                    handleClick: handleClickItem,
                                                    itemClassName: 'col-12',
                                                    index
                                                }}
                                                key={index}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className="col-4">
                                <h4 className="fw-semibold">Billing summary</h4>
                                <div className="card p-3 mb-3">
                                    <BillingSummaryLabelLayout
                                        title={'Total Amount'}
                                        value={cartItems?.[0]?.total_cart_amount}
                                    />
                                    <BillingSummaryLabelLayout
                                        title={'Tax'}
                                        value={cartItems?.[0]?.tax}
                                        showBorderBottom={true}
                                    />
                                    <BillingSummaryLabelLayout
                                        title={'Payable Amount'}
                                        value={cartItems?.[0]?.total_payable_amount}
                                        isLast={true}
                                        fontSemibold={true}
                                    />
                                </div>
                                <Buttons
                                    label={'Proceed to pay'}
                                    className={'w-100'}
                                    onClick={() => proceedToPay()}
                                />
                            </div>
                        </div>
                        :
                        <div className="col-12 text-center pt-5 mt-4">
                            <ShoppingCart size={100} className='text-secondary'/>
                            <h6 className="mb-3 text-secondary">Your cart is empty</h6>
                            <Buttons
                                label={'Add Now'}
                                onClick={() => router.push('/')}
                            />
                        </div>
                }
            </div>
        </React.Fragment>
    );
}

export default Cart;
