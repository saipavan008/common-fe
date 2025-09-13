import React from 'react';
import Buttons from "@/component/common/Buttons";
import CommonTags from "@/component/common/CommonTags";
import {Add, Trash} from "iconsax-react";

function ProductsCard({
                          item = {},
                          isLoading = false,
                          handleClick = (item, type) => {},
                          itemClassName='col-6',
                          index=null
                      }) {

    const handleButtonClick = (item , type) => {
        const buttonEl = document.getElementById(item?._id)
        buttonEl.classList.remove('active')
        buttonEl.classList.add('active')

        setTimeout(() => {
            handleClick(item, type)
            buttonEl.classList.remove('active')
        }, 1500)
    }

    return (
        <React.Fragment>
            <div className={`mb-3 ${itemClassName}`} key={item?._id || index}>
                <div className="card p-3 h-100 position-relative">
                    <CommonTags
                        className={'mb-0 category-tag'}
                        tagType={'p'}
                        isLoading={isLoading}
                        content={item?.category}
                        skeletonWidth={75}
                    />
                    <div className="row">
                        <div className="col">
                            <CommonTags
                                className={'mb-0'}
                                tagType={'h5'}
                                isLoading={isLoading}
                                content={item.package_name}
                                skeletonClassName={'w-75'}
                            />
                        </div>
                        <div className="col-auto">
                            <CommonTags
                                className={'mb-0 fw-semibold'}
                                tagType={'h5'}
                                isLoading={isLoading}
                                content={item?.price} skeletonWidth={80}
                            />
                        </div>
                    </div>
                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col">
                                {
                                    item?.items?.map((typeItem, index, arr) => {
                                        const isLast = arr.length - 1 === index
                                        return (
                                            <React.Fragment key={index}>
                                                <CommonTags
                                                    className={'mb-0 d-inline-flex text-secondary'}
                                                    tagType={'p'}
                                                    isLoading={isLoading}
                                                    content={typeItem?.label}
                                                    skeletonWidth={50}
                                                />
                                                {!isLast && ", "}
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-auto">
                                {
                                    !!item?.is_added_to_cart ?
                                        <>
                                            <Buttons
                                                id={item?._id}
                                                isLoading={isLoading}
                                                type={'btn-blank'}
                                                size={'btn-sm'}
                                                iconOnly={true}
                                                // label={'Remove'}
                                                icon={<Trash className='text-danger'/>}
                                                className={'product-card-action-button right-left'}
                                                onClick={() => handleButtonClick(item, 'remove')}/>
                                        </>
                                        :
                                        <Buttons
                                            id={item?._id}
                                            isLoading={isLoading}
                                            size={'btn-sm'}
                                            // label={'Add'}
                                            iconOnly={true}
                                            icon={<Add/>}
                                            type={'btn-outline-primary'}
                                            className={'product-card-action-button left-right'}
                                            onClick={() =>handleButtonClick(item, 'add')}
                                        />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductsCard;