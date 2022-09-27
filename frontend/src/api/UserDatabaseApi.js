import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class UserDatabaseApi {
    // token for interactions with the User Database
    static token;

    static async request(endpoint, data = {}, method='get'){
        console.debug("User API Call: ", endpoint, data, method);
        const url = `${BASE_URL}${endpoint}`;
        const headers = {};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (err){
            console.log(data);
            console.error("API Error: ", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get current user. */

    static async getCurrentUser(username){
        let res = await this.request(`/users/${username}`);
        console.log("getCurrentUser ", res.user);
        return res.user;
    }

    /** Rate a movie. */

    static async rateMovie(movie_id){
        let res = await this.post(`/movie/${movie_id}/rating`);
        return res.movie_id;
    }

    /** Delete movie rating. */
    
    static async deleteMovieRating(movie_id){
        let res = await this.delete(`/movie/${movie_id}/rating`)
        return res.movie_id;
    } 

    /** Get token for login from username, password */
    static async login(data) {
        console.log("user database api", data);
        let res = await this.request(`/auth/token`, data, "post");
        return res.token;
    }

    /** Signup for site. */
    static async signup(data) {
        let res = await this.request(`/auth/register`, data, "post");
        return res.token;
    }
}

export default UserDatabaseApi;