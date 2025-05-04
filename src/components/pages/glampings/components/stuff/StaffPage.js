import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import StaffHouseItem from "./StaffHouseItem";
import {fetchHouseCode, fetchHouses} from "../../../../../redux/housesSlice";

const StaffPage = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const glampings = useSelector(state => state.glampings.glampingsApproved)
    const houses = useSelector(state => state.houses.houses)
    const [selectedGlamping, setSelectedGlamping] = useState(null)
    const [availableHouses, setAvailableHouses] = useState([]);
    let filteredHouses = selectedGlamping ? availableHouses.filter(house => Number(house.glampingId) === Number(selectedGlamping))
        : availableHouses;

    const handleGlampingChange = (event) => {
        setSelectedGlamping(event.target.value);
        filteredHouses = selectedGlamping ? availableHouses.filter(house => Number(house.glampingId) === Number(event.target.value))
            : availableHouses;
    };

    useEffect(() => {
        dispatch(fetchHouses(''))
        checkBookings();
    }, [dispatch, selectedGlamping]);

    const checkBookings = async () => {
        const housesWithBookings = [];

        for (const house of houses) {
            const response = await dispatch(fetchHouseCode([house.id, token]))
            const bookingCode = response.payload
            console.log(bookingCode)
            if (!isNaN(bookingCode)) {
                console.log({...house, code: bookingCode})
                housesWithBookings.push({...house, code: bookingCode});
            }
        }
        console.log(housesWithBookings)
        console.log(filteredHouses)
        setAvailableHouses(housesWithBookings);
    }

    return (
        <div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <label htmlFor="glamping" className="text-common">Глэмпинг:</label>
                <select
                    name="glamping"
                    id="glamping"
                    value={selectedGlamping}
                    onChange={handleGlampingChange}
                    style={{
                        borderRadius: "15px",
                        fontSize: "large",
                        padding: "5px",
                        width: "60%"
                    }}
                >
                    <option value="">Выберите глэмпинг</option>
                    {glampings.map(glamping => (
                        <option key={glamping.id} value={glamping.id}>
                            {glamping.address}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{marginTop: "30px"}}>
                {filteredHouses.length > 0 ? (
                            <>
                                {filteredHouses.map(house => (
                                    <StaffHouseItem
                                        key={house.id}
                                        house={house}
                                    />
                                ))}
                            </>
                        )
                        :
                    (
                    <div className="text-common">Бронирований на сегодня нет</div>
                    )
                }
            </div>
        </div>
    );
};

export default StaffPage;