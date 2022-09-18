import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function SignupForm ({signup}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    /** Handle form submission
     * 
     * Calls login function prop and, if successful, redirects back to / homepage
     */

    async function handleSubmit(e){
        e.preventDefault();
        let res = await signup(formData);
        if (res.success){
           console.log("successfully added user")
        } else {
            console.log(res.errors);
        }
    }

    /** Update form data field */
    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}));
    }

    return (
        <div className="SignupForm">
            <Form>
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Sign Up</h2>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Username"
                                      type="text"
                                      name="username"
                                      className="form-control"
                                      value={formData.username}
                                      onChange={handleChange}
                        />
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                                      placeholder="Password"
                                      name="password"
                                      className="form-control"
                                      value={formData.password}
                                      onChange={handleChange} 
                        />

                    </Form.Group>
            
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="Enter First Name"
                                      name="firstName"
                                      type="text"
                                      className="form-control"
                                      value={formData.firstName}
                                      onChange={handleChange}
                        />
                        
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Enter Last Name" 
                                      name="lastName"
                                      className="form-control"
                                      value={formData.lastName}
                                      onChange={handleChange}
                        />
                        
                    </Form.Group>
                    
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" 
                                      placeholder="Enter email"
                                      className="form-control"
                                    //   value={formData.email}
                                      onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                
                    <Button variant="outline-success" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )

}

export default SignupForm;