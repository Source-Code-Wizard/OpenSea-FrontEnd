import React,{ useState} from "react";
import MessageCard from "./MessageCard";

const Messages = ({ MessageArray ,refreshFunction}) => {

    const cards = MessageArray.map(eachMessage => {
        return (
            <>
                <div className="col-md-3 mb-4">
                    <MessageCard
                        eachMessage={eachMessage}
                        refreshFunction={ refreshFunction}
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