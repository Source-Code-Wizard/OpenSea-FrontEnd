import React from "react";
import axios from "../../api/axios";
import "./createAuction.css";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { Link, Outlet, useNavigate, useLocation} from 'react-router-dom';
import useAuth from "../Authentication/useAuth";

let newList = [];

export default function CreateAuction() {

    const [count, setCount] = React.useState(0);
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState();
    const axiosPrivate = useAxiosPrivate();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();


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
                setFormData(prevFormData => ({...prevFormData,["seller_id"]:response.data}))
            })
            .catch(function (error) {
                console.log(error);
                
            });
            // const roles = foundUser?.roles;
            // let foundAdmin = false;
            // roles.map(eachRole => { 
            //     if (eachRole === 'ADMIN') {
            //         foundAdmin = true;
            //     }
            // })
            // if (foundAdmin)
            //     setIsAdmin(true);
        } 
    }, []);

    const [listOfCategories, setCategories] = React.useState([]);

    function handleChange(event) {
        
        const { name, value, type, checked } = event.target
       
        console.log(event.target.name)
        // console.log(event.target.checked)
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))

        if(type === "checkbox" && checked == true){
            newList.push(event.target.name)
            console.log(newList)
            setCategories(newList)
        }
    }

    const [formData, setFormData] = React.useState({
        name:"",
        // listOfCategories:listOfCategories,
        location:"",
        auctionEndTime:"",
        buyPrice:"",
        description:"",
        Currently:"0",
        seller_id:"",
        numOfBids:"0",
        firstBid:"0",
        Gaming: false,
        Art: false,
        Technology: false,
        Mobile: false,
        Sports: false,
        Suggested: false
        // started: Date.now(),
        // joinedOpenSea: false
    })

    React.useEffect(() => {
        console.log(formData);
    },[formData])

    const [error, setError] = React.useState("");
    
    const [serverResponse, setServerResponse] = React.useState("");

    // const logout = async () => { 
    //     setAuth({})
    //     localStorage.clear();
    // }



    function handleSubmit(event) {
        event.preventDefault()
        if(formData.name === ""){
            setError("You can't continue without a name");
            return
        }
        formData.listOfCategories = listOfCategories

        setError("")

        const loggedInUser = localStorage.getItem("user");

        setIsUserLoggedIn(true);
            
        const foundUser = JSON.parse(loggedInUser);
        
        console.log(foundUser);
        let userName = foundUser.username
        let admintoken = foundUser?.token;
        console.log(admintoken)
        console.log(userName);

        axios.post(`/api/auctions`, JSON.stringify(formData),
        {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${admintoken}`},
            withCredentials: true,
            // params: {
            //     username: userName
            // }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            
        });

        // const loggedInUser = localStorage.getItem("user");
        // //console.log(loggedInUser);
        // if (loggedInUser) {
        //     const foundUser = JSON.parse(loggedInUser);

        //     // console.log(foundUser);
        //     const username = foundUser?.username;
        //     const token = foundUser?.token;

        //     console.log(token);
        //     axiosPrivate.post('/api/auctions', JSON.stringify(formData, {
        //         "sellerId": foundUser?.id
        //     }),
        //         {
        //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
        //         withCredentials: true,
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //         setServerResponse(response.data.body);
        //         setCount(count + 1);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         if (error.response.status === 403) { 
        //             logout();
        //             navigate('/OpenSea/SignIn', { state: { from: location }, replace: true });
        //         }
        //     });
        // }
    }

 

    return(
        <div className="createauction-form">
            <form onSubmit={handleSubmit}>
            
            <hi className="AuctionHeader">Create Auction</hi>

            <div className="txt_field">
                <input 
                    type="text" 
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                />    
            </div>

            {/* <div className="txt_field">
                <input 
                    type="text" 
                    placeholder="ListofCategories"
                    className="form-control"
                    name="listOfCategories"
                    onChange={handleChange}
                    value={formData.listOfCategories}
                />    
            </div> */}

            <div className="txt_field">
                <input 
                    type="datetime-local" 
                    placeholder="AuctionEndTime"
                    className="form-control"
                    name="auctionEndTime"
                    onChange={handleChange}
                    value={formData.auctionEndTime}
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                />    
            </div>

            <div className="txt_field">
                <input 
                    type="text" 
                    placeholder="Location"
                    className="form-control"
                    name="location"
                    onChange={handleChange}
                    value={formData.location}
                />    
            </div>

            <div className="txt_field">
                <input 
                    type="text" 
                    placeholder="BuyPrice"
                    className="form-control"
                    name="buyPrice"
                    onChange={handleChange}
                    value={formData.buyPrice}
                />    
            </div>

            <div className="txt_field">
                <input 
                    type="text" 
                    placeholder="Description"
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                />    
            </div>
            <h3 className="h3">Pick your categories</h3>
            <div className="form-group">
                <label className="form-check-label">
                <input
                    id="isGaming"
                    type="checkbox"
                    name="Gaming"
                    onChange={handleChange}
                    defaultChecked={false}
                    checked={formData.Gaming}
                />
                    Gaming
                </label>
            </div>
            <div className="form-group">
                <label className="form-check-label">
                <input
                    id="isArt"
                    type="checkbox"
                    name="Art"
                    onChange={handleChange}
                    defaultChecked={false}
                    checked={formData.Art}
                />
                    Art
                </label>
            </div>
            <div className="form-group">
                <label className="form-check-label">
                <input
                    id="isTechnology"
                    type="checkbox"
                    name="Technology"
                    onChange={handleChange}
                    defaultChecked={false}
                    checked={formData.Technology}
                />
                    Technology
                </label>
            </div>
            <div className="form-group">
                <label className="form-check-label">
                <input
                    id="isMobile"
                    type="checkbox"
                    name="Mobile"
                    onChange={handleChange}
                    defaultChecked={false}
                    checked={formData.Mobile}
                />
                    Mobile
                </label>
            </div>
            <div className="form-group">
                <label className="form-check-label">
                <input
                    id="isSports"
                    type="checkbox"
                    name="Sports"
                    onChange={handleChange}
                    defaultChecked={false}
                    checked={formData.Sports}
                />
                    Sports
                </label>
            </div>

            <div className="form-group">
                <button type="submit" class="btn btn-primary btn-lg">Create</button>
            </div>

            {(error !== "") ? (<label>{error}</label>) : ("")}
                {(serverResponse !== "") ? (<label>{serverResponse}</label>) : ("")}
            </form>
        </div>
    )
}