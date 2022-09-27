import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LoginForm.css"


function LoginForm({login}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    async function handleSubmit(e){
        e.preventDefault();
        let res = await login(formData);
        if (res.success){
           console.log("successfully logged in as user");
           navigate('/');
        } else {
            console.log(res.errors);
        }
    }

    /** Updates form data field */
    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }

    return (
        <div className="LoginForm">
            <Form className="form-login">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="form-title">Log In</h2>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label classname="label">Username</Form.Label>
                        <Form.Control placeholder="Username"
                                      type="text"
                                      name="username"
                                      className="form-control"
                                      value={formData.username}
                                      onChange={handleChange}
                                      autoComplete="username"
                                      required
                        />
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="label">Password</Form.Label>
                        <Form.Control type="password" 
                                      placeholder="Password"
                                      name="password"
                                      className="form-control"
                                      value={formData.password}
                                      onChange={handleChange}
                                      autoComplete="current-password"
                                      required 
                        />

                    </Form.Group>
                
                    <Button variant="outline-success" className="btn" type="submit" onClick={handleSubmit}>
                        Log In
                    </Button>
                </div>
            </Form>
        </div>
    ) 
}

export default LoginForm;