import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserDataBaseApi from "../api/UserDatabaseApi";
import UserContext from "../auth/UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navigation from "../routes-nav/Navigation";
import "./ProfileForm.css"

function ProfileForm(){
    // const {currentUser, setCurrentUser} = useContext(UserContext)
    // const [formData, setFormData] = useState({
    //     username: currentUser.username,
    //     password: "",
    // });
    // const [formErrors, setFormErrors] = useState([]);

    // const [saveConfirmed, setSaveConfirmed] = useState(false);

    const navigate = useNavigate();
    const [updateProfileFormData, setUpdateProfileFormData] = useState({
        username: "",
        password: "",
    });

    /** Handles form submission */
    async function handleSubmit(e){
        let res = await UserDataBaseApi.profile(updateProfileFormData);
        if (res.success){
            navigate("/")
        } else {
            console.log(res.errors)
        }
    }

    /** Update form data field */
    function handleChange(e){
        const {name, value} = e.target;
        setUpdateProfileFormData(data => ({...data, [name]: value}));
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4 ProfileForm">
            <h3>Profile</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Change Username</Form.Label>
                    <Form.Control type="text" 
                                  placeholder="Enter New Username"
                                  name="username"
                                  className="form-control"
                                  value={updateProfileFormData.username} 
                                  onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your information with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Change Password</Form.Label>
                    <Form.Control type="password" 
                                  placeholder="Password"
                                  name="password"
                                  className="form-control"
                                  value={updateProfileFormData.password}
                                  onChange={handleChange} 
                    />
                </Form.Group>

                <Button variant="outline-success" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ProfileForm;