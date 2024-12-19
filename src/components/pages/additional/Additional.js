import React, {useEffect, useState} from 'react';
import Header from "../../Header";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Cart from "./components/Cart";
import Goods from "./components/Goods";
import {useDispatch} from "react-redux";
import {fetchGoods} from "../../../redux/shopSlice";
import {fetchServices} from "../../../redux/servicesSlice";

const Additional = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("services");

    const changeSelected = (newSelection) => {
        setSelected(newSelection);
    };

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                dispatch(fetchGoods()),
                dispatch(fetchServices())
            ]);
        };
        loadData();
        const interval = setInterval(() => {
            loadData();
        }, 2000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <div className="overlay" style={{
            display: "flex",
            flexDirection: "column",
        }}>
            <Header />
            <div className="mainPage">
                <div className="row-container" style={{alignItems: "flex-start"}}>
                    <div>
                        <Navbar changeSelected={changeSelected} selected={selected} />
                    </div>
                    <div style={{margin: "30px", width: "100%"}}>
                        {selected === "services" && <Services />}
                        {selected === "shop" && <Goods />}
                        {selected === "cart" && <Cart />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Additional;