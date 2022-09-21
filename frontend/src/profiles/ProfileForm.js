import React, { useState, useContext } from "react";
import UserDataBaseApi from "../api/UserDatabaseApi";
// import UserContext from "../auth/UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navigation from "../routes-nav/Navigation";
import "./ProfileForm.css"

function ProfileForm(){
    // const {currentUser, setCurrentUser} = useContext(UserContext)
    // const [formData, setFormData] = useState({
    //     firstName: currentUser.firstName,
    //     lastName: currentUser.lastName,
    //     email: currentUser.email,
    //     username: currentUser.username,
    //     password: "",
    // });
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4 ProfileForm">
            <h3>Profile</h3>
            <Navigation />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="" />
                </Form.Group> */}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ProfileForm;