import React from 'react';
import Select from "react-select";
import MessageHandler from "@/component/common/MessageHandler";

function SelectField({
                         formGroupClassName='',
                         label = '' ,
                         placeholder = '',
                         name= '',
                         value= '',
                         className='' ,
                         handleChange = (e) => e,
                         isMulti=false,
                         options=[],
                         message={},
                         showAsterisk = false
                     }) {
    return (
        <React.Fragment>
            <div className={`form-group mb-3 ${formGroupClassName ? formGroupClassName : ''}`}>
                <label>{label}{showAsterisk && <span className="asterisk">*</span>}</label>
                <Select
                    options={options}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => {
                        if(!e) {
                            handleChange({
                                target: {
                                    name,
                                    value: isMulti ? [] : null
                                }
                            });
                            return;
                        }
                        handleChange({
                            target: {
                                name,
                                value: isMulti ? e : e.value
                            }
                        })
                    }}
                    className={`${className ? className : ''}`}
                    isMulti={isMulti}
                />
                <MessageHandler type={message?.type} name={name} message={message}/>
            </div>
        </React.Fragment>
    );
}

export default SelectField;