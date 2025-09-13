import React from 'react';
import MessageHandler from "@/component/common/MessageHandler";

function InputFiled({
                        type='text',
                        formGroupClassName='',
                        label = '' ,
                        placeholder = '',
                        name= '',
                        value= '',
                        fieldClassName='' ,
                        handleChange = (e) => e,
                        message={}
                    }) {
    return (
        <React.Fragment>
            <div className={`form-group mb-3 ${formGroupClassName ? formGroupClassName : ''}`}>
                <label>{label}</label>
                <input
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    className={`form-control ${fieldClassName ? fieldClassName : ''}`}
                />
                <MessageHandler name={name} type={message?.type} message={message}/>
            </div>
        </React.Fragment>
    );
}

export default InputFiled;