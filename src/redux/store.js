import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from "redux-persist";
import servicesSlice from "./servicesSlice";
import shopSlice from "./shopSlice";
import errorMiddleware from "./errorMiddleware";
import authSlice from "./authSlice";
import guestsSlice from "./guestsSlice";
import bookingsSlice from "./bookingsSlice";
import reviewsSlice from "./reviewsSlice";
import glampingsSlice from "./glampingsSlice";
import photoSlice from "./photoSlice";
import housesSlice from "./housesSlice";
import houseTypeSlice from "./houseTypeSlice";
import adminSlice from "./adminSlice";

export const API_URL = 'http://localhost:6128/api/v1';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'service', 'shop']
};

const rootReducer = combineReducers({
    auth: authSlice,
    service: servicesSlice,
    shop: shopSlice,
    guests: guestsSlice,
    bookings: bookingsSlice,
    reviews: reviewsSlice,
    glampings: glampingsSlice,
    photo: photoSlice,
    houses: housesSlice,
    houseTypes: houseTypeSlice,
    admin: adminSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(errorMiddleware),
})

export const persistor = persistStore(store)
export default store