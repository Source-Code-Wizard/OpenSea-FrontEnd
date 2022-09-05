import React from "react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import UserReqsTable from "./UserReqsTable";

export default function AdminPage() {

    const [userRequests, setUserRequests] = React.useState([]);
    const [adminToken, setAdminToken] = React.useState();
    const [count, Setcount] = React.useState(0);
        
    React.useEffect(() => {

        const loggedInUser = localStorage.getItem("user");
        let admintoken;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            admintoken = foundUser?.token;
        } 
        console.log(admintoken);
        axios.get(`/api/admin/getRegRequests`,
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
        });
    }, [count]);

    /*function f(event) {
        event.preventDefault();
        const loggedInUser = localStorage.getItem("user");
        let admintoken;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            admintoken = foundUser?.token;
            console.log(admintoken);
            

        } 
        axios.post(`/api/admin/getRegRequests/a`, JSON.stringify({
            "username": "lio",
        }),
            {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${admintoken}`},
                withCredentials: true,
            })
        .then(function (response) {
            console.log(response);    
            //setUserRequests(response.data);
            //setAdminToken(admintoken);
        })
        .catch(function (error) {
          console.log(error);
        });
     }*/

    return (
        <section className="adminPage">
            <h1 className="adminPage_h1"> Welcome back Administrator </h1>
            <div className="Request_table_parent">
                <UserReqsTable className="Request_table" requestList={userRequests} Token={adminToken} refreshFunction={Setcount} />
            </div>
            <Link style={{ textDecoration: 'none' }} to="/OpenSea">
                <button className="adminPage_button">Go home</button>
            </Link>
        </section>
    );
 }