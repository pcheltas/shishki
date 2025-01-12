import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addPhoto} from "../../../../../redux/photoSlice";
import {addGlamping, fetchGlampings} from "../../../../../redux/glampingsSlice";
import {addGuest} from "../../../../../redux/guestsSlice";

const GlampingForm = ({handleChange}) => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.auth.login)
    const token = useSelector(state => state.auth.token)
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(
        {
            photoName: '',
            address: '',
            description: '',
            ownerLogin: login,
            status: "WAITING_FOR_CONFIRMATION"
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
            setErrors(prevErrors => ({ ...prevErrors, image: 'Недопустимый тип файла. Пожалуйста, загрузите изображение.' }));
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
        if (!formData.address) {
            newErrors.address = 'Адрес обязателен';
        }
        if (!formData.description) {
            newErrors.description = 'Описание обязательно';
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
            // console.log(response.payload.fileName)
            // const imageName = response.payload.fileName
            formData.photoName = response.payload.fileName
            // console.log(imageName)
            // console.log('Форма отправлена:', {...formData, image});
            dispatch(addGlamping([JSON.stringify(formData), token]))
            dispatch(fetchGlampings)
            handleChange()
        }
    };


    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content" style={{width: "80%", height: "80%", overflowY: 'auto',}}>
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
                            {image ? <div> {image.name}</div>:
                                <div style={{color: "antiquewhite"}}>Перетащите изображение сюда или нажмите, чтобы
                                    выбрать файл</div>}
                            {errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
                        </div>
                        <div style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{display: "flex", alignItems: "start"}}>
                                <label htmlFor="address" className="title-common" style={{textAlign: "start"}}>Адрес:</label>
                            </div>
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    id="address"*/}
                            {/*    name="address"*/}
                            {/*    value={formData.address}*/}
                            {/*    onChange={handleInputChange}*/}
                            {/*/>*/}
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows="10" // количество строк
                                style={{
                                    width: '80%',
                                    resize: 'vertical',
                                    borderRadius: "20px",
                                    padding: "20px"
                                }} // разрешение на вертикальное изменение размера
                            />
                            {errors.address && <span style={{color: 'red'}}>{errors.address}</span>}
                        </div>
                    </div>
                    <div style={{marginTop: "20px", marginLeft: "20px"}}>
                        <label htmlFor="description" className="title-common">Описание:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="10" // количество строк
                            style={{
                                width: '95%',
                                resize: 'vertical',
                                borderRadius: "20px",
                                padding: "20px"
                            }} // разрешение на вертикальное изменение размера
                        />
                        {errors.description && <span style={{color: 'red'}}>{errors.description}</span>}
                    </div>
                    <div style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                        <button type="submit" className="basic-button" style={{padding: "15px"}} onClick={handleSubmit}>Добавить глэмпинг</button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default GlampingForm;