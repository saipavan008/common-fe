import React from 'react';
import {CustomToggle} from "@/component/helpers";
import {Dropdown} from "react-bootstrap";

function CommonDropdown({
                            toggleButton,
                            dropdownItems=[]
                        }) {
    return (
        <React.Fragment>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {toggleButton}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        dropdownItems?.map((item , index, arr) => {
                            return(
                                <Dropdown.Item key={index} onClick={item?.onClick}>
                                    {item?.label}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    );
}

export default CommonDropdown;