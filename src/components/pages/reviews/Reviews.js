import React, {useEffect, useState} from 'react';
import Header from "../../Header";
import {useDispatch, useSelector} from "react-redux";
import {fetchReviews} from "../../../redux/reviewsSlice";
import {fetchGlampings} from "../../../redux/glampingsSlice";
import {BsStarFill} from "react-icons/bs";
import ReviewCreation from "./ReviewCreation";

const Reviews = () => {
    const reviews = useSelector(state => state.reviews.reviews)
    const glampings = useSelector(state => state.glampings.glampingsApproved)
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                dispatch(fetchReviews()),
                dispatch(fetchGlampings())
            ]);
        };
        loadData();
        const interval = setInterval(() => {
            loadData();
        }, 5000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const handleChange = () => {
        setOpen(!open)
    }

    return (
        <div>
            <div className="overlay" style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <Header/>
                <div className="mainPage">
                    <button className="basic-button" onClick={handleChange}
                            style={{backgroundColor: "rgba(20, 35, 27, 0.88)"}}>Добавить
                        отзыв
                    </button>
                    {open ?
                        <ReviewCreation handleChange={handleChange}/>
                        :
                        <div></div>
                    }
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div className="frame-element" key={review.id}>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <h1 className="title-common">Отзыв №{review.id} {"\t"}</h1>
                                    <div style={{marginLeft: "25px"}}>
                                        {Array.from({length: review.rating}, (_, index) => (
                                            <BsStarFill color="yellow" style={{fontSize: "25px", marginLeft: "5px"}}
                                                        key={index}/>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-small">От: {review.login}</p>
                                <p className="text-small">Глэмпинг: {glampings.find(glamping => glamping.id === review.glampingId)?.description}</p>
                                <p className="text-common">{review.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-common">Отзывов еще нет</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;