import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import UserContext from "../auth/UserContext";
import UserDatabaseApi from "../api/UserDatabaseApi";


function JournalForm({movieId, userId, closeModal}){
    const [journalFormData, setJournalFormData] = useState({
        comment: "",
        movie_id: movieId,
        user_id: userId,
    });

    // Need to change
    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setJournalFormData(data => ({...data, [name]: value}));
    }

    async function handleSubmit(e){
        let res = await UserDatabaseApi.journalMovieReview(userId, journalFormData);
        if (res.success){
            // need to change
           navigate("/")
        } else {
            console.log(res.errors);
        }
    }

    console.log(journalFormData);
    return (
        <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Journal Entry</Form.Label>
                    <Form.Control name="comment"
                                  value={journalFormData.comment}
                                  onChange={handleChange} 
                                  as="textarea" rows={5} 
                                  placeholder="What did you think of the movie?" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => 
                    {handleSubmit();
                    closeModal()}
                    }>
                    Submit
                </Button>
        </Form>
    )
}

export default JournalForm;