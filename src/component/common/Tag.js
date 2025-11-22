import React from 'react';

function Tag({
                 tag='',
                 className='',
                 type='online',
                 size='md'
             }) {
    return (
        <React.Fragment>
            <div className={`tag ${className} ${type} ${size}`}>
                {tag}
            </div>
        </React.Fragment>
    );
}

export default Tag;