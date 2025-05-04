import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchGlampings} from "../../../redux/glampingsSlice";
import Header from "../../Header";
import Navbar from "./components/owner/Navbar";
import GlampingsArray from "./components/GlampingsArray";
import StaffNavbar from "./components/stuff/StaffNavbar";
import StaffHouseItem from "./components/stuff/StaffHouseItem";
import StaffPage from "./components/stuff/StaffPage";

const GlampingsStaff = () => {
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
                            <StaffNavbar changeSelected={changeSelected} selected={selected}/>
                        </div>
                        <div style={{margin: "30px", width: "100%"}}>
                            {selected === "booking" && <GlampingsArray/>}
                            {selected === "service" && <StaffPage/>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default GlampingsStaff;