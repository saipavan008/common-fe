import React, { useEffect, useMemo} from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "universal-cookie";
import {setCart, setUserDetails, updateCart} from "@/redux/actions/stateActions";
import Buttons from "@/component/common/Buttons";
import {Bank, ProfileCircle, ShoppingCart} from "iconsax-react";
import CommonDropdown from "@/component/common/CommonDropdown";
import API from "@/component/api/Auth";


const cookies  = new Cookies;
const api = new API();

function Header() {

    const router = useRouter();
    const dispatch = useDispatch();
    const data = useSelector(state => state?.state);

    useEffect(() => {
        const userData = cookies.get('frugy_user');
        if (userData){
            dispatch(setUserDetails(userData));
        }
    }, []);

    useEffect(() => {
        fetchCartData()
    }, [data?.data?.user]);

    const userData = useMemo(() => {
        return data?.data;
    },[data]);

    const cartData = useMemo(() => {
        return data?.cart;
    },[data]);

    const fetchCartData = () => {
        api.getCartItems().then(res => {
            if (res?.data?.data){
                dispatch(setCart(res?.data?.data))
            }
        })
    }

    const handleLogout = () => {
        cookies.remove('frugy_user')
        dispatch(setUserDetails({}))
        setTimeout(() => {
            router.push('/')
        }, 300)
    }

    const dropdownItems = [
        {label: 'Dashboard', onClick: () => {}},
        {label: 'Admin', onClick: () => router?.push('/admin')},
        {label: 'Logout', onClick: () => handleLogout()},
    ];

    return (
        <div className="bg-primary py-2 shadow">
            <div className="container">
                <div className="col-12">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="mb-0 text-white d-inline-flex pointer" onClick={() => router.push('/')}>
                                {/*<img src={images.logo.default.src} className="img-fluid brand-logo"/>*/}
                                Frugy</h3>
                        </div>
                        {
                            !!userData?.user ?
                                <>
                                    <div className="col-auto">
                                        <Buttons
                                            type={'btn-blank'}
                                            size={'btn-sm'}
                                            onClick={() => {router.push('/my-cashbooks')}}
                                            icon={<Bank className={'text-white'}/>}
                                            iconOnly={true}
                                            className={'border-0 p-0'}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        {/*<button className="btn btn-primary" onClick={() => handleLogout()}>Logout</button>*/}
                                        <div className="cart-button-sec">
                                            <Buttons
                                                type={'btn-blank'}
                                                size={'btn-sm'}
                                                onClick={() => {router.push('/cart')}}
                                                icon={<ShoppingCart className={'text-white'}/>}
                                                iconOnly={true}
                                                className={'border-0 p-0'}
                                            />
                                            {
                                                !!cartData?.length &&
                                                <div className='cart-count-sec'>
                                                    <h6 className="mb-0 count-text">{cartData?.length}</h6>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <CommonDropdown
                                            toggleButton={
                                                <Buttons
                                                    type={'btn-blank'}
                                                    size={'btn-sm'}
                                                    onClick={() => {}}
                                                    icon={<ProfileCircle className={'text-white'}/>}
                                                    iconOnly={true} className={'border-0 p-0'}
                                                />
                                            }
                                            dropdownItems={dropdownItems}
                                        />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-auto">
                                        <button className="btn btn-primary" onClick={() => router.push("/sign-up")}>Create account</button>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-outline-primary" onClick={() => router.push("/login")}>Login</button>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

