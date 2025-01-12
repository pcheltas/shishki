import React, {useEffect, useState} from 'react';

import {useNavigate} from "react-router-dom";
import {API_URL} from "../../../../../redux/store";

const MyGlampingItem = ({glamping}) => {
    const imageUrl = API_URL + "/photo/" + glamping.photoName
    const [img, setImg] = useState();
    const statusNameMapping = {
        "APPROVED": "Подтвержден",
        "WAITING_FOR_CONFIRMATION": "Ожидает проверки",
        "REJECTED": "Отклонено"
    }

    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };
    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <div className="frame-element row-container" style={{alignItems: null}}>
            <div style={{flex: 1}}>
                {
                    img ?
                        <img src={img} alt={glamping.photoName} style={{width: "500px", borderRadius: "20px"}}/>
                        :
                        <div></div>
                }

            </div>
            <div style={{
                flex: 2,
                display: "flex",
                justifyContent: "space-between",
                alignSelf: "normal",
                flexDirection: "column",
                marginLeft: "50px"
            }}>
                <div>
                    <h1 className="title-common">{glamping.address}</h1>
                    <p className="text-small">{glamping.description}</p>
                    <p className="text-common" style={{marginBottom: "5px",}}>Статус: </p>
                    <p className="text-small" style={{marginBottom: "5px", marginTop: "5px"}}>{statusNameMapping[glamping.status]}</p>

                </div>
            </div>
        </div>
    );
};

export default MyGlampingItem;