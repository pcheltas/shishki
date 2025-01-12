import React, {useEffect} from 'react';
import Header from "../../Header";
import {useDispatch, useSelector} from "react-redux";
import {fetchReviews} from "../../../redux/reviewsSlice";
import {fetchGlampings} from "../../../redux/glampingsSlice";
import GlampingsArray from "./components/GlampingsArray";

const GlampingsUser = () => {
    const dispatch = useDispatch();
    const glampings = useSelector(state => state.glampings.glampingsApproved)

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
                    <GlampingsArray/>
                </div>
            </div>
        </div>
    );
};

export default GlampingsUser;