import React, {useEffect, useState} from 'react';
import Header from "../../Header";
import Navbar from "./components/owner/Navbar";
import MyGlampings from "./components/owner/MyGlampings";
import MyHouses from "./components/owner/MyHouses";
import GlampingsArray from "./components/GlampingsArray";
import {fetchGlampings} from "../../../redux/glampingsSlice";
import {useDispatch} from "react-redux";

const GlampingsOwner = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("booking");

    const changeSelected = (newSelection) => {
        setSelected(newSelection);
    };

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                dispatch(fetchGlampings())
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
            <div className="overlay" style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Header/>
                <div className="mainPage">
                    <div className="row-container" style={{alignItems: "flex-start"}}>
                        <div>
                            <Navbar changeSelected={changeSelected} selected={selected}/>
                        </div>
                        <div style={{margin: "30px", width: "100%"}}>
                            {selected === "houses" && <MyHouses/>}
                            {selected === "booking" && <GlampingsArray/>}
                            {selected === "glampings" && <MyGlampings/>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlampingsOwner;