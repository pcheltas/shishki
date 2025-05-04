import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/pages/home/Home";
import {Provider, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store from './redux/store';
import {persistor} from "./redux/store";
import {ToastContainer} from 'react-toastify';
import GlampingsUser from "./components/pages/glampings/GlampingsUser";
import Faq from "./components/pages/faq/FAQ";
import Contacts from "./components/pages/contacts/Contacts";
import Additional from "./components/pages/additional/Additional";
import Register from "./components/pages/authentication/Register";
import Login from "./components/pages/authentication/Login";
import Account from "./components/pages/account/Account";
import Reviews from "./components/pages/reviews/Reviews";
import 'react-toastify/dist/ReactToastify.css';
import GlampingsAdmin from "./components/pages/glampings/GlampingsAdmin";
import GlampingsOwner from "./components/pages/glampings/GlampingsOwner";
import GlampingsStaff from "./components/pages/glampings/GlampingsStaff";
import GlampingHouses from "./components/pages/glampings/GlampingHouses";
import Admin from "./components/pages/admin/Admin";


const AppContent = () => {

    const role = useSelector(state => state.auth.role)
    const renderGlampingsComponent = () => {
        switch (role) {
            case "ADMIN":
                return <GlampingsAdmin/>;
            case "OWNER":
                return <GlampingsOwner/>;
            case "STAFF":
                return <GlampingsStaff/>;
            case "USER":
                return <GlampingsUser/>;
            default:
                return <GlampingsUser/>;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/glampings" element={renderGlampingsComponent()}/>
                <Route path="/faq" element={<Faq/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path="/additional" element={<Additional/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path='/glampings/:id' element={<GlampingHouses/>}/>
                {
                    role === "ADMIN" ?
                        <Route path='/admin' element={<Admin/>}/>
                        :
                        <></>
                }
            </Routes>
        </BrowserRouter>
    );
}

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="container">
                    <div className="background overlay">
                        <div>
                            <ToastContainer
                                position="top-center"
                                autoClose={2000}
                                hideProgressBar={true}
                            />
                            <AppContent/>
                        </div>
                    </div>
                </div>
            </PersistGate>
        </Provider>
    )
}

export default App;
