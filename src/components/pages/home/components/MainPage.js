import React from 'react';
import Carousel from "./Carousel";
import "../../../../styles/mainPage.css"
import "../../../../styles/buttons.css"
import priv from "../../../../images/watermark.jpg"
import comf from "../../../../images/o-frame.jpg"
import {Link} from "react-router-dom";

const MainPage = () => {
    const privacy = [
        "Личная территория у каждого коттеджа",
        "Персональная баня-бочка на вашем участке доступна в любой момент отдыха",
        "Коттеджи расположены в живописных локациях: в лесу или у озера"
    ]

    const comfort = [
        "Теплые полы",
        "Wi-Fi, Smart TV, VR-шлем в каждом домике",
        "Освещенная терраса с удобными креслами",
        "Самостоятельное заселение и выселение  без участия персонала",
        "Бытовая техника: от микроволновки до стиральной машины",
        "Приятные мелочи: бумажные полотенца, стиральный порошок, банные наборы, настольные игры"
    ]
    return (
        <div className="mainPage" style={{alignContent: "center"}}>
            <Carousel/>
            <div className="flex-row">
                <div>
                    <h1>
                        Уединение
                    </h1>
                    <ul>
                        {privacy.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <img src={priv} alt="priv"/>
                    {/*<img src={image} alt="img1"/>*/}
                </div>
            </div>
            <div className="flex-row">
                <div>
                    <img src={comf} alt="comf"/>
                    {/*<img src={image} alt="img1"/>*/}
                </div>
                <div>
                    <h1>
                        Комфорт и технологичность
                    </h1>
                    <ul>
                        {comfort.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="align-center-container">
                <Link to="/glampings" style={{ textDecoration: 'none' }}>
                    <button className="basic-button">Забронировать</button>
                </Link>
            </div>
        </div>
    );
};

export default MainPage;