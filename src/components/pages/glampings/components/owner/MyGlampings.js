import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import MyGlampingItem from "./MyGlampingItem";
import GlampingForm from "./GlampingForm";
import {fetchAllGlampings} from "../../../../../redux/glampingsSlice";

const MyGlampings = () => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.auth.login)
    const allGlampings = useSelector(state => state.glampings.allGlampings)
    const myGlampings = allGlampings.filter(glamping => glamping.ownerLogin === login);
    const [filling, setFilling] = useState(false)

    const handleChange = () => {
        setFilling(!filling)
        dispatch(fetchAllGlampings())
    }

    useEffect(() => {
        dispatch(fetchAllGlampings())
    }, [filling]);

    return (
        <div className="row-container">
            <div style={{flex: 4}}>
                {myGlampings.length > 0 ? (
                    myGlampings.map(glamping => (
                        <div key={glamping.id}>
                            <MyGlampingItem glamping={glamping}/>
                        </div>
                    ))
                ) : (
                    <p className="text-common">У вас еще нет глэмпингов</p>
                )}
            </div>
            <div style={{flex: 1, alignSelf: "flex-start", marginTop: "10px"}}>
                <button type="button" className="basic-button" onClick={handleChange}>Добавить глэмпинг</button>
            </div>
            {filling ? <GlampingForm handleChange={handleChange}/> : <></> }
        </div>
    );
};

export default MyGlampings;