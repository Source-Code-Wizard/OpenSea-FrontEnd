import React from "react";
import Table from 'react-bootstrap/Table';
import './UserReqsTable.css'
import axios from "../../api/axios";
import { Link, Outlet, useNavigate,useLocation } from 'react-router-dom';
import useAxiosPrivate from "../../api/useAxiosPrivate";
import useAuth from "../Authentication/useAuth";


export default function UserReqsTable({ requestList, Token, refreshFunction }) {
    

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();

    const logout = async () => { 
        setAuth({})
        localStorage.clear();
    }
    
    
    function RegisterUser(event, userName) { 
        event.preventDefault();
        console.log("registerUser");
        console.log(userName);
        console.log(Token)
        const loggedInUser = localStorage.getItem("user");
        let admintoken;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            admintoken = foundUser?.token;
        } 
        axiosPrivate.post(`/api/admin/getRegRequests/a`,
            JSON.stringify({
                "username": userName
            }),
            {
            headers: { "Content-Type": "application/json" , Authorization: `Bearer ${admintoken}`},
            withCredentials: true,
            
          })
          .then(function (response) {
              console.log(response);
              refreshFunction(prevState => prevState + 1);
          })
          .catch(function (error) {
              console.log(error);
              console.log(error);
              if (error.response.status === 403) { 
                  logout();
                  navigate('/OpenSea/SignIn', { state: { from: location }, replace: true });
              }
          });
    }


    return (
        <Table className="table" striped>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Accept?</th>
                <th>Inspect</th>
            </tr>
        </thead>
        <tbody>
                {requestList.map(eachRequest => { 
                    return (
                        <>
                            <tr>
                                <td>{eachRequest.username}</td>
                                <td>{eachRequest.email}</td>
                                <td>
                                    <button className="Request_table_button" onClick={event => RegisterUser(event,eachRequest.username)} variant="primary" >Accept</button>
                                </td>
                                <td>
                                    <Link style={{ textDecoration: 'none' }} to={`/OpenSea/User/${eachRequest.username}`}>
                                        <button className="Request_table_button" variant="primary" >Inspect</button>
                                    </Link>
                                </td>
                            </tr>
                        </>
                    )
                })}        
        </tbody>
    </Table>
    )
 }