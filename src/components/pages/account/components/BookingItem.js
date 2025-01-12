import React, {useState} from 'react';
import Description from "../../../Description";
import {useDispatch, useSelector} from "react-redux";
import {deleteBooking, fetchBookings} from "../../../../redux/bookingsSlice";

const BookingItem = ({booking}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const [isHovered, setIsHovered] = useState(false);
    const [descriptionPosition, setDescriptionPosition] = useState({x: 0, y: 0});
    const currentDate = new Date();
    const givenDate = new Date(booking.dateStart);
    const isCurrentDateGreater = currentDate > givenDate;
    const role = useSelector(state => state.auth.role)

    const handleMouseEnter = (e) => {
        setDescriptionPosition({x: e.pageX, y: e.pageY});
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCancel = async () => {
        await dispatch(deleteBooking([booking.id, token]))
        await dispatch(fetchBookings(token))
    }

    return (
        <div>
            <h1 className="title-common" style={{lineHeight: 1, margin: "0px"}}>Бронирование {booking.id}</h1>
            <div className="row-container" style={{justifyContent: "space-around", alignItems: "start"}}>
                <div>
                    <div style={{display: "flex"}}>
                        <p className="text-common" style={{lineHeight: 1}}>Домик: </p>
                        <p className="text-small" style={{ marginLeft: "1em" }}> № {booking.house.id}</p>
                    </div>
                    <div style={{display: "flex"}}>
                        <p className="text-common" style={{lineHeight: 1}}>Тип: </p>
                        <p className="text-small" style={{ marginLeft: "1em" }}> {booking.house.houseType}</p>
                    </div>
                    <p className="text-common" style={{lineHeight: 1}}>Гости:</p>
                    {booking.guests.length > 0 ? (
                        booking.guests
                            .slice()
                            .sort((a, b) => a.id - b.id)
                            .map(guest => (
                            <div className="text-small" key={guest.id}>
                                {guest.name} {guest.surname}
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    <div style={{display: "flex"}}>
                        <p className="text-common" style={{lineHeight: 1}}>Въезд: </p>
                        <p className="text-small" style={{marginLeft: "1em"}}> {booking.dateStart}</p>
                    </div>
                    <div style={{display: "flex"}}>
                        <p className="text-common" style={{lineHeight: 1}}>Выезд: </p>
                        <p className="text-small" style={{marginLeft: "1em"}}> {booking.dateEnd}</p>
                    </div>
                    <div style={{display: "flex"}}>
                        <p className="text-common" style={{lineHeight: 1}}>Стоимость: </p>
                        <p className="text-small" style={{marginLeft: "1em"}}> {booking.house.cost} / сут.</p>
                    </div>
                    <div style={{display: "flex"}}>
                        <p className="text-common"
                           style={{lineHeight: 1}}
                           onMouseEnter={handleMouseEnter}
                           onMouseLeave={handleMouseLeave}
                        >
                            Код доступа:
                        </p>
                        <p className="text-small" style={{marginLeft: "1em"}}> {booking.uniqueKey}</p>
                    </div>
                    {isHovered && <Description text="Код доступа будет активен только на время вашего бронирования"
                                               position={descriptionPosition}/>}
                </div>
                <div>
                    <p className="text-common" style={{lineHeight: 1}}>Услуги</p>
                    {booking.services.length > 0 ? (
                        booking.services
                            .slice()
                            .sort((a, b) => a.id - b.id)
                            .map(service => (
                            <div className="text-small" key={service.id}>
                                {service.name}
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <div>
                    <p className="text-common" style={{lineHeight: 1}}>Покупки</p>
                    {booking.shopItems.length > 0 ? (
                        booking.shopItems
                            .slice()
                            .sort((a, b) => a.id - b.id)
                            .map(item => (
                            <div className="text-small" key={item.id}>
                                {item.name}
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {(isCurrentDateGreater && role === "ADMIN") ?
                <div></div>
                : <div>
                    <button onClick={handleCancel} className="add-button">Отменить бронирование</button>
                </div>}
        </div>
    );
};


export default BookingItem;