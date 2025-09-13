import React from 'react';

function MessageHandler({message , type='', name}) {
    return (
        <React.Fragment>
            {
                message?.[name] &&
                <p className={`mb-0 ${type || 'text-danger'}`}>{message?.text}</p>
            }
        </React.Fragment>
    );
}

export default MessageHandler;