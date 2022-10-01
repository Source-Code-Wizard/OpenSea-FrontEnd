import React,{ useState} from "react";
import MessageCard from "./MessageCard";

const Messages = ({ MessageArray }) => {

    const cards = MessageArray.map(eachMessage => {
        return (
            <>
                <div className="col-md-3 mb-4">
                    <MessageCard
                        props={eachMessage}
                    />
                </div>
            </>)
    })
    console.log(cards);

    return (
        <>
            {cards}
        </>
    )
};

export default Messages;