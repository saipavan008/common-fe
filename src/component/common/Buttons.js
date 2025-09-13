import React from 'react';
import Skeleton from "react-loading-skeleton";

function Buttons({
                     label='',
                     type='btn-primary',
                     size='btn-md',
                     onClick = () => {},
                     disabled=false,
                     isLoading=false,
                     skeletonWidth=100,
                     skeletonHeight=28,
                     icon,
                     iconOnly=false,
                     className='',
                     id=null
                 }) {
    return (
        <React.Fragment>
            {
                isLoading ?
                    <Skeleton className="" width={skeletonWidth} height={skeletonHeight}/>
                    :
                    <button
                        className={`btn ${type} ${size} ${className}`}
                        onClick={onClick}
                        disabled={disabled}
                        id={id}
                    >
                        {iconOnly ? icon : label}
                    </button>
            }
        </React.Fragment>
    );
}

export default Buttons;