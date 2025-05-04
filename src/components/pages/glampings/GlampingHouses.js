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
    const houseTypes = useSelector(state => state.houseTypes.houseTypes)
    const {id} = useParams();
    const glamping = useSelector(state => state.glampings.glampingsApproved.find(glamping => glamping.id === id))
    const [path, setPath] = useState(`?glamping=${id}&status=0`)
    const [selectedFilter, setSelectedFilter] = useState(
        {
            type: '',
            cost: ''
        }
    )

    const handleFilterClean = async () => {
        setSelectedFilter(
            {
                type: '',
                cost: ''
            }
        );
        setPath(`?glamping=${id}&status=0`);
        dispatch(fetchHouses(`?glamping=${id}&status=0`))
    };

    const handleFilterChange = async (event) => {
        const {name, value} = event.target;

        if (name === 'type') {
            await setSelectedFilter(prevState => ({
                type: value !== '' ? value : null,
                cost: prevState.cost
            }));
            console.log(selectedFilter)
        } else if (name === 'cost') {
            await setSelectedFilter(prevState => ({
                type: prevState.type,
                cost: value !== '' ? value : null
            }));
        }

        if (name !== 'cost' && name !== 'type') {
            return;
        }

        let pathToDispatch
        await setPath(prevPath => {
            const newPath = new URLSearchParams(prevPath);
            if (name === 'type') {
                newPath.set('type', value);
            } else {
                newPath.set('cost', value);
            }
            pathToDispatch = '?' + newPath.toString();
            return '?' + newPath.toString();
        });
        console.log(path)
        dispatch(fetchHouses(pathToDispatch))
        console.log("after")
    };

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
                        <div className="row-container">
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <label htmlFor="type" className="text-common">Тип домика:</label>
                                <select
                                    name="type"
                                    id="type"
                                    value={selectedFilter.type}
                                    onChange={handleFilterChange}
                                    style={{
                                        borderRadius: "15px",
                                        fontSize: "large",
                                        padding: "5px",
                                        width: "60%"
                                    }}
                                >
                                    <option value="">Выберите глэмпинг</option>
                                    {houseTypes.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", margin: "10px"}}>
                                <label htmlFor="cost" className="text-common">Стоимость за ночь:</label>
                                <input
                                    type="number"
                                    name="cost"
                                    id="cost"
                                    value={selectedFilter.cost}
                                    onChange={handleFilterChange}
                                    placeholder="Введите стоимость"
                                    style={{
                                        borderRadius: "15px",
                                        borderStyle: "none",
                                        fontSize: "large",
                                        padding: "5px",
                                        width: "60%"
                                    }}
                                />
                            </div>
                            <button type="button" className="basic-button" style={{padding: "10px", fontSize: "17px"}} onClick={handleFilterClean}>Очистить фильтр</button>
                        </div>
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