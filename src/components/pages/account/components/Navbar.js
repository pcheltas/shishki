import React from 'react';

const Navbar = ({changeSelected, selected}) => {
    return (
        <div>
            <div className="frame-element" style={{padding: "10px", textAlign: "center"}}>
                <h1 className={`text-common pointer ${selected === "data" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("data")}>
                    Кабинет
                </h1>
                <h1 className={`text-common pointer ${selected === "bookings" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("bookings")}>
                    Бронирования
                </h1>
                <h1 className={`text-common pointer ${selected === "guests" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("guests")}>
                    Гости
                </h1>
            </div>
        </div>
    )
        ;
};

export default Navbar;