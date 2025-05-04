import React, {useEffect, useState} from 'react';
import {API_URL} from "../../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchBookingsByGlamping} from "../../../../../redux/glampingsSlice";

const MyGlampingItem = ({glamping}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const imageUrl = API_URL + "/photo/" + glamping.photoName
    const [img, setImg] = useState();
    const [openStatistics, setOpenStatistics] = useState(false)
    const [statistics, setStatistics] = useState(null)
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

        async function fetchData() {
            const response = await dispatch(fetchBookingsByGlamping([glamping.id, token]));
            const bookings = response.payload
            console.log(bookings)
            const statistics = {}
            statistics.bookingsCount = bookings.length
            statistics.sumBooking = bookings.reduce((acc, booking) => {
                const {dateStart, dateEnd, house} = booking;
                const start = new Date(dateStart);
                const end = new Date(dateEnd);
                const daysCount = (end - start) / (1000 * 3600 * 24);
                return acc + (daysCount * house.cost);
            }, 0);
            statistics.sumGoogs = bookings.reduce((acc, booking) => {
                const itemsTotal = booking.shopItems.reduce((itemAcc, item) => {
                    return itemAcc + (item.price || 0);
                }, 0);
                return acc + itemsTotal;
            }, 0);
            statistics.sumServices = bookings.reduce((acc, booking) => {
                const servicesTotal = booking.services.reduce((serviceAcc, service) => {
                    return serviceAcc + (service.cost || 0);
                }, 0);
                return acc + servicesTotal;
            }, 0);
            setStatistics(statistics)
            return statistics
        }

        setStatistics(fetchData());
    }, []);

    return (
        <div className="frame-element">
            <div className="row-container" style={{alignItems: null}}>
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
                        <p className="text-small"
                           style={{marginBottom: "5px", marginTop: "5px"}}>{statusNameMapping[glamping.status]}</p>
                    </div>
                </div>
            </div>
            {openStatistics ?
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p className="text-small">Количество бронирований: {statistics.bookingsCount}</p>
                    <p className="text-small">Бронирований на сумму: {statistics.sumBooking} p.</p>
                    <p className="text-small">Покупок на сумму: {statistics.sumGoogs} p.</p>
                    <p className="text-small">Услуг на сумму: {statistics.sumServices} p.</p>
                    <button type="button" className="add-button" onClick={() => setOpenStatistics(!openStatistics)}>Закрыть</button>
                </div>
                :
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "20px"}}>
                    <button type="button" className="add-button" onClick={() => setOpenStatistics(!openStatistics)}>Статистика</button>
                </div>
            }
        </div>
    );
};

export default MyGlampingItem;