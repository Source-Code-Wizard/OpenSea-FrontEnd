import React from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import useAuth from "../Authentication/useAuth";
import { Link, Outlet, useNavigate, useLocation} from 'react-router-dom';
import "./newmessage.css"


export default function NewMessage(){

    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState();
    const axiosPrivate = useAxiosPrivate();
    const [MessageSentMsg, setMessageSentMsg] = React.useState("");
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const navigateTo = useNavigate();
    const from = location.state?.from?.pathname || "/OpenSea/MessagingStartPage";



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
            axios.get(`/api/users/getUserId/${userName}`,
            {
                headers: { "Content-Type": "application/json"},
                withCredentials: true,
            })
            .then(function (response) {
                console.log(response.data);
                setFormData(prevFormData => ({...prevFormData,["senderUsername"]:userName}))
            })
            .catch(function (error) {
                console.log(error);
                
            });
        } 
    }, []);


    function handleChange(event) {
        
        const { name, value, type, checked } = event.target
        console.log(event.target.name)
        // console.log(event.target.checked)
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const [formData, setFormData] = React.useState({
        receiverUsername:"",
        message:""
    })

    const [error, setError] = React.useState("");
    
    const [serverResponse, setServerResponse] = React.useState("");

    const logout = async () => { 
        setAuth({})
        localStorage.clear();
    }

    const [data, setData] = React.useState("");


    function handleSubmit(event) {
        event.preventDefault()

        if(formData.receiverUsername === ""){
            setError("You can't continue without a receiver name");
            return
        }

        let receiver = formData.receiverUsername;
        axios.get(`/api/users/getUserId/${receiver}`,
        {
            headers: { "Content-Type": "application/json"},
            withCredentials: true,
        })
        .then(function (response) {
            console.log(response.data);
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
            setError("There is no such user")
            return
        });

        // if(error === "There is no such user"){
        //     return
        // }
        // console.log(data)
        // if(data === ""){
        //     return
        // }
        
        setError("")

        const loggedInUser = localStorage.getItem("user");

        setIsUserLoggedIn(true);
            
        const foundUser = JSON.parse(loggedInUser);
        
        console.log(foundUser);
        let userName = foundUser.username
        let admintoken = foundUser?.token;
        console.log(admintoken)
        console.log(userName);

        axiosPrivate.post(`/api/messages/message`, JSON.stringify(formData),
        {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${admintoken}`},
            withCredentials: true,
        })
        .then(function (response) {
            console.log(response);
            setMessageSentMsg("Message was sent!");
        })
        .catch(function (error) {
            console.log(error);
            if (error.response.status === 403) { 
                logout();
                navigate('/OpenSea/SignIn', { state: { from: location }, replace: true });
            }
        });

    }

    return(
        <div className="newmessage-form">
            <form onSubmit={handleSubmit}>
            
            <hi className="newMessageHeader">New Message</hi>

            <div className="txt_field">
                <input 
                    type="text" 
                    placeholder="Receiver"
                    className="form-control"
                    name="receiverUsername"
                    onChange={handleChange}
                    value={formData.receiverUsername}
                />    
            </div>

            <div className="txt_field">
                <input 
                    type="text" 
                    placeholder="Text"
                    className="form-control"
                    name="message"
                    onChange={handleChange}
                    value={formData.message}
                />    
            </div>

            <div className="form-group">
                <button type="submit" class="btn btn-primary btn-lg">Send</button>

            </div>

            <div className="form-group">
                <button type="submit" className="back_button" onClick={() => { navigateTo(from) }}>go back</button>

            </div>

            {(error !== "") ? (<label>{error}</label>) : (<label>{MessageSentMsg}</label>)}
                {(serverResponse !== "") ? (<label>{serverResponse}</label>) : ("")}
                {/* {(MessageSentMsg !== "") ? (<label>{MessageSentMsg}</label>) : ("")} */}
            </form>
        
        </div>
    )
}