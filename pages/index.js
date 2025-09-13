import React, {useEffect, useMemo, useState} from 'react';
import Auth from "../src/component/api/Auth";
import Home from "@/component/home";
import ProductsCard from "@/component/home/ProductsCard";
import InputFiled from "@/component/common/InputFiled";
import {deepClone} from "@/component/helpers";
import SelectField from "@/component/common/SelectField";
import {packageCategory} from "../constant/common-data";
import Cookies from "cookies";
import {useDispatch, useSelector} from "react-redux";
import {setUserDetails, updateCart} from "@/redux/actions/stateActions";

const api = new Auth;

function Index({initialData}) {

    const data = useSelector(state => state?.state?.data);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [allProductsData, setAllProductsData] = useState([]);
    const [filterData, setFilterData] = useState({
        search: '',
        category: ''
    })

    const userData = useMemo(() => {
        return data?.user
    },[data])

    useEffect(() => {
        dispatch(setUserDetails(initialData))
    },[initialData])

    useEffect(() => {
        getAllPackages();
    }, []);

    useEffect(() => {
        if (filterData?.search?.length > 3) {
            getAllPackages(filterData);
        } else {
            if (filterData?.search?.length === 3) {
                if (!!filterData?.category) {
                    const shallowCopyFilters = deepClone(filterData);
                    delete shallowCopyFilters?.search
                    getAllPackages(shallowCopyFilters);
                } else {
                    getAllPackages({});
                }
            }
        }
    }, [filterData]);

    const getAllPackages = (query = {}) => {
        api.getAllPackages(query).then(res => {
            setAllProductsData(res.data?.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
            setIsLoading(false);
        })
    };

    const handleSearch = (e) => {
        const event = e.target;
        setFilterData((prev) => ({
            ...prev, search: event?.value
        }))
    }

    const handleChangeCategory = (e) => {
        const shallowCopy = deepClone(filterData);
        const event = e.target;
        shallowCopy[event.name] = event.value
        setFilterData(shallowCopy)
        getAllPackages(shallowCopy);
    }

    const handleClick = (item, type) => {
        if (!item) return;
        let data = item;
        data.is_added_to_cart = type === 'add';
        api.updatePackage(data).then((res => {
            if (res?.data?.data){
                dispatch(updateCart(res?.data?.data));
                getAllPackages();
            }
        })).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="col-12">
            {
                !!userData ?
                    <div className="container pb-5 pt-3">
                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col-5">
                                    <InputFiled
                                        name={'search'}
                                        placeholder={'Search by package name'}
                                        handleChange={handleSearch}
                                        value={filterData?.search}
                                    />
                                </div>
                                <div className="col-4">
                                    <SelectField
                                        name={'category'}
                                        value={[{
                                            label: 'All',
                                            value: 'All'
                                        }, ...packageCategory]?.filter(item => item.value === filterData?.category)}
                                        handleChange={handleChangeCategory}
                                        placeholder={'Select category'}
                                        options={[{label: 'All', value: 'All'}, ...packageCategory]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                allProductsData?.map((item, index) => {
                                    return (
                                        <ProductsCard {...{item, isLoading, handleClick, index}} key={index}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <Home/>
            }
        </div>
    );
}

export default Index;

export async function getServerSideProps({ req, res }) {
    const cookies = new Cookies(req, res);
    const userData = cookies.get("frugy_user") || null;

    const decodeData = decodeURIComponent(userData)

    return {
        props: {
            initialData: userData ? JSON.parse(decodeData) : null
        }
    }
}