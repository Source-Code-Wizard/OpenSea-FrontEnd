import React from "react"
import axios from "../api/axios";
import useAuth from "./Authentication/useAuth";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './signIn.css';


export default function SignUp() {
    const [signInForm, setSignInForm] = React.useState({
        username: "",
        password: ""
    })

   
    const navigateTo = useNavigate();
    const { setAuth } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/OpenSea";
    const [serverResponse, setServerResponse] = React.useState("");
    const [error, setError] = React.useState("");

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setSignInForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        const username = signInForm.username;
        console.log(signInForm);
        axios.post('/api/users/login', JSON.stringify(signInForm),
            {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            
          })
          .then(function (response) {
              console.log(response);
              console.log(response.data.roles)

              const token = response?.data?.token;
              const roles = response?.data?.roles;
              const userEmail = response?.data.email;
              let foundAdmin = false;
              
              setAuth({ username, userEmail, roles, token });
              localStorage.setItem('user', JSON.stringify(response.data));
              let auctionHistory = [];
              localStorage.setItem('userHistory', JSON.stringify(auctionHistory));
              roles.map(eachRole => { 
                  if (eachRole === 'ADMIN') {
                      foundAdmin = true;
                  }
              })
              if(foundAdmin)
                  navigateTo("/OpenSea/AdminPage");
              else
                navigateTo(from, {replace:true});
          })
          .catch(function (error) {
              console.log(error);
              console.log(error.response.data);
              setServerResponse(error.response.data);
          });
          
    }

    React.useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        //console.log(loggedInUser);
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);

            console.log(foundUser);
            
            const roles = foundUser?.roles;
            const token = foundUser?.token;
            const userEmail = foundUser?.email;
            const username = foundUser?.username;
            
            setAuth({ username, userEmail, roles, token });
            navigateTo(from, {replace:true});
        } 
    }, []);
    
    return (
        <div className="signin-form">
            
             <form  onSubmit={handleSubmit}>
             <h1 className="signInHeader">Sign In</h1>
                
                <div className="txt_field">
                    <input 
                        type="text" 
                        placeholder="Username"
                        className="form-control"
                        name="username"
                        onChange={handleChange}
                        value={signInForm.username}
                    />    
                </div>
            
                <div className="txt_field">
                    <input 
                        type="password" 
                        placeholder="Password"
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                        value={signInForm.password}
                    />    
                </div>
            
                <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
                </div>
                {(serverResponse !== "") ? (<label>{serverResponse}</label>) : ("")}
                <footer>
                    <label> Not registerd yet? <a href="https://localhost:3000/OpenSea/SignUp">Sign Up</a></label>
                </footer>
    
            </form>    
        </div>
    )
}