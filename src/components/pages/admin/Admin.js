import React, {useState} from 'react';
import Header from "../../Header";
import Navbar from "./components/Navbar";
import Roles from "./components/Roles";
import GlampingsApprove from "./components/GlampingsApprove";

const Admin = () => {
    const [selected, setSelected] = useState("roles");

    const changeSelected = (newSelection) => {
        setSelected(newSelection);
    };

    return (
        <div className="overlay" style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Header/>
            <div className="mainPage">
                <div className="row-container" style={{alignItems: "flex-start"}}>
                    <div>
                        <Navbar changeSelected={changeSelected} selected={selected}/>
                    </div>
                    <div style={{margin: "30px", width: "100%"}}>
                        {selected === "roles" && <Roles/>}
                        {selected === "glampings" && <GlampingsApprove/>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Admin;