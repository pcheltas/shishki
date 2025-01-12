import React, {useEffect, useState} from 'react';
import {API_URL} from "../../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {editHouse} from "../../../../../redux/housesSlice";

const MyHouseItem = ({house}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const imageUrl = API_URL + "/photo/" + house.photoName
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    const changeHouseStatus = () => {
        const newHouse = {
            ...house,  // Создаем новый объект, копируя свойства из house
            houseStatus: house.houseStatus === "ALLOWED" ? "FORBIDDEN" : "ALLOWED" // Меняем только houseStatus
        };
        dispatch(editHouse([house.id, JSON.stringify(newHouse), token]))
    }

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <div className="frame-element" style={{alignItems: null}}>
            <div style={{display: "flex", flexDirection: "row"}}>
                <div style={{flex: 1}}>
                    {
                        img ?
                            <img src={img} alt={house.photoName} style={{width: "500px", borderRadius: "20px"}}/>
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
                        <p className="title-common">Домик № {house.id}</p>
                        <p className="text-small">Тип: {house.houseType}</p>
                        <p className="text-small">Статус: {house.houseStatus}</p>
                        <p className="text-small">Стоимость за ночь: {house.cost}</p>
                        <button className="add-button"
                                onClick={changeHouseStatus}> {house.houseStatus === "ALLOWED" ? "Запретить бронирование" : "Разрешить бронирование"}</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyHouseItem;