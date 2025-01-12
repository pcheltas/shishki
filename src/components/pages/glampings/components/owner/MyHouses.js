import React, {useEffect, useState} from 'react';
import MyGlampingItem from "./MyGlampingItem";
import GlampingForm from "./GlampingForm";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllGlampings} from "../../../../../redux/glampingsSlice";
import MyHouseItem from "./MyHouseItem";
import {fetchHouses, fetchHouseStatuses} from "../../../../../redux/housesSlice";
import HouseForm from "./HouseForm";
import {fetchHouseTypes} from "../../../../../redux/houseTypeSlice";

const MyHouses = () => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.auth.login)

    const allGlampings = useSelector(state => state.glampings.allGlampings)
    const myGlampings = allGlampings.filter(glamping => glamping.ownerLogin === login);
    const myGlampingIds = myGlampings.map(glamping => glamping.id); // Предполагая, что у glamping есть поле `id`

    const allHouses = useSelector(state => state.houses.houses)
    const myHouses = allHouses.filter(house => myGlampingIds.includes(house.glampingId));
    const [filling, setFilling] = useState(false)
    const [path, setPath] = useState('')

    const handleChange = () => {
        setFilling(!filling)
    }

    useEffect(() => {
        dispatch(fetchHouses(path))
        dispatch(fetchHouseTypes())
        dispatch(fetchHouseStatuses())
    }, [filling, path]);

    return (
        <div>

            <div className="row-container">
                <div style={{flex: 4}}>
                    {myHouses.length > 0 ? (
                        myHouses.map(house => (
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
                {filling ? <HouseForm handleChange={handleChange}/> : <></> }
            </div>
        </div>
    );
};

export default MyHouses;