import React from "react";
import './hero.css';
import { Link } from "react-router-dom";

export default function Hero() {
 
    return (
        <div className="hero_body">
            <h1 className="hero_header-content"> Discover, inspect, and create auctions </h1>
            <p className="hero_header-p">OpenSea is the world's first and largest auction site</p>
            
            <div className="hero-buttons">
                
                <Link style={{ textDecoration: 'none' }} to="/OpenSea/CreateAuction">
                    <button type="submit" className="create-btn">Create</button>
                </Link>
                
                <Link style={{ textDecoration: 'none' }} to="/OpenSea/Auctions">
                    <button type="submit" className="explore-btn">Explore</button>
                </Link>

            </div>
        </div>
    )
}
 

