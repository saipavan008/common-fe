import React from 'react';
import DatePicker from "react-datepicker";
import {Calendar} from "iconsax-react";
import moment from "moment";

function CommonDatePicker({
                              date = null,
                              label='',
                              showAsterisk=false,
                              placeholder='MM/DD/YYYY',
                              name='',
                              handleChange
                    }) {
    return (
        <React.Fragment>
            <div className="datepicker-input-main-section">
                <label>{label}{showAsterisk && <span className="asterisk">*</span>}</label>
                <DatePicker
                    selected={date}
                    placeholderText={placeholder}
                    onChange={(newDate) => {
                        handleChange({
                            target: {
                                value: moment(newDate).toDate(),
                                name: name
                            }
                        })
                    }}
                    showTimeSelect={date < new Date()}
                    timeIntervals={30}
                    showIcon={true}
                    icon={<Calendar/>}
                />
            </div>
        </React.Fragment>
    );
}

export default CommonDatePicker;