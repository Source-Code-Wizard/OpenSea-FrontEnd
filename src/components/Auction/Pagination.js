import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => { 

    const pageNumbers = [];

    console.log("pagination:");
    console.log(postsPerPage);
    console.log(totalPosts);
    console.log(Math.ceil(totalPosts / postsPerPage));
    const stop = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i<=stop; ++i) { 
        pageNumbers.push(i);
        console.log(i);
    }
    return (
        <div className="pagination-body">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={()=>paginate(number)} href="#" className="page-link">
                            {number}
                        </a>
                    </li>
                 ))}
            </ul>
        </div>
    )
}
export default Pagination