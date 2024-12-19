import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchGuests} from "../../../../redux/guestsSlice";

const Guests = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const guests = useSelector(state => state.guests.guests)
    // const guests = [
    //     {
    //         id: 1,
    //         name: "name",
    //         surname: "surname",
    //         phone: "phone",
    //         email: "email"
    //     },
    //     {
    //         id: 2,
    //         name: "name",
    //         surname: "surname",
    //         phone: "phone",
    //         email: "email"
    //     }
    // ]

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                dispatch(fetchGuests(token)),
            ]);
        };
        loadData();
        const interval = setInterval(() => {
            loadData();
        }, 5000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <div style={{margin: 0}}>
            {guests.length > 0 ? (
                guests.map(person => (
                    <div className="frame-element" key={person.id} style={{marginTop: 0}}>
                        <h1 className="title-common"  style={{lineHeight: 1, margin: "0px"}}>Гость {person.id}</h1>
                        <div className="row-container" style={{justifyContent: "space-around"}}>
                            <div>
                                <p className="text-common" style={{lineHeight: 1}}>Имя: {person.name}</p>
                                <p className="text-common" style={{lineHeight: 1}}>Фамилия: {person.surname}</p>
                            </div>
                            <div>
                                <p className="text-common" style={{lineHeight: 1}}>Телефон: {person.phone}</p>
                                <p className="text-common" style={{lineHeight: 1}}>Почта: {person.email}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-common">Нет добавленных гостей</p>
            )}
        </div>
    );
};

export default Guests;