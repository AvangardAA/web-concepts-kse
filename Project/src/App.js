import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import LogIn from "./components/Login/LogIn";
import {AuthProvider} from "./context/AuthContext";
import Support from "./components/Support/Support";
import NotFound from "./components/Errors/404";
import OrderBook from "./components/Stakan/OrderBook";
import UserProfile from "./components/Stakan/UserProfile";
class App extends React.Component {
  render() {
    return (
        <AuthProvider>
        <Router>
            {<Navbar/>}
                <Routes>
                    <Route path="/" element={<MainPage/>}>
                    </Route>
                    <Route path="*" element={<NotFound/>}>
                    </Route>
                    <Route path="login/" element={<LogIn/>}>
                    </Route>
                    <Route path="support/" element={<Support/>}>
                    </Route>
                    <Route path="orderbook/" element={<OrderBook/>}>
                    </Route>
                    <Route path="userprofile/" element={<UserProfile/>}>
                    </Route>
                </Routes>
            <Footer/>
        </Router>
        </AuthProvider>
    )
  }
}
export default App;
