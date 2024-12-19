import React, {useEffect, useState} from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Cart from "../../additional/components/Cart";
import Services from "../../additional/components/Services";
import Goods from "../../additional/components/Goods";
import {useDispatch, useSelector} from "react-redux";
import {addBooking, changeFormData} from "../../../../redux/bookingsSlice";
import {addGuest} from "../../../../redux/guestsSlice";
import {isBefore, isSameDay} from 'date-fns';
import {fetchBookedDays} from "../../../../redux/housesSlice";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import {styled} from "@mui/material";
import {useNavigate} from "react-router-dom";

const CustomDateCalendar = styled(DateCalendar)(({ theme }) => ({
    background: 'white',
    borderRadius: "20px",
    '.Mui-selected': {
        border: '2px solid green',
        background: 'green',
        borderRadius: '50%',
    },
}));

const BookingForm = ({handleChange, house}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = useSelector(state => state.auth.login)
    const token = useSelector(state => state.auth.token)
    const ownerGuest = useSelector(state => state.auth.guest)
    const guests = useSelector(state => state.guests.guests)
    const houseId = useSelector(state => state.bookings.currentBooking.formData.houseId)
    const services = useSelector(state => state.service.cart || [])
    const shopItems = useSelector(state => state.shop.cart || [])
    const [page, setPage] = useState("услуги")
    const [addNewGuests, setAddNewGuests] = useState(false)
    const [selectedGuest, setSelectedGuest] = useState(null)
    const [guestForm, setGuestForm] = useState({})
    const [errors, setErrors] = useState('');
    const [disabledDates, setDisabledDates] = useState([])
    const [formData, setFormData] = useState(
        {
            login: login,
            houseId: houseId,
            guests: [ownerGuest],
            dateStart: null,
            dateEnd: null,
            shopItems: [],
            services: []
        }
    )

    useEffect(() => {
        const getBookedDays = async () => {
            const action = await dispatch(fetchBookedDays(houseId));
            if (fetchBookedDays.fulfilled.match(action)) {
                setDisabledDates(action.payload);
            }
        };

        getBookedDays();
    }, [dispatch, houseId]);

    const handleGoToServices = () => {
        dispatch(changeFormData(formData))
        setPage("услуги")
        console.log(formData)
    }

    const handleGoToHouse = () => {
        const updatedFormData = {
            ...formData,
            shopItems: shopItems,
            services: services
        };
        setFormData(updatedFormData)
        dispatch(changeFormData(updatedFormData))
        setPage("домик")
        console.log(updatedFormData)
    }

    const handleStartDateChange = (date) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            dateStart: date.toISOString().slice(0, 10)
        }));
    }
    const handleEndDateChange = (date) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            dateEnd: date.toISOString().slice(0, 10)
        }));
    }

    const shouldDisableDateStart = (date) => {
        const today = new Date();
        if (isBefore(date, today)) {
            return true;
        }
        return disabledDates.some(disabledDate => isSameDay(date, disabledDate));
    };

    const shouldDisableDateEnd = (date) => {
        const today = new Date();
        if (isBefore(date, today)) {
            return true;
        }
        if (isBefore(date, new Date(formData.dateStart))) {
            return true
        }
        return disabledDates.some(disabledDate => isSameDay(date, disabledDate));
    };

    const handleSelectChange = (e) => {
        const selectedGuestId = e.target.value;
        console.log("selectedGuestId" + selectedGuestId)
        const selectedGuest = guests.find(guest => guest.id === Number(selectedGuestId));

        if (selectedGuest) {
            if (!formData.guests.some(guest => guest.id === selectedGuest.id)) {
                setFormData(prevState => ({
                    ...prevState,
                    guests: [...prevState.guests, selectedGuest]
                }));
            }
        }
        setSelectedGuest('');
    };

    const handleAddNewGuest = async () => {
        const newErrors = validateGuestForm();
        setErrors(newErrors);
        console.log(guestForm)
        if (Object.keys(newErrors).length === 0) {
            const action = await dispatch(addGuest([JSON.stringify(guestForm), token]));
            if (addGuest.fulfilled.match(action)) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    guests: [...prevFormData.guests, action.payload]
                }));
                setAddNewGuests(false)
            } else {
                console.error(action.payload);
            }
        }
    }

    const validateGuestForm = () => {
        const newErrors = {};
        if (!guestForm.name) newErrors.name = 'Имя обязательно';
        if (!guestForm.surname) newErrors.surname = 'Фамилия обязательна';
        if (!guestForm.phone) newErrors.phone = 'Телефон обязателен';
        if (!guestForm.email) newErrors.email = 'Почта обязательна';
        return newErrors;
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setGuestForm(prev => ({...prev, [name]: value}));
        console.log(guestForm)
    };

    const handleSubmit = async () => {
        const transformedData = {
            login: formData.login,
            houseId: formData.houseId,
            guests: formData.guests.map(guest => guest.id),
            dateStart: formData.dateStart,
            dateEnd: formData.dateEnd,
            shopItems: formData.shopItems.map(item => item.id),
            services: formData.services.map(service => service.id)
        };

        dispatch(changeFormData(formData))
        const action = await dispatch(addBooking([JSON.stringify(transformedData), token]))
        if (addBooking.fulfilled.match(action)) {
            handleChange()
            navigate(`/account`);
        }

    }

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content" style={{width: "80%", height: "80%", overflowY: 'auto',}}>
                    <div className="button-container" style={{justifyContent: "start"}}>
                        <button className="basic-button" style={{padding: "8px 15px 8px 15px", borderRadius: "30px"}}
                                onClick={handleChange}>&times;</button>
                    </div>
                    <div className="creation-box">
                        <form onSubmit={handleSubmit} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            backgroundColor: '#1b4b26',
                            width: "100%",
                            height: "100%"
                        }}>
                            {page === "услуги" ?
                                <div>
                                    <h1 className="title-common" style={{marginTop: 0}}>Выберите услуги и товары</h1>
                                    <Cart args={["Добавленные услуги", "Добавленные товары"]}/>
                                    <div style={{margin: "0 20px 0 20px"}}>
                                        <h1 className="text-common">Добавить</h1>
                                        <div className="row-container" style={{alignItems: "flex-start"}}>
                                            <div style={{flex: 1}}>
                                                <Services style={"row-element"}/>
                                            </div>
                                            <div style={{flex: 1}}>
                                                <Goods style={"row-element"}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                                        <button className="basic-button" style={{padding: "10px", fontSize: "17px"}}
                                                onClick={handleGoToHouse}> далее
                                        </button>
                                    </div>
                                </div>
                                :
                                <div>
                                    <button onClick={handleGoToServices}> назад</button>
                                    <div className="row-container" style={{alignItems: "start"}}>
                                        <div style={{flex: 1, margin: "20px"}}>
                                            <h1 className="title-common">Гости</h1>
                                            {formData.guests.length > 0 ? (
                                                formData.guests.map(guest => (
                                                    <div className="frame-element row-container row-element"
                                                         style={{padding: 0, margin: "0 0 20px 0"}}
                                                         key={guest.id}>
                                                        <p className="text-small">{guest.name}</p>
                                                        <p className="text-small">{guest.surname}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-common">Нет добавленных гостей</p>
                                            )}
                                            <div className="row-container"
                                                 style={{display: "flex", justifyContent: "space-between"}}>
                                                <div style={addNewGuests ? {} : {flex: 1}}>
                                                    {addNewGuests ?
                                                        <div className="frame-element"
                                                             style={{display: "flex", flexDirection: "column"}}>
                                                            <div style={{marginTop: "20px"}}>
                                                                <label htmlFor="name"
                                                                       className="text-common">Имя</label>
                                                                <input
                                                                    type="text"
                                                                    id="name"
                                                                    name="name"
                                                                    value={guestForm.name}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        borderStyle: "none",
                                                                        height: "30px",
                                                                        width: "100%"
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors.name &&
                                                                <span className="error">{errors.name}</span>}
                                                            <div style={{marginTop: "20px"}}>
                                                                <label htmlFor="surname"
                                                                       className="text-common">Фамилия</label>
                                                                <input
                                                                    type="text"
                                                                    id="surname"
                                                                    name="surname"
                                                                    value={guestForm.surname}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        borderStyle: "none",
                                                                        height: "30px",
                                                                        width: "100%"
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors.surname &&
                                                                <span className="error">{errors.surname}</span>}
                                                            <div style={{marginTop: "20px"}}>
                                                                <label htmlFor="phone"
                                                                       className="text-common">Телефон</label>
                                                                <input
                                                                    type="tel"
                                                                    id="phone"
                                                                    name="phone"
                                                                    value={guestForm.phone}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        borderStyle: "none",
                                                                        height: "30px",
                                                                        width: "100%"
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors.phone &&
                                                                <span className="error">{errors.phone}</span>}
                                                            <div style={{marginTop: "20px"}}>
                                                                <label htmlFor="email"
                                                                       className="text-common">Почта</label>
                                                                <input
                                                                    type="email"
                                                                    id="email"
                                                                    name="email"
                                                                    value={guestForm.email}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        borderStyle: "none",
                                                                        height: "30px",
                                                                        width: "100%"
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors.email &&
                                                                <span className="error">{errors.email}</span>}
                                                            <button type="button" onClick={handleAddNewGuest}
                                                                    className="add-button"
                                                                    style={{
                                                                        padding: "10px",
                                                                        marginTop: "10px"
                                                                    }}>Добавить
                                                                гостя
                                                            </button>
                                                            <button
                                                                onClick={() => setAddNewGuests(!addNewGuests)}
                                                                className="add-button"
                                                                style={{padding: "10px", marginTop: "10px"}}>Закрыть
                                                            </button>
                                                        </div>
                                                        :
                                                        <button onClick={() => setAddNewGuests(!addNewGuests)}
                                                                className="basic-button"
                                                                style={{padding: "10px", fontSize: "large"}}>
                                                            Добавить нового
                                                        </button>
                                                    }
                                                </div>
                                                <div style={{flex: 1}}>
                                                    {
                                                        addNewGuests ? <></> :
                                                            <select
                                                                value={selectedGuest}
                                                                onChange={handleSelectChange}
                                                                style={{
                                                                    padding: "10px",
                                                                    fontSize: "medium",
                                                                }}
                                                                className="basic-button"
                                                            >
                                                                <option value="" style={{fontSize: "medium"}}>
                                                                    Выбрать существующего
                                                                </option>
                                                                {guests
                                                                    .filter(guest => !formData.guests.some(selected => selected.id === guest.id))
                                                                    .map((guest) => (
                                                                        <option key={guest.id} value={guest.id}>
                                                                            {guest.name} {guest.surname}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                        <div style={{
                                            flex: 1,
                                            margin: "10px",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-evenly"
                                        }}>
                                            <div>
                                            <h1 className="title-common">Услуги</h1>
                                                {formData.services.map((service) => (
                                                    <p className="text-small" key={service.id}>{service.name}</p>
                                                ))}
                                            </div>
                                            <div>
                                                <h1 className="title-common">Товары</h1>
                                                {formData.shopItems.map((item) => (
                                                    <p className="text-small" key={item.id}>{item.name}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-container" style={{alignItems: "start"}}>
                                        <div style={{flex: 1, margin: "10px"}}>
                                            <h1 className="title-common" style={{textAlign: "center"}}>Дата заезда</h1>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <CustomDateCalendar
                                                    shouldDisableDate={shouldDisableDateStart}
                                                    value={formData.dateStart}
                                                    onChange={handleStartDateChange}
                                                />
                                            </LocalizationProvider>

                                        </div>
                                        <div style={{flex: 1, margin: "10px"}}>
                                            <h1 className="title-common" style={{textAlign: "center"}}>Дата выезда</h1>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <CustomDateCalendar
                                                    shouldDisableDate={shouldDisableDateEnd}
                                                    value={formData.dateEnd}
                                                    onChange={handleEndDateChange}
                                                />
                                            </LocalizationProvider>

                                        </div>
                                    </div>
                                    <button type="button" onClick={handleSubmit}>Забронировать</button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;