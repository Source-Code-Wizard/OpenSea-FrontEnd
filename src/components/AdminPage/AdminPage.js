import React from "react";
import { Link, Outlet, useNavigate,useLocation } from 'react-router-dom';
import axios from "../../api/axios";
import UserReqsTable from "./UserReqsTable";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import useAuth from "../Authentication/useAuth";

export default function AdminPage() {

    const [userRequests, setUserRequests] = React.useState([]);
    const [adminToken, setAdminToken] = React.useState();
    const [count, Setcount] = React.useState(0);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();
    const from = location.state?.from?.pathname || "/OpenSea/Auctions";

    const logout = async () => { 
        setAuth({})
        localStorage.clear();
    }
        
    React.useEffect(() => {

        const loggedInUser = localStorage.getItem("user");
        let admintoken;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            admintoken = foundUser?.token;
        } 
        console.log(admintoken);
        axiosPrivate.get(`/api/admin/getRegRequests`,
            {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${admintoken}`},
                withCredentials: true,
            })
        .then(function (response) {
            console.log(response);    
            setUserRequests(response.data);
            setAdminToken(admintoken);
        })
        .catch(function (error) {
            console.log(error);
            if (error.response.status === 403) { 
                logout();
                navigate('/OpenSea/SignIn', { state: { from: location }, replace: true });
            }
        });
    }, [count]);

  
    return (
        <section className="adminPage">
            <h1 className="adminPage_h1"> Welcome back Administrator </h1>
            <div className="Request_table_parent">
                <UserReqsTable className="Request_table" requestList={userRequests} Token={adminToken} refreshFunction={Setcount} />
            </div>
                <button className="adminPage_button" onClick={() => { navigate(from) }}>Go back</button>
        </section>
    );
 }