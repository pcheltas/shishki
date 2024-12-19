import React, {useEffect, useState} from 'react';
import {API_URL} from "../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {changeFormData, fillBookingForm} from "../../../../redux/bookingsSlice";
import BookingForm from "./BookingForm";

const BookingHouseItem = ({house, path}) => {
    const dispatch = useDispatch();
    const {filling, formData} = useSelector(state => state.bookings.currentBooking)
    const imageUrl = API_URL + "/photo/" + house.photoName
    const houseTypes = useSelector(state => state.houseTypes.houseTypes)
    const [img, setImg] = useState();
    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    const handleChange = () => {
        if (filling) {
            dispatch(changeFormData({}))
        }else{
            dispatch(changeFormData({houseId: house.id}))
        }
        dispatch(fillBookingForm(!filling))
    }

    useEffect(() => {
        fetchImage()
    }, []);

    return (
        <div className="frame-element row-container" style={{alignItems: null}}>
            <div style={{flex: 1}}>
                {
                    img ?
                        <img src={img} alt={house.photoName} style={{width: "450px", borderRadius: "20px"}}/>
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
                    <h1 className="title-common">Домик № {house.id}</h1>
                    <p className="text-small">Тип: {house.houseType}</p>
                    <p className="text-small">Количество
                        гостей: {houseTypes?.find(type => type.type === house.houseType)?.numberOfPersons}</p>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <button className="add-button" style={{width: "200px", fontSize: "20px"}} onClick={handleChange}>
                        Забронировать
                    </button>
                </div>
                {filling ? <BookingForm handleChange={handleChange} house={house}/> : <></> }
            </div>
        </div>
    );
};

export default BookingHouseItem;