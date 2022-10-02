import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AuctionSmallCard from "./AuctionSmallCard";
import axios from "../../api/axios";
import Pagination from "./Pagination";
import Auctions from "./Auctions";
import './myauctions.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import AuctionsMy from "./AuctionsMy";

export default function MyAuctions(){
    const [myAuctions, setMyAuctions] = useState([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState();
    
    /* Paging */
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage, setPostsPerPage] = React.useState(3);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = myAuctions.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const location = useLocation();
    const navigateTo = useNavigate();
    const from = location.state?.from?.pathname || "/OpenSea/Auctions";



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

 
    return (
        < section className="my_auctions_boddy">
            
            <h1 className="my_auctions_header">My Auctions</h1>
             
            <div>
                <section className="card_display">
                    <AuctionsMy AuctionsArray={currentPosts} />
                </section>

                <li className="my_actions_pagination">
                    <Pagination postsPerPage={postsPerPage} totalPosts={myAuctions.length} paginate={ paginate} />
                </li>    
                
                <button type="submit" className="my_auctions_button" onClick={() => { navigateTo(from) }}>go back</button>
            </div>
        
        </section>
    )
    
}