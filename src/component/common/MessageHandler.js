import React from 'react';

function MessageHandler({message , type='', name, textCenter=false, className=''}) {
    return (
        <React.Fragment>
            {
                message?.[name] &&
                <p className={`mb-0 ${message?.type ? message?.type : type || 'text-danger'} ${textCenter ? 'text-center' : ''} ${className}`}>{message?.text}</p>
            }
        </React.Fragment>
    );
}

export default MessageHandler;