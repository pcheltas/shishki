import React, {useEffect, useState} from 'react';
import {API_URL} from "../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {approveGlamping, fetchGlampingsForReview, rejectGlamping} from "../../../../redux/adminSlice";

const GlampingReviewItem = ({glamping}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const imageUrl = API_URL + "/photo/" + glamping.photoName
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    const accept = async () => {
        await dispatch(approveGlamping([glamping.id, token]))
        await dispatch(fetchGlampingsForReview(token))
    }

    const decline = async () => {
        await dispatch(rejectGlamping([glamping.id, token]))
        await dispatch(fetchGlampingsForReview(token))
    }

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div className="frame-element" style={{alignItems: null}}>
                <div className="row-container">
                    <div style={{flex: 1}}>
                        {
                            img ?
                                <img src={img} alt={glamping.photoName} style={{width: "500px", borderRadius: "20px"}}/>
                                :
                                <div></div>
                        }

                    </div>
                    <div style={{
                        flex: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignSelf: "normal",
                        flexDirection: "column",
                        marginLeft: "50px"
                    }}>
                        <div>
                            <h1 className="title-common">{glamping.address}</h1>
                            <p className="text-small">{glamping.description}</p>
                            <p className="text-common" style={{marginBottom: "3px"}}>Владелец:</p>
                            <p className="text-small" style={{marginTop: "3px"}}>{glamping.ownerLogin}</p>

                        </div>
                    </div>
                </div>
                <div className="row-container" style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                    <button className="add-button" style={{marginRight: "20px"}} onClick={accept}>Подтвердить</button>
                    <button className="add-button" onClick={decline} style={{textDecorationColor: "red", marginLeft: "20px"}}>Отклонить</button>
                </div>
            </div>
        </div>
    );
};

export default GlampingReviewItem;

