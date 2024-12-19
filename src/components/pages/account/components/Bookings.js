import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBookings} from "../../../../redux/bookingsSlice";
import BookingItem from "./BookingItem";

const Bookings = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const bookings = useSelector(state => state.bookings.bookings)

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                dispatch(fetchBookings(token)),
            ]);
        };
        loadData();
        const interval = setInterval(() => {
            loadData();
        }, 5000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <div>
            {bookings.length > 0 ? (
                bookings.map(booking => (
                    <div className="frame-element" style={{marginTop: 0}} key={booking.id}>
                        <BookingItem booking={booking} />
                    </div>
                ))
            ) : (
                <p className="text-common">Нет добавленных бронирований</p>
            )}
        </div>
    );
};

export default Bookings;