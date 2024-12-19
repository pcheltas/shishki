import React from 'react';

const Navbar = ({changeSelected, selected}) => {
    return (
        <div>
            <div className="frame-element" style={{padding: "10px", textAlign: "center"}}>
                <h1 className={`text-common pointer ${selected === "services" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("services")}>
                    Услуги
                </h1>
                <h1 className={`text-common pointer ${selected === "shop" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("shop")}>
                    Магазин
                </h1>
            </div>
            <div className="frame-element" style={{padding: "10px", textAlign: "center"}}>
                <h1 className={`text-common pointer ${selected === "cart" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("cart")}>
                    Корзина
                </h1>
            </div>
        </div>
    )
        ;
};

export default Navbar;