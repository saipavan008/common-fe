import React from 'react';
import Skeleton from "react-loading-skeleton";

function CommonTags({
                        tagType = 'h1',
                        className = '',
                        content = null,
                        isLoading = false,
                        onClick = () => {
                        },
                        skeletonWidth = null,
                        skeletonClassName = '',
                        skeletonHeight = null
                    }) {
    const Tag = tagType;
    return (
        <React.Fragment>
            <Tag
                className={className}
                onClick={onClick}
            >
                {
                    isLoading ?
                        <Skeleton
                            width={skeletonWidth}
                            height={skeletonHeight}
                            className={`${skeletonClassName}`}
                        />
                        :
                        content
                }
            </Tag>
        </React.Fragment>
    );
}

export default CommonTags;