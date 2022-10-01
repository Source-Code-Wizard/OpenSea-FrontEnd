import React,{ useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import MessageCard from "./MessageCard";
import "./inbox.css";
import Messages from "./Messages";
import Pagination from "./Pagination";




export default function Outbox() {

    const [Outbox, setOutbox] = useState([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState();

    /* Paging */
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage, setPostsPerPage] = React.useState(3);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Outbox.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);


    const location = useLocation();
    const navigateTo = useNavigate();
    const from = location.state?.from?.pathname || "/OpenSea/MessagingStartPage";

    let id;

    React.useEffect(() => {
        console.log(Outbox)
    }, [Outbox]);

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
                axios.get(`/api/users/getOutbox/${id}`).then((response) => {
                    setOutbox(response.data);
                    console.log(response.data);
                });
            })
            .catch(function (error) {
                console.log(error);
                
            });
        } 
    }, []);

    return(
        < section className="inbox_body">
            
            <h1 className="inbox_header">Outbox</h1>
             
            <div>
                <section className="card_display">
                    <Messages MessageArray={currentPosts} />
                </section>

                <li className="my_actions_pagination">
                    <Pagination postsPerPage={postsPerPage} totalPosts={Outbox.length} paginate={ paginate} />
                </li>    

                
                <button type="submit" className="inbox_button" onClick={() => { navigateTo(from) }}>go back</button>
            </div>
        
        </section>
    )
}