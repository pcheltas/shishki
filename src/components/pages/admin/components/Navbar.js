import React from 'react';

const Navbar = ({changeSelected, selected}) => {
    return (
        <div>
            <div className="frame-element" style={{padding: "10px", textAlign: "center"}}>
                <h1 className={`text-common pointer ${selected === "roles" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("roles")}>
                    Выдача ролей
                </h1>
                <h1 className={`text-common pointer ${selected === "glampings" ? "active" : ""}`}
                    style={{padding: "0 30px 0 30px"}}
                    onClick={() => changeSelected("glampings")}>
                    Аппрув глэмпингов
                </h1>
            </div>
        </div>
    );
};

export default Navbar;