import React from 'react';

const Navbar = ({changeSelected, selected}) => {
    return (
        <div>
            <div className="frame-element" style={{padding: "10px", textAlign: "center"}}>
                <h1 className={`text-common pointer ${selected === "booking" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("booking")}>
                    Забронировать
                </h1>
                <h1 className={`text-common pointer ${selected === "glampings" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("glampings")}>
                    Мои глэмпинги
                </h1>
                <h1 className={`text-common pointer ${selected === "houses" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("houses")}>
                    Мои домики
                </h1>
            </div>
        </div>
    );
};

export default Navbar;