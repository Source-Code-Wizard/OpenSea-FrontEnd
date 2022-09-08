import React from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, Outlet, useNavigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function DisplayUser({ username }) {

    const { id } = useParams();
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        console.log(id);
        const loggedInUser = localStorage.getItem("user");
        let admintoken;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            admintoken = foundUser?.token;
        } 
        console.log(admintoken);
        axios.post(`/api/admin/getFullUser`,
            JSON.stringify({
                username: id
            }),
            {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${admintoken}`},
                withCredentials: true,
            })
        .then(function (response) {
            console.log(response.data.body);    
            setUser(response.data.body);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
   
    return (
        <section className="hello">
            <form className="fullauction-body">
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                            <Card.Title>USER DETAILS</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Username : {user.username } </ListGroup.Item>
                        <ListGroup.Item>Name : { user.name} </ListGroup.Item>
                        <ListGroup.Item>Subname : { user.subname}</ListGroup.Item>
                        <ListGroup.Item>Email : { user.email}</ListGroup.Item>
                        <ListGroup.Item>Country : { user.country }</ListGroup.Item>
                        <ListGroup.Item>Address :{user.address}</ListGroup.Item>
                        <ListGroup.Item>Phone :{ user.phone_number}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <NavLink style={{ textDecoration: 'none' }} to={`/OpenSea/AdminPage`}>
                            <Button variant="primary">Go back</Button>
                        </NavLink>
                    </Card.Body>
                </Card>
            </form >   

        </section>
    )
}