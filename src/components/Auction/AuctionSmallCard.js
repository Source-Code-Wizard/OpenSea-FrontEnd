import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios, { axiosPrivate } from "../../api/axios";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../../api/useAxiosPrivate";
import useAuth from "../Authentication/useAuth";


export default function AuctionSmallCard({ props }) { 


    const location = useLocation();
    const navigateTo = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const setAuth = useAuth();

    const logout = async () => { 
        setAuth({})
        localStorage.clear();
    }

    function trackUserHistory(event, id) {
        //event.preventDefault();
        
        const loggedInUser = localStorage.getItem("user");
        let userToken;
        let username;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            userToken = foundUser?.token;
            username = foundUser?.username;
            /* Send the post request to train the recommendation algorithm */
            axiosPrivate.post('/api/auctionViews/postView', JSON.stringify(
                {
                    "username": username,
                    "auctionId": id
                }
                ),
                {
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
                    withCredentials: true,
                })
                .then(function (response) {
                    console.log(response);
                    navigateTo(`/OpenSea/Auctions/${id}`, { state: { from: location } })
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
        <Card className="auctions_card-body" style={{ width: '15rem' }}>
            <Card.Body >
                <Card.Title>{props.name}</Card.Title>
                {/*<Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>*/}
            </Card.Body>
            <ListGroup className="list-group-flush" >
                <ListGroup.Item className="auctions_card-body">Location : {props.location}</ListGroup.Item>
                <ListGroup.Item className="auctions_card-body">Auction End Time : {props.auctionEndTime}</ListGroup.Item>
                <ListGroup.Item className="auctions_card-body">Currently : {props.currently} $</ListGroup.Item>
                <ListGroup.Item className="auctions_card-body">Number of Bids : {props.numOfBids} $</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button variant="primary" onClick={event =>trackUserHistory(event,props.itemId)}>Full details</Button>
            </Card.Body>
        </Card>
    );
}