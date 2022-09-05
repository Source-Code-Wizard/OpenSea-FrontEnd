import React from "react";
import Table from 'react-bootstrap/Table';
import './UserReqsTable.css'
import axios from "../api/axios";

export default function UserReqsTable({ requestList, Token,refreshFunction }) {
    
    
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
        axios.post(`/api/admin/getRegRequests/a`,
            JSON.stringify({
                "username": userName,
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
          });
    }


    return (
        <Table className="table" striped>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Accept?</th>
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
                            </tr>
                        </>
                    )
                })}        
        </tbody>
    </Table>
    )
 }