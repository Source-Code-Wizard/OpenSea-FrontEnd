import React from "react";
import AuctionSmallCard from "./AuctionSmallCard";



const Auctions = ({ AuctionsArray }) => {

    const cards = AuctionsArray.map(eachAuction => {
        return (
            <>
                <div className="col-md-3 mb-4">
                    <AuctionSmallCard
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

export default Auctions;