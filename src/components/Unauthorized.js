import React from "react";
import { Link, Outlet, useNavigate} from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <div className="signup-form">
            <h1>Unauthorized content</h1>
            <div className="form-group">
                <button onClick={goBack} class="btn btn-primary btn-lg">Go Back</button>
            </div>
        </div>
    )
}
