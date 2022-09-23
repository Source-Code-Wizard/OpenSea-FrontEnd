import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AuctionSmallCard from "./AuctionSmallCard";
import axios from "../../api/axios";
import './myauctions.css';

export default function MyAuctions(){
    const [myAuctions, setMyAuctions] = useState([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState();


    let id;

    React.useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setIsUserLoggedIn(true);
            
            const foundUser = JSON.parse(loggedInUser);
            
            console.log(foundUser);
            let userName = foundUser.username
            let admintoken = foundUser?.token;
            console.log(admintoken)
            console.log(userName);
            // axios.get(`/api/auctions/getAuction/6`, 
            axios.get(`/api/users/getUserId/${userName}`,
            {
                headers: { "Content-Type": "application/json"},
                withCredentials: true,
                // params: {
                //     username: userName
                // }
            })
            .then(function (response) {
                console.log(response.data);
                id = response.data;
                axios.get(`/api/auctions/getUsersAuctions/${id}`).then((response) => {
                    setMyAuctions(response.data);
                });
            })
            .catch(function (error) {
                console.log(error);
                
            });
        } 
    }, []);

    // React.useEffect(() => {
    //     axios.get(`/api/auctions/getUsersAuctions/${id}`).then((response) => {
    //       setMyAuctions(response.data);
    //     });
    // }, []);

    const cards = myAuctions.map(eachAuction => {
        return (
            <>
                <div className="cards">
                    <AuctionSmallCard
                        props={eachAuction}
                    />
                </div>
            </>)
    })

    return (
        <section className="hello">
            <div className="body">
                <h1 className="h1">My Auctions</h1>
                {cards} 
            </div>
        </section>

    )
    
}