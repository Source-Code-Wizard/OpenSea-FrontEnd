import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./MessagingStartPage.css"
// import { Link, useNavigate, useLocation } from "react-router-dom";


export default function MessagingStartPage() {

    const location = useLocation();
    const navigateTo = useNavigate();
    const from = location.state?.from?.pathname || "/OpenSea";

    return(
        <div className="messaging_body">
            <h1 className="message_header-content"> Messages </h1>
            <div className="message-buttons">
                
                <Link style={{ textDecoration: 'none' }} to="/OpenSea/Inbox">
                    <button type="submit" className="inbox-btn">Inbox</button>
                </Link>
                
                <Link style={{ textDecoration: 'none' }} to="/OpenSea/Outbox">
                    <button type="submit" className="outbox-btn">Outbox</button>
                </Link>

                <Link style={{ textDecoration: 'none' }} to="/OpenSea/NewMessage">
                    <button type="submit" className="newmessage-btn">New Message</button>
                </Link>

            </div>
            <button type="submit" className="home_button" onClick={() => { navigateTo(from) }}>go home</button>

        </div>
    )
}