import React from 'react';
import Header from "../../Header";
import Contact from "./components/Contact";
import "../../../styles/position.css"
import Offer from "./components/Offer";
import YMap from "./components/YMap";

const Contacts = () => {
    return (
        <div>
            <div className="overlay" style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Header/>
                <div className="mainPage">
                    <div className="row-container">
                        <div style={{flex: 1.2}}>
                            <Contact/>
                        </div>
                        <div style={{flex: 1}}>
                            <Offer/>
                        </div>
                    </div>
                    <YMap/>
                </div>
            </div>
        </div>
    );
};

export default Contacts;