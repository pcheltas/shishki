import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MyHouseItem from "./MyHouseItem";
import {fetchHouses, fetchHouseStatuses} from "../../../../../redux/housesSlice";
import HouseForm from "./HouseForm";
import {fetchHouseTypes} from "../../../../../redux/houseTypeSlice";

const MyHouses = () => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.auth.login)

    const allGlampings = useSelector(state => state.glampings.allGlampings)
    const myGlampings = allGlampings.filter(glamping => glamping.ownerLogin === login);
    const myGlampingIds = myGlampings.map(glamping => glamping.id);
    const [selectedGlamping, setSelectedGlamping] = useState("")

    const allHouses = useSelector(state => state.houses.houses)
    const myHouses = allHouses.filter(house => myGlampingIds.includes(house.glampingId));
    let filteredHouses = selectedGlamping ? myHouses.filter(house => Number(house.glampingId) === Number(selectedGlamping))
        : myHouses;
    const [filling, setFilling] = useState(false)

    const handleChange = () => {
        setFilling(!filling)
    }

    const handleGlampingChange = (event) => {
        setSelectedGlamping(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchHouses(''))
        dispatch(fetchHouseTypes())
        dispatch(fetchHouseStatuses())
    }, [filling]);

    return (
        <div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <label htmlFor="houseStatus" className="text-common">Глэмпинг:</label>
                <select
                    name="houseStatus"
                    id="houseStatus"
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
                    {myGlampings.map(glamping => (
                        <option key={glamping.id} value={glamping.id}>
                            {glamping.address}
                        </option>
                    ))}
                </select>
            </div>
            <div className="row-container">
                <div style={{flex: 4}}>
                    {filteredHouses.length > 0 ? (
                        filteredHouses.map(house => (
                            <div key={house.id}>
                                <MyHouseItem house={house}/>
                            </div>
                        ))
                    ) : (
                        <p className="text-common">У вас еще нет домиков</p>
                    )}
                </div>
                <div style={{flex: 1, alignSelf: "flex-start", marginTop: "10px"}}>
                    <button type="button" className="basic-button" onClick={handleChange}>Добавить домик</button>
                </div>
                {filling ? <HouseForm handleChange={handleChange}/> : <></>}
            </div>
        </div>
    );
};

export default MyHouses;