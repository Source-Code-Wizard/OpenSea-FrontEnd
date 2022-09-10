import React from "react";
import './auctions.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from "../../api/axios";
import Pagination from "./Pagination";
import Auctions from "./Auctions";

import BidTable from "./BidTable";


export default function DisplayAuctions() {
    
    const [category, setCategory] = React.useState("");
    const [auctionsArray, setAuctionsArray] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage, setPostsPerPage] = React.useState(2);

    const [filters, setFilters] = React.useState(
        {
            price: "",
            location: ""
        });
    
        function handleChange(event) {
            const { name, value, type, checked } = event.target
            console.log(name);
            console.log(value);
            setFilters(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    
    function submitCategory(event, param) { 
        event.preventDefault()
        const fetchAuctions = async () => {
            console.log("async");
            console.log(param);
            const response = await axios.get('/api/auctions/search',
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                    params: {
                        category: param
                    }
                });
            console.log(response);
            console.log(response?.data?.Auctions);
            setAuctionsArray(response?.data?.Auctions);
            setCategory(param);
        };
        fetchAuctions();
    }
    function showRecommended(event, param) { 
        event.preventDefault()
        const loggedInUser = localStorage.getItem("user");
        //console.log(loggedInUser);
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            console.log(foundUser);
            const username = foundUser?.username;
            
            const fetchAuctions = async () => {
                console.log("async");
                console.log(param);
                let id = 0;
                const response = await axios.get(`/api/recommendation/auctions`,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                        params: {
                            username: username
                        }
                    });
                console.log(response);
                setAuctionsArray(response.data);
                setCategory(param);
            };
            fetchAuctions();
        } else { 
            setAuctionsArray([]);
        }
       
    }

    /*React.useEffect(() => { 
        console.log("inside useEffect");
        console.log(auctionsArray);
        console.log(category);
    }, [auctionsArray]);*/
    
    React.useEffect(() => {
        const fetchAuctions = async () => {
            console.log("async");
            const response = await axios.get('/api/auctions/search',
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                    params: {
                        category: "Art"
                    }
                });
            console.log(response);
            console.log(response?.data?.Auctions);
            setAuctionsArray(response?.data?.Auctions);
        };
        fetchAuctions();
    },[]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = auctionsArray.slice(indexOfFirstPost, indexOfLastPost);
    

    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    function handleSubmit(event) { 
        event.preventDefault()
        console.log("handleSubmit")
        console.log(filters);
        const fetchAuctions = async () => {
            const response = await axios.get('/api/auctions/search',
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                    params: {
                        category: category,
                        location: filters.location,
                        currently:filters.price
                        
                    }
                });
            console.log(response);
            console.log(response?.data?.Auctions);
            setAuctionsArray(response?.data?.Auctions);
        };
        fetchAuctions();
    }

    return (
        <>
             <section className="auctions-body">
                    <h1 className="auctions_body-main-header">Explore all available auctions</h1>
                    { /* Categories*/}
                    <ul className=" auction_body-ul">
                    
                        <li>
                            <Link className="auctions-link" to="#" onClick={event => submitCategory(event, "Art")}>Art</Link>
                        </li>
                        
                        <li>
                            <Link  className="auctions-link" to="#" onClick={event=>submitCategory(event,"Technology")}>Technology</Link>
                        </li>       
                    
                        <li>
                            <Link  className="auctions-link" to="#" onClick={event=>submitCategory(event,"Mobile")}>Mobile</Link>
                        </li>
                        
                        <li>
                            <Link  className="auctions-link" to="#" onClick={event=>submitCategory(event,"Gaming")}>Gaming</Link>
                        </li>

                        <li>
                            <Link  className="auctions-link" to="#" onClick={event=>submitCategory(event,"Sports")}>Sports</Link>
                        </li>

                        <li>
                            <Link className="auctions-link" to="#"  onClick={event=>showRecommended(event,"suggested")}>Suggested</Link>
                        </li>

                    </ul>
                    { /* ruler */}
                    <hr className="style1"></hr>

                    <div className="container-fluid mx-2">
                        <div className="row mt-5 mx-2">
                            <div  className="col-md-3 mr-5">{ /* filter section */}
                                
                                <li className="auctions-li">
                                    <input 
                                        type="text" 
                                        placeholder="Location"
                                        className="auctions-input"
                                        name="location"
                                        onChange={handleChange}
                                        value={filters.location}
                                    />    
                                </li>
                                    
                                <li className="auctions-li">
                                    <input 
                                        type="number" 
                                        placeholder="Max Price"
                                        className="auctions-input"
                                        name="price"
                                        onChange={handleChange}
                                        value={filters.price}
                                    />    
                                </li>
                                
                                <li className="auctions-li">
                                    <button type="submit" className="auction_body-btn" onClick={handleSubmit} >search</button>
                                </li>
                                
                                <li className="auctions-li">
                                    <Pagination postsPerPage={postsPerPage} totalPosts={auctionsArray.length} paginate={ paginate} />
                                </li>                            
                            
                            </div>

                            <div className="col-md-9">{ /* card section */}
                                <div className="row">
                                    { /* card implementation */}
                                    <Auctions AuctionsArray={currentPosts} />
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </>
       
    );
 }