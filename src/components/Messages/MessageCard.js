import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios, { axiosPrivate } from "../../api/axios";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../../api/useAxiosPrivate";
import useAuth from "../Authentication/useAuth";
import Inbox from "./Inbox";
import Outbox from "./Outbox";
import Messages from "./Messages";


export default function MessageCard({eachMessage,refreshFunction}){

    const location = useLocation();
    const navigateTo = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const setAuth = useAuth();
    const [Outbox, setOutbox] = useState([]);

    const logout = async () => { 
        setAuth({})
        localStorage.clear();
    }

    React.useEffect(() => {
        console.log(Outbox)
    }, [Outbox]);

    function deleteMessage(event) {
        
        const loggedInUser = localStorage.getItem("user");
        let userToken;
        let username;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            userToken = foundUser?.token;
            username = foundUser?.username;

            // console.log(props.senderUsername);
            let userId;
            axios.get(`/api/users/getUserId/${username}`,
                {
                    headers: { "Content-Type": "application/json"},
                    withCredentials: true,
                })
                .then(function(response){
                    console.log(response.data);
                    userId = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                    if (error.response.status === 403) { 
                        logout();
                        navigateTo('/OpenSea/SignIn', { state: { from: location }, replace: true });
                    }     
                });
                console.log(JSON.stringify(eachMessage));
            axios.get('/api/messages/getMessageId',
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                    params: {
                        senderUsername: eachMessage.senderUsername,
                        receiverUsername: eachMessage.receiverUsername,
                        message: eachMessage.message,
                        dateTime: eachMessage.dateTime
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    let messageId = response.data;
                    if(username === eachMessage.senderUsername){
                        // console.log(props.senderUsername);
                        axios.post(`api/messages/deleteOutboxMessage/${userId}/${messageId}`,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        })
                        .then((response) => {
                            // setInbox(response.data);

                            refreshFunction(prevState => prevState + 1);

                            console.log(response.data);
                            axios.get(`/api/users/getOutbox/${userId}`).then((response) => {
                                setOutbox(response.data);
                                console.log(response.data);
                            });
                            // return(
                            //     response.data
                            // )
                           //navigateTo(`/OpenSea/Outbox`, { state: { from: location } })
                        })
                        .catch(function (error) {
                            console.log(error);
                            if (error.response.status === 403) { 
                                logout();
                                navigateTo('/OpenSea/SignIn', { state: { from: location }, replace: true });
                            }     
                        });
                    }
                    else if(username === eachMessage.receiverUsername){
                        axios.post(`api/messages/deleteInboxMessage/${userId}/${messageId}`,
                        {
                            headers: { "Content-Type": "application/json" },
                            withCredentials: true,
                        })
                        .then((response) => {
                            // setInbox(response.data);
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                            if (error.response.status === 403) { 
                                logout();
                                navigateTo('/OpenSea/SignIn', { state: { from: location }, replace: true });
                            }     
                        });
                    }
                    // navigateTo(`/OpenSea/Outbox`, { state: { from: location } })
                    
                })
                .catch(function (error) {
                    console.log(error);
                    if (error.response.status === 403) { 
                        logout();
                        navigateTo('/OpenSea/SignIn', { state: { from: location }, replace: true });
                    }     
                });
        }
    }

    return (
        <Card className="message_card-body" style={{ width: '15rem' }}>
            <Card.Body >
                {/* <Card.Title>{props.name}</Card.Title> */}
                {/*<Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>*/}
            </Card.Body>
            <ListGroup className="list-group-flush" >
                <ListGroup.Item className="message_card-body">To : {eachMessage.receiverUsername}</ListGroup.Item>
                <ListGroup.Item className="message_card-body">From : {eachMessage.senderUsername}</ListGroup.Item>
                <ListGroup.Item className="message_card-body">Message : {eachMessage.message} </ListGroup.Item>
                <ListGroup.Item className="message_card-body">Message was sent: {eachMessage.dateTime}</ListGroup.Item>

                {/* <ListGroup.Item className="auctions_card-body">Number of Bids : {props.numOfBids} $</ListGroup.Item> */}
            </ListGroup>
            <Card.Body>
                <Button variant="primary" className="button" onClick={event =>deleteMessage(event)}>Delete</Button>
            </Card.Body>
        </Card>
    );
}
