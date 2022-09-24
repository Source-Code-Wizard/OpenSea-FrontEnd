import React from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './fullauction.css'
import { Link, Outlet, useNavigateLink, useNavigate, useLocation} from 'react-router-dom';
import BidTable from "./BidTable";
import exportFromJSON from "export-from-json";
import useAuth from "../Authentication/useAuth";
import Redirect from "../ExpRefTokenHandler/Redirect";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";




export default function FullAuction() { 

    const { id } = useParams();
    const [auction, setAuction] = React.useState({});
    const [categories, setCategories] = React.useState([]);
    const [bid, setBid] = React.useState();
    const [bidList, setBidList] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState();
    const [bidConfirmation, setBConfirmation] = React.useState(false);
    const [visibleBidButton, setVisibleBidButton] = React.useState(true);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [serverResponse, setServerResponse] = React.useState("");
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();
    const [latitude, setLatitude] = React.useState(0);
    const [longtitude, setLongtitude] = React.useState(0);
   

    //const from = "/OpenSea/Auctions";
    const from = location.state.from?.pathname || "/OpenSea/Auctions";

    
    React.useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setIsUserLoggedIn(true);
            
            const foundUser = JSON.parse(loggedInUser);
            
            console.log(foundUser);
            const roles = foundUser?.roles;
            let foundAdmin = false;
            roles.map(eachRole => { 
                if (eachRole === 'ADMIN') {
                    foundAdmin = true;
                }
            })
            if (foundAdmin)
                setIsAdmin(true);
        } 

        axios.get(`/api/auctions/getAuction/${id}`,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then(function (response) {
                console.log(response.data);
                console.log("h33");
                setAuction(response.data);
                setCategories(response.data.categories);
                const bidArray = response.data.bidList;
                const bidArraySorted = [...bidArray].sort((a, b) => b.moneyAmount - a.moneyAmount);
                setBidList(bidArraySorted);
                setMarkerPos({
                    lat: response.data.latitude,
                    lng: response.data.longtitude
                })
                if(response.data.latitude!==null && response.data.longtitude!==null)
                    setPosition([response.data.latitude,response.data.longtitude])
        })
        .catch(function (error) {
            console.log(error);
            
        });
    }, [count]);
    
    
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setBid(value);
        setServerResponse("");  
        console.log(value);
    }



    const ExportToXML = e => {
        e.preventDefault()
        const data = auction;  //dataForXml
        const fileName = "exported";
        let fields = [];  //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
        const exportType = 'xml';
        exportFromJSON({data, fileName, fields, exportType})
    }
    
    const exportToJson = e => {
        e.preventDefault()
        downloadFile({
          data: JSON.stringify(auction),
          fileName: 'auction.json',
          fileType: 'text/json',
        })
    }
    
    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    
    function ConfirmBid(event) { 
        event.preventDefault();
        setVisibleBidButton(false);
        setBConfirmation(true);
    }

    const logout = async () => { 
        setAuth({})
        localStorage.clear();
    }
   
    function PlaceBid(event) { 
        event.preventDefault();
        
        var today = new Date();

            const date = today.getFullYear()
                + '-'
                + ((today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1))
                + '-'
                + ((today.getDate() >= 10) ? today.getDate() : '0'+today.getDate())
                + 'T'
                + ((today.getHours()>=10 ) ? today.getHours() : '0'+today.getHours())
                + ':'
                + ((today.getMinutes()>=10) ? today.getMinutes():'0'+today.getMinutes())
                + ':'
                + ((today.getSeconds()>=10) ? today.getSeconds():'0'+today.getSeconds());
      
        console.log(date);
        
      
      
        const loggedInUser = localStorage.getItem("user");
        //console.log(loggedInUser);
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);

            console.log(foundUser);
            const username = foundUser?.username;
            const token = foundUser?.token;

            console.log(token);
            
            axiosPrivate.post('/api/bid', JSON.stringify(
                {
                    "username": username,
                    "bidSubmittedTime": date ,
                    "auctionId": auction.itemId,
                    "moneyOffered": bid
                }),
                {
                    headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
                    withCredentials: true,
                })
            .then(function (response) {
                if (response.data.statusCodeValue === 400) { 
                    setServerResponse(response.data.body);
                    setVisibleBidButton(true);
                    setBConfirmation(false);
                }
                else {
                    console.log(response);
                    setBid("");
                    setServerResponse("");    
                    setVisibleBidButton(true);
                    setBConfirmation(false);
                    setCount(count + 1);
                }
            }).catch(function (error) {
                console.log(error); 
                if (error.response.status === 403) { 
                    logout();
                    navigate('/OpenSea/SignIn', { state: { from: location }, replace: true });
                }     
            });
        } 

    }

    let categoriesString = "";
    let numOfCategories = 0;
    categories?.map(eachAuction => {
        numOfCategories++;
        if (numOfCategories === 1)
            categoriesString += eachAuction.caterogoryName;
        else
            categoriesString +=" , "+eachAuction.caterogoryName;
    })

    const [markerPos, setMarkerPos] = React.useState([{
        lat: 0,
        lng: 0
    }])

    const markerRef = React.useRef();

    const [position, setPosition] = React.useState([])


    return (
        <section className="hello">
            <form className="fullauction-body">
                <Card style={{ width: '25rem' }}>
                        <Card.Body>
                            <Card.Title>{ auction.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>buy price : { auction.buyPrice} $</ListGroup.Item>
                            <ListGroup.Item>first Bid : { auction.firstBid} $</ListGroup.Item>
                            <ListGroup.Item>Number of bids : {auction.numOfBids}</ListGroup.Item>
                            <ListGroup.Item>Location : {auction.location}</ListGroup.Item>
                            <ListGroup.Item>Auction Started Time : {auction.auctionStartedTime}</ListGroup.Item>
                            <ListGroup.Item>Auction End Time : {auction.auctionEndTime}</ListGroup.Item>
                            <ListGroup.Item>Currently : {auction.currently} $</ListGroup.Item>
                        <ListGroup.Item>Categories : {categoriesString} </ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                        <Card.Title>Description</Card.Title>
                            <Card.Text>
                                { auction.description}
                        </Card.Text>
                        
                        {   (position.length!==0) &&
                             <div className='full_auction_map'>
                             <link
                                 rel="stylesheet"
                                 href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                                 integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                                 crossOrigin=""
                             />
                             <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                                 <TileLayer
                                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                 />
                                 <Marker
                                     position={[markerPos.lat, markerPos.lng]}
                                 />
                             </MapContainer>
                         </div> 
 
                        }
                       


                        {isUserLoggedIn &&
                            <input type="text"
                            placeholder="Place bid"
                            className="auctions-input"
                            name="bid"
                            onChange={handleChange}
                            value={bid}
                            />}
                        
                            {isUserLoggedIn && visibleBidButton &&
                                <button className="full_auction_body-btn" variant="primary" onClick={ConfirmBid}>Place bid</button>
                            }
                        
                        {isUserLoggedIn && bidConfirmation &&
                                <button className="full_auction_body-btn" variant="primary" onClick={PlaceBid}>Confirm bid</button>
                        }

                        <button className="full_auction_body-btn" variant="primary" onClick={() => { navigate(from) }}>go back</button>
                        {isAdmin &&
                            <button className="full_auction_body-btn" variant="primary" onClick={ExportToXML}>Export as XML</button>
                        }
                        {isAdmin &&
                            <button className="full_auction_body-btn" variant="primary" onClick={exportToJson}>Export as JSON</button>
                        }
                        
                    </Card.Body>
                    {(serverResponse !== "") ? (<label>{serverResponse}</label>) : ("")}
                </Card>
            </form >   
            <div className="bidTable">
                <BidTable className="table" bidList={bidList}/>
            </div>

        </section>
    )
}; 