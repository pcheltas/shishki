import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../../Header";
import {useDispatch, useSelector} from "react-redux";
import {fetchHouses} from "../../../redux/housesSlice";
import BookingHouseItem from "./components/BookingHouseItem";
import {fetchGlampings} from "../../../redux/glampingsSlice";
import {fetchHouseTypes} from "../../../redux/houseTypeSlice";

const GlampingHouses = () => {
    const dispatch = useDispatch();
    const houses = useSelector(state => state.houses.houses)
    const {id} = useParams();
    const glamping = useSelector(state => state.glampings.approvedGlampings.find(glamping => glamping.id === id))
    const [path, setPath] = useState(`?glamping=${id}&status=0`)

    useEffect(() => {
        dispatch(fetchHouses(path))
        dispatch(fetchHouseTypes())
        dispatch(fetchGlampings())
    }, []);


    return (
        <div>
            <div className="overlay" style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Header/>
                <div className="mainPage">
                    {/*<h1 className="title-common">{glamping.address}</h1>*/}
                    <div>
                        {houses.length > 0 ? (
                            houses.map(house => (
                                <div key={house.id}>
                                    <BookingHouseItem house={house} path={path}/>
                                </div>
                            ))
                        ) : (
                            <p className="text-common">Нет доступных домиков</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlampingHouses;