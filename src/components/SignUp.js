import React from "react"
import axios from "../api/axios";
import "./myCss.css";


export default function SignUp() { 
    const [formData, setFormData] = React.useState({
        username:"",
        email: "",
        name: "",
        subname: "",
        address:"",
        password: "",
        passwordConfirm: "",
        phone_number: "",
        afm: "",
        country:"",
        joinedOpenSea: false
    })

    const [error, setError] = React.useState("");
    
    const [serverResponse, setServerResponse] = React.useState("");

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        console.log(event.target.name)
        console.log(event.target.checked)
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        if (!formData.joinedOpenSea) { 
            setError("Click the checkbox, if you want to continue");
            return
        }
        if (formData.password !== formData.passwordConfirm) { 
            if (formData.password === "") {
                setError("You cant sign up without a password!")
                return
             }
            console.log(formData.password)
            console.log(formData.passwordConfirm)
            setError("PASSWORDS DO NOT MATCH!");
            return
        }
        setError("")
        axios.post('/api/users/signup', JSON.stringify(formData),
            {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then(function (response) {
              console.log(response);
              setServerResponse(response.data.body);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        
            <div className="signup-form">
                <form  onSubmit={handleSubmit}>
            
                <h1 className="signInHeader">Sign Up</h1>
                
                    <div className="txt_field">
                        <input 
                            type="text" 
                            placeholder="Username"
                            className="form-control"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                        />    
                    </div>
                
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
                
                    <div className="txt_field">
                        <input 
                            type="text" 
                            placeholder="Subname"
                            className="form-control"
                            name="subname"
                            onChange={handleChange}
                            value={formData.subname}
                        />    
                    </div>
                
                    <div className="txt_field">
                        <input 
                            type="text" 
                            placeholder="Country"
                            className="form-control"
                            name="country"
                            onChange={handleChange}
                            value={formData.country}
                        />    
                    </div>
                
                    <div className="txt_field">
                        <input 
                            type="text" 
                            placeholder="Address"
                            className="form-control"
                            name="address"
                            onChange={handleChange}
                            value={formData.address}
                        />    
                    </div>
                    
                    <div className="txt_field">
                        <input 
                            type="email" 
                            placeholder="Email address"
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                    />    
                    </div>

                    <div className="txt_field">
                        <input 
                            type="number" 
                            placeholder="Phone number"
                            className="form-control"
                            name="phone_number"
                            onChange={handleChange}
                            value={formData.phone_number}
                        />    
                    </div>
                
                    <div className="txt_field">
                        <input 
                            type="text" 
                            placeholder="AFM"
                            //className="form-control"
                            name="afm"
                            onChange={handleChange}
                            value={formData.afm}
                    />    
                    </div>

                    <div className="txt_field">
                        <input 
                            type="password" 
                            placeholder="Password"
                            //className="form-control"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                    />
                    </div>
                
                    <div className="txt_field">
                        <input 
                            type="password" 
                            placeholder="Confirm password"
                            className="form-control"
                            name="passwordConfirm"
                            onChange={handleChange}
                            value={formData.passwordConfirm}
                        />    
                    </div>
                    
                    <div className="form-group">
                        <label className="form-check-label">
                        <input
                            id="okayToEmail"
                            type="checkbox"
                            name="joinedOpenSea"
                            onChange={handleChange}
                            defaultChecked={false}
                            checked={formData.joinedNewsletter}
                        />
                            I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
                        </label>
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
                    </div>
                
                {(error !== "") ? (<label>{error}</label>) : ("")}
                {(serverResponse !== "") ? (<label>{serverResponse}</label>) : ("")}
                <footer>
                    <label> Already a user? <a href="https://localhost:3000/OpenSea/SignIn">Sign In</a></label>
                </footer>
    
                </form>
            </div>
    )
}
