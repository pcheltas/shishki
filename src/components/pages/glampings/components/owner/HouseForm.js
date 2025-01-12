import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addPhoto} from "../../../../../redux/photoSlice";
import {addGlamping, fetchGlampings} from "../../../../../redux/glampingsSlice";
import {addHouse, fetchHouses, fetchHouseStatuses} from "../../../../../redux/housesSlice";
import {fetchHouseTypes} from "../../../../../redux/houseTypeSlice";

const HouseForm = ({handleChange}) => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.auth.login)
    const token = useSelector(state => state.auth.token)
    const houseTypes = useSelector(state => state.houseTypes.houseTypes)
    const houseStatuses = useSelector(state => state.houses.houseStatuses)
    const glampings = useSelector(state => state.glampings.glampingsApproved)
    const myGlampings = glampings.filter(glamping => glamping.ownerLogin === login)
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(
        {
            glampingId: null,
            houseType: '',
            houseStatus: '',
            cost: null,
            photoName: null
        }
    )

    const handleImageChange = async (file) => {
        if (file) {
            await setImage(file);
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            handleImageChange(file);
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                image: 'Недопустимый тип файла. Пожалуйста, загрузите изображение.'
            }));
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.glampingId) {
            newErrors.glampingId = 'Глэмпинг обязателен';
        }
        if (!formData.houseType) {
            newErrors.houseType = 'Тип домика обязателен';
        }
        if (!formData.houseStatus) {
            newErrors.houseStatus = 'Статус домика обязателен';
        }
        if (!formData.cost) {
            newErrors.cost = 'Стоимость домика обязательна';
        }
        if (!image) {
            newErrors.image = 'Изображение обязательно';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            const response = await dispatch(addPhoto([image, token]))
            formData.photoName = response.payload.fileName
            await dispatch(addHouse([JSON.stringify(formData), token]))
            await dispatch(fetchHouses)
            handleChange()
            console.log(formData)
        }
    };

    useEffect(() => {
        dispatch(fetchHouseTypes())
        dispatch(fetchHouseStatuses())
    }, [dispatch]);

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content" style={{width: "80%", height: "60%", overflowY: 'auto',}}>
                    <div className="button-container" style={{justifyContent: "start"}}>
                        <button className="basic-button" style={{padding: "8px 15px 8px 15px", borderRadius: "30px"}}
                                onClick={handleChange}>&times;</button>
                    </div>
                    <div className="row-container" style={{marginLeft: "20px"}}>
                        <div
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            style={{
                                border: '2px dashed #ccc',
                                borderRadius: '5px',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                height: "300px",
                                width: "300px"
                            }}
                        >
                            <label htmlFor="image" className="text-common" style={{cursor: 'pointer'}}>Загрузить
                                изображение</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                style={{display: 'none'}}
                                onChange={(e) => handleImageChange(e.target.files[0])}
                            />
                            {image ? <div> {image.name}</div> :
                                <div style={{color: "antiquewhite"}}>Перетащите изображение сюда или нажмите, чтобы
                                    выбрать файл</div>}
                            {errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
                        </div>
                        <div style={{flex: 1, display: "flex", flexDirection: "column", padding: "20px", marginLeft: "80px"}}>
                            <div style={{display: "flex", flexDirection: "column", margin: "10px"}}>
                                <label htmlFor="houseStatus" className="text-common">Статус дома:</label>
                                <select
                                    name="houseStatus"
                                    id="houseStatus"
                                    value={formData.houseStatus}
                                    onChange={handleInputChange}
                                    style={{
                                        borderRadius: "15px",
                                        fontSize: "large",
                                        padding: "5px",
                                        width: "60%"
                                    }}
                                >
                                    <option value="">Выберите статус</option>
                                    {houseStatuses.map(status => (
                                        <option key={status.id} value={status.status}>
                                            {status.status}
                                        </option>
                                    ))}
                                </select>
                                {errors.houseStatus && <span style={{color: 'red'}}>{errors.houseStatus}</span>}
                            </div>

                            <div style={{display: "flex", flexDirection: "column", margin: "10px"}}>
                                <label htmlFor="houseType" className="text-common">Тип дома:</label>
                                <select
                                    name="houseType"
                                    id="houseType"
                                    value={formData.houseType}
                                    onChange={handleInputChange}
                                    style={{
                                        borderRadius: "15px",
                                        fontSize: "large",
                                        padding: "5px",
                                        width: "60%"
                                    }}
                                >
                                    <option value="">Выберите тип</option>
                                    {houseTypes.map(type => (
                                        <option key={type.id} value={type.type}>
                                            {type.type}
                                        </option>
                                    ))}
                                </select>
                                {errors.houseType && <span style={{color: 'red'}}>{errors.houseType}</span>}
                            </div>

                            <div style={{display: "flex", flexDirection: "column", margin: "10px"}}>
                                <label htmlFor="glampingId" className="text-common">Глэмпинг:</label>
                                <select
                                    name="glampingId"
                                    id="glampingId"
                                    value={formData.glampingId}
                                    onChange={handleInputChange}
                                    style={{
                                        borderRadius: "15px",
                                        fontSize: "large",
                                        padding: "5px",
                                        width: "60%"
                                    }}
                                >
                                    <option value="">Выберите глэмпинг</option>
                                    {myGlampings.map(glamping => (
                                        <option key={glamping.id} value={glamping.id}>
                                            {glamping.address}
                                        </option>
                                    ))}
                                </select>
                                {errors.glampingId && <span style={{color: 'red'}}>{errors.glampingId}</span>}
                            </div>

                            <div style={{display: "flex", flexDirection: "column", margin: "10px"}}>
                                <label htmlFor="cost" className="text-common">Стоимость за ночь:</label>
                                <input
                                    type="number"
                                    name="cost"
                                    id="cost"
                                    value={formData.cost || ''}
                                    onChange={handleInputChange}
                                    placeholder="Введите стоимость"
                                    style={{
                                        borderRadius: "15px",
                                        borderStyle: "none",
                                        fontSize: "large",
                                        padding: "5px",
                                        width: "60%"
                                    }}
                                />
                                {errors.cost && <span style={{color: 'red'}}>{errors.cost}</span>}
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                        <button type="submit" className="basic-button" style={{padding: "15px"}}
                                onClick={handleSubmit}>Добавить домик
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default HouseForm;