import React from 'react';
import Header from "../../Header";
import "../../../styles/font.css"
import {Link} from "react-router-dom";

const Faq = () => {
    const questions = [
        "Можно ли к вам с животными?",
        "У вас есть трансфер?"
    ]
    const answers = [
        "Мы сами очень любим животных, поэтому ваши питомцы могут отдыхать с вами без каких-либо дополнительных заявок " +
        "и совершенно бесплатно",
        "Конечно! Чтобы заказать трансфер до глэмпинга, укажите это в дополнительных услугах при бронировании домика. " +
        "Вам будет отправлен номер и имя водителя, чтоыбы вы договорились о дате и времени поездки"
    ]

    return (
        <div>
            <div className="overlay" style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Header/>
                <div className="mainPage">
                    <h1>Ваши часто задаваемые вопросы</h1>
                    {questions.map((question, index) => (
                        <div className="faq-mass frame-element" key={index}>
                            <h2 className="title-common">{question}</h2>
                            <p className="text-common">{answers[index]}</p>
                        </div>
                    ))}
                    <div>
                        <p className="text-common">
                            Остались вопросы? <Link to="/contacts" style={{textDecoration: "underline", }}
                                                    className="text-common">Свяжитесь с нами!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;