import React, {useEffect, useState} from 'react';
import InputFiled from "@/component/common/InputFiled";
import {checkField, deepClone} from "@/component/helpers";
import {addItemsListData, itemsData, packageCategory} from "../../../constant/common-data";
import SelectField from "@/component/common/SelectField";
import API from "@/component/api/Auth";
import {AddCircle, Trash} from "iconsax-react";
import MessageHandler from "@/component/common/MessageHandler";

function AddItemsSection(props) {

    const api = new API();
    const [initialFormData , setInitialFormData] = useState(deepClone(addItemsListData))
    const [formData , setFormData] = useState(initialFormData);
    const [message , setMessage] = useState({});
    const [packageData , setPackageData] = useState([]);
    const [isShowFieldsData , setIsShowFieldsData] = useState(false);

    useEffect(() => {
        getAllPackages();
    }, []);

    const handleChange = (e) => {
        setMessage({})
        const shallowCopy = deepClone(formData);
        const {name , value} = e.target;
        shallowCopy[name] = value;
        setFormData(shallowCopy);
    };

    const handlePackage = () => {

        let data = deepClone(formData);

        if (!checkField(data , 'package_name', 'Enter package name' , setMessage)) return
        if (!checkField(data , 'price', 'Enter price' , setMessage)) return
        if (!checkField(data , 'category', 'Select category' , setMessage)) return
        if (!checkField(data , 'items', 'Select at least one item' , setMessage)) return


        if (data?.items?.some(item => item?.value === 'all')){
            data.items = deepClone(itemsData)?.filter(listItem => listItem?.value !== 'all')
        }

        api.createPackage(data).then((res) => {
            setMessage({packageCreated: true , text: res?.data?.message})
            setTimeout(() => {
                getAllPackages();
                setFormData(initialFormData);
                setMessage({});
                setIsShowFieldsData(false)
            }, 1500)

        }).catch(e => {
            console.log(e)
        })

    };

    const getAllPackages = () => {
      api.getAllPackages().then(res => {
          setPackageData(res?.data?.data)
      })
    };

    const handleDeletePackage = (id) => {
        const newId = {id: id}
        api.deletePackage(newId).then(res => {
            getAllPackages();
        })
    }


    return (
        <React.Fragment>
            <div className="col-12">
                {
                    !!packageData?.length &&
                        <div className="row align-items-stretch">
                            {
                                packageData?.map((packageData , index , arr) => {
                                    const {_id: id} = packageData;
                                    return(
                                        <div className="col-6 mb-3" key={index}>
                                            <div className="p-3 border rounded-3 h-100">
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="mb-1 fw-medium">{packageData?.package_name}</h5>
                                                    </div>
                                                    <div className="col-auto">
                                                        <h6 className="mb-0">${packageData?.price}</h6>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col">
                                                            {
                                                                packageData?.items?.map((item , itemIndex , arr) => {
                                                                    const isLast = arr.length - 1 === itemIndex;
                                                                    return(
                                                                        <>
                                                                            <p className="mb-0 d-inline" key={itemIndex}>{item?.label}</p>
                                                                            {!isLast && ', '}
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className="col-auto">
                                                            <Trash onClick={() => handleDeletePackage(id)} className="text-danger pointer"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                !isShowFieldsData &&
                                <div className="col-6 mb-3">
                                    <div className="p-3 border rounded-3 add-package-card" onClick={() => setIsShowFieldsData(true)}>
                                        <AddCircle/>
                                        Add new package
                                    </div>
                                </div>
                            }
                        </div>
                }
                {
                    (!!isShowFieldsData || !packageData?.length) &&
                        <>
                            <h3 className={`mb-3 ${!packageData?.length ? '' : 'mt-3'}`}>Add Package</h3>
                            <div className="col-12 mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <InputFiled
                                            label={'Package name'}
                                            handleChange={handleChange}
                                            placeholder={'Enter package name'}
                                            name={'package_name'}
                                            value={formData?.package_name}
                                            message={message}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <InputFiled
                                            label={'Package price'}
                                            handleChange={handleChange}
                                            placeholder={'Enter package price'}
                                            name={'price'}
                                            value={formData?.price}
                                            message={message}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <SelectField
                                            // options={packageData?.length ? packageCategory?.filter(item  =>
                                            //     !packageData?.some(pkg => pkg?.category === item?.value)
                                            // ) : packageCategory}
                                            options={packageCategory}
                                            label={'Select category'}
                                            handleChange={handleChange}
                                            placeholder={'Select package category'}
                                            name={'category'}
                                            value={packageCategory?.filter(item => item?.value === formData?.category)}
                                            message={message}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <SelectField
                                            options={itemsData}
                                            label={'Package items'}
                                            handleChange={handleChange}
                                            placeholder={'Select items'}
                                            name={'items'}
                                            value={itemsData?.filter(item => formData?.items?.find(filterItem => filterItem?.value === item?.value))}
                                            isMulti={true}
                                            message={message}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end align-items-center">
                                <div className="col-auto">
                                    <MessageHandler message={message} name={'packageCreated'} type={'text-success'} />
                                </div>
                                {
                                    !!packageData?.length &&
                                    <div className="col-auto">
                                        <button className="btn btn-outline-secondary" onClick={() => setIsShowFieldsData(false)}>Cancel</button>
                                    </div>
                                }
                                <div className="col-auto">
                                    <button className="btn btn-primary" onClick={handlePackage}>Add package</button>
                                </div>
                            </div>
                        </>
                }
            </div>
        </React.Fragment>
    );
}

export default AddItemsSection;