import React, {useState} from 'react';
import "../../../styles/reviews.css"
import {useDispatch, useSelector} from "react-redux";
import ReactStars from "react-rating-stars-component";
import {addReview} from "../../../redux/reviewsSlice";

const ReviewCreation = ({handleChange}) => {
    const login = useSelector(state => state.auth.login)
    const token = useSelector(state => state.auth.token)
    const glampings = useSelector(state => state.glampings.glampingsApproved)
    const dispatch = useDispatch();
    const [error, setError] = useState([false, ""])
    const [formData, setFormData] = useState({
        login: login,
        glampingId: null,
        content: null,
        rating: null
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const ratingChange = (newRating) => {
        setFormData({
            ...formData,
            "rating": newRating,
        });
    }

    const validateForm = () => {
        if (formData.rating && formData.glampingId && formData.content){
            setError([false, ""])
            return true
        }
        else {
            setError([true, "Все поля обязательны"])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChange();
        if (validateForm()){
            dispatch(addReview([JSON.stringify(formData), token]))
            console.log('Форма отправлена:', formData);
        }
    };


    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="button-container">
                        <button className="basic-button" style={{padding: "5px 10px 5px 10px", borderRadius: "30px"}}
                                onClick={handleChange}>&times;</button>
                    </div>
                    <div className="creation-box">
                        <form onSubmit={handleSubmit} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            backgroundColor: '#1b4b26',
                            width: '500px',
                        }}>
                            <label htmlFor="glampingId" className="text-common">Глэмпинг</label>
                            <select
                                name="glampingId"
                                value={formData.glampingId}
                                onChange={handleInputChange}
                                style={{marginBottom: '10px', borderRadius: "20px", height: "30px"}}
                            >
                                <option value="">Выберите глэмпинг</option>
                                {glampings.length > 0 ? (
                                    glampings.map(glamping => (
                                        <option value={glamping.id}>{glamping.description}</option>
                                    ))
                                ) : (
                                    <></>
                                )}

                            </select>

                            <label htmlFor="content" className="text-common">Отзыв</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows={10}
                                style={{
                                    marginBottom: '10px',
                                    padding: "10px",
                                    borderRadius: "20px",
                                    borderStyle: "none",
                                    resize: 'vertical'
                                }}
                                required={true}
                            />
                            <p className='text-common' style={{margin: 0}}>Оценка</p>
                            <ReactStars
                                name="rating"
                                count={5}
                                onChange={ratingChange}
                                size={45}
                                activeColor="#ffd700"
                                isHalf={false}
                                style={{padding: 0}}
                            />
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <button type="submit" className="basic-button"
                                        style={{display: "flex", justifyContent: "center", maxWidth: "150px", padding: "15px"}}>
                                    Отправить
                                </button>
                            </div>
                            {error[0] ? <p className="text-common" style={{border: "5px solid red", borderRadius: "15px", textAlign: "center"}}>{error[1]}</p> : <div></div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCreation;