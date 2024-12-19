import React from 'react';
import Header from "../../Header";
import MainPage from "./components/MainPage";

const Home = () => {
    return (
        <div className="overlay" style={{display: "flex",
        flexDirection: "column",
        }}>
            {/*<div style={{flex:1}}*/}
            <Header />
            <MainPage/>
        </div>
    );
};

export default Home;