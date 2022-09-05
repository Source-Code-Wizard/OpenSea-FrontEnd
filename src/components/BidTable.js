import React from "react";
import Table from 'react-bootstrap/Table';
import './fullauction.css'

export default function BidTable({ bidList }) {
    return (
        <Table className="table" striped>
        <thead>
            <tr>
                <th>Username</th>
                <th>Offer</th>
                <th>Time</th>
                <th>Country</th>
                <th>Location</th>
                <th>Rating</th>
            </tr>
        </thead>
        <tbody>
                {bidList.map(eachBid => { 
                    return (
                        <>
                            <tr>
                                <td>{eachBid.bidderUsername}</td>
                                <td>{eachBid.moneyAmount}</td>
                                <td>{eachBid.localBidDateTime}</td>
                                <td>{eachBid.bidder.bidderCountry}</td>
                                <td>{eachBid.bidder.bidderAddress}</td>
                                <td>{eachBid.bidder.rating}</td>
                            </tr>
                        </>
                    )
                })}        
        </tbody>
    </Table>
    )
 }