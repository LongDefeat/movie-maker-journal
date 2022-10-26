const express = require("express");
const router = express.Router();
const axios = require("axios");
const e = require("express");
const { NotFoundError } = require("../expressError");


const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = `9a114ae809d1fc32f0105fcd87afe983`;

/** GET movies with search form --> SearchForm */
router.get('/search', async (req, res, next) => {
    
    const {searchText} = req.query;
    console.log(searchText);
    try{
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params:{
                api_key: API_KEY,
                query: searchText,    
            }
        });
        console.log(response.data);
        return res.send(response.data);
    } catch (err){
        console.log(err);
        return res.send(NotFoundError);
    }

});

/** GET popular movies on mount --> Homepage */

router.get('/popular', async (req, res, next) => {
    try{
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
            params:{
                api_key: API_KEY   
            }
        });
        console.log(response.data);
        return res.send(response.data);
    } catch(err){
        res.send(NotFoundError)
    }
});

/** GET upcoming movie releases on mount --> Homepage */
router.get('/upcoming', async (req, res, next) => {
    try{
        const response = await axios.get(`${BASE_URL}/movie/upcoming`,{
            params:{
                api_key: API_KEY
            }
        });
        return res.send(response.data)
    } catch(err){
        res.send(NotFoundError)
    }
});

/** GET movie details --> MovieDetails */
router.get('/movie/:movie_id', async (req, res, next) => {
    const {movie_id} = req.params;
    console.log(movie_id);

    try {
        const response = await axios.get(`${BASE_URL}/movie/${movie_id}`, {
            params: {
                api_key: API_KEY,
            }
        });
        const providerResponse = await axios.get(`${BASE_URL}/movie/${movie_id}/watch/providers?api_key=${API_KEY}`)
        // console.log(response.data);
        // console.log('provider response: ', providerResponse.data.results.US);
        response.data.providers = providerResponse.data.results.US
        console.log(response.data.providers.rent)
        return res.send(response.data);

    } catch (err){
        console.log(err)
        return res.send(NotFoundError)
    }
});

/** Get watch providers 
 * 
 * /movie/{movie_id}/watch/providers
*/



module.exports = router;