import React from 'react';

const StaffNavbar = ({selected, changeSelected}) => {
    return (
        <div>
            <div className="frame-element" style={{padding: "10px", textAlign: "center"}}>
                <h1 className={`text-common pointer ${selected === "booking" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("booking")}>
                    Забронировать
                </h1>
                <h1 className={`text-common pointer ${selected === "service" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("service")}>
                    Обслуживание
                </h1>
            </div>
        </div>
    )
};

export default StaffNavbar;