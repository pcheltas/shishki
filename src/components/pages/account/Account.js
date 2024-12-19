import React, {useState} from 'react';
import Header from "../../Header";
import Navbar from "./components/Navbar";
import Data from "./components/Data";
import Bookings from "./components/Bookings";
import Guests from "./components/Guests";


const Account = () => {
    const [selected, setSelected] = useState("data");

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
                        {selected === "data" && <Data/>}
                        {selected === "bookings" && <Bookings/>}
                        {selected === "guests" && <Guests/>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Account;