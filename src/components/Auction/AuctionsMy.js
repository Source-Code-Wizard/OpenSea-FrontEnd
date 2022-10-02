import React from "react";
import MyAuctionSmallCard from "./MyAuctionSmallCard";



const AuctionsMy = ({ AuctionsArray }) => {

    const cards = AuctionsArray.map(eachAuction => {
        return (
            <>
                <div className="col-md-3 mb-4">
                    <MyAuctionSmallCard
                        props={eachAuction}
                    />
                </div>
            </>)
    })
    return (
        <>
            {cards}
        </>
    )
};

export default AuctionsMy;