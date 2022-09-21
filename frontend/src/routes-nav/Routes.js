import React from "react";
import {Routes, Route} from "react-router-dom";
import Homepage from "../homepage/Homepage";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import Navigation from "../routes-nav/Routes";
import LoginForm from "../auth/LoginForm";


/** Site-wide routes.
 * 
 * Parts of site are visitable when logged in.
 * Those routes are wrapped by <PrivateRoute>, which is an authorization component.
 * 
 * Visiting a non-existant route redirects to homepage.
 */

function RoutesFunc(){


    return (
        <div>
                <Routes>
                    
                    <Route path="/" element={<Homepage/>} />

                    <Route path="/profile" element={<ProfileForm/>} />

                    <Route path="/login" element={<LoginForm/>} />

                    <Route path="/signup" element={<SignupForm/>} />

                </Routes>
        </div>
    )
}

export default RoutesFunc;
