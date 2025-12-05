import {Routes, Route} from "react-router-dom" ;
import Home from "./home";
import Login from "./login";
import Dashboard from "./dashboard";
import Register from "./register";

const RouterComponent = () => {
    return (
        <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        
    );
};

export default RouterComponent;
