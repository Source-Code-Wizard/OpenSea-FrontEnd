import React from "react";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import useAuth from "../Authentication/useAuth";
import "./Navbar.css"
import axios from "../../api/axios";




export default function Navbar() {
    const { setAuth } = useAuth();
    const navigateTo = useNavigate();
    const location = useLocation();
    
    const logout = async () => { 
        setAuth({})
        localStorage.clear();
        setIsUserLoggedIn(false);
        setIsAdmin(false);
    }
    
    React.useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setIsUserLoggedIn(true);
            
            const foundUser = JSON.parse(loggedInUser);
            
            console.log(foundUser);
            const roles = foundUser?.roles;
            let foundAdmin = false;
            roles.map(eachRole => { 
                if (eachRole === 'ADMIN') {
                    foundAdmin = true;
                }
            })
            if (foundAdmin)
                setIsAdmin(true);
        } 
    }, []);

    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [description, setDescription] = React.useState();

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setDescription(value);
        console.log(value);
    }

    function sendRequest(event) {
        event.preventDefault();
        axios.get('/api/auctions/search',
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                params: {
                   description:description 
                }
            })
        .then(function (response) {
            console.log(response.data.Auctions[0].itemId);
            const auctionId = response.data.Auctions[0].itemId;
            navigateTo(`/OpenSea/Auctions/${auctionId}`)
        })
        .catch(function (error) {
          console.log(error);
        });
     }

    return (
     
             <div className="navbar">
                <input
                        id="chkbox"
                        type="checkbox"
                        name="joinedOpenSea"

                    />
            <div className="logo">
                <h1>
                    OpenSea
                </h1>
            </div>

            <div className="search-box">
                <form action="">
                    
                    <input
                        id="search"
                        type="text"
                        name="search"
                        placeholder="Search"
                        onChange={handleChange}
                        value={description}
                    />

                    <button type="submit" onClick={sendRequest}>
                            
                    </button>
                </form>
            </div>
            <ul>
                <li>
                    <Link className="nav-link" to="/OpenSea" state={{ from: location }} >Home</Link>
                </li>
                {!isUserLoggedIn &&
                     <li>
                     <Link  className="nav-link" to="/OpenSea/SignIn" state={{ from: location }}>Sign In</Link>
                 </li>       
                }
    
                {!isUserLoggedIn &&
                    <li>
                        <Link className="nav-link" to="/OpenSea/SignUp" state={{ from: location }}>Sign Up</Link>
                    </li>
                }
                    
                {
                    isUserLoggedIn &&
                    <li>
                        <Link  className="nav-link" to="#" onClick={logout}>logout</Link>
                    </li>
                }
                
                {
                    isUserLoggedIn &&
                    <li>
                        <Link  className="nav-link" to="/OpenSea/MyAuctions" state={{ from: location }} >My auctions</Link>
                    </li>
                }

                {
                    isAdmin &&
                    <li>
                        <Link  className="nav-link" to="/OpenSea/AdminPage" state={{ from: location }}>Requests</Link>
                    </li>
                }
               
            </ul>
        </div>
        
    )
}
