import React, {useEffect, useState} from 'react';
import {API_URL} from "../../../../redux/store";
import {useNavigate} from "react-router-dom";

const GlampingItem = ({glamping}) => {
    const imageUrl = API_URL + "/photo/" + glamping.photoName
    const [img, setImg] = useState();
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/glampings/${glamping.id}`);
    };

    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };
    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <div className="frame-element row-container" style={{alignItems: null}}>
            <div style={{flex: 1}}>
                {
                    img ?
                        <img src={img} alt={glamping.photoName} style={{width: "500px", borderRadius: "20px"}}/>
                        :
                        <div></div>
                }

            </div>
            <div style={{flex: 2, display: "flex", justifyContent: "space-between", alignSelf: "normal", flexDirection: "column", marginLeft: "50px"}}>
                <div>
                    <h1 className="title-common">{glamping.address}</h1>
                    <p className="text-small">{glamping.description}</p>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <button className="add-button" style={{width: "200px", fontSize: "20px"}} onClick={handleRedirect}>К домикам</button>
                </div>
            </div>
        </div>
    );
};

export default GlampingItem;