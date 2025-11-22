import React, {useState} from 'react';
import {CustomToggle} from "@/component/helpers";
import {Dropdown} from "react-bootstrap";

function CommonDropdown({
                            toggleButton,
                            dropdownItems=[]
                        }) {

    const [show, setShow] = useState(false);
    const handleToggle = (isOpen) => setShow(isOpen);

    const handleItemClick = (e, onClick) => {
        onClick?.(e);
        setShow(false);
    };

    return (
        <React.Fragment>
            <Dropdown show={show} onToggle={handleToggle}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {toggleButton}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        dropdownItems?.map((item , index, arr) => {
                            return(
                                <Dropdown.Item key={index} onClick={(e) => handleItemClick(e, item?.onClick)}>
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