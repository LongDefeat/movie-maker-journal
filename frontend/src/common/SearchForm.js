import React, {useState} from "react";

function SearchForm({search}){
    const [searchTerm, setSearchTerm] = useState([]);

    function handleSubmit(e){
        e.preventDefault();
        console.log(e.target.value)
        search(searchTerm || undefined)
        setSearchTerm(searchTerm);
    }

    function handleChange(e){
        console.log(e.target.value)
        setSearchTerm(e.target.value);
    }

    
    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                className="form-control flex-grow-1"
                placeholder="Enter Movie"
                value={searchTerm}
                onChange={handleChange}>
                </input>
                <button type="submit" className="btn btn-primary">Search Movie</button>
            </form>
        </div>
    )
}

export default SearchForm;