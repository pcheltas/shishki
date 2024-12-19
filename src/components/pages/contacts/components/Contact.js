import React from 'react';
import "../../../../styles/position.css"
import qr from "../../../../images/whatsApp.jpg"

const Contact = () => {
    return (
        <div className="frame-element row-container" style={{justifyContent: "space-around"}}>
            <div style={{margin: "0 20px 0 20px"}}>
                <h1 className="title-common">Почта</h1>
                <p className="text-common">shishki_rent@gmail.com</p>
                <h1 className="title-common">Телефон</h1>
                <p className="text-common">+7-965-246-36-54</p>
                <h1 className="title-common">Telegram</h1>
                <p className="text-common" style={{textDecoration: "underline"}}>t.me/shishki_rent</p>

            </div>
            <div style={{margin: "0 20px 0 20px"}}>
                <h1 className="title-common">WhatsApp</h1>
                <img src={qr} alt="qr" style={{height: "250px"}}/>
            </div>
        </div>
    );
};

export default Contact;


// display: flex;
// flex-direction: row;
// align-items: center;
// flex-wrap: wrap;
// justify-content: center;