"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");
  
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const { strictEqual } = require("assert");

/** Related functions for users.
 * 
 * Returns { username, first_name, last_name, email, is_admin }
 * 
 * Throws UnauthorizedError if user is not found or entered a wrong password.
 */

class User {

    static async authenticate(username, password){
        // attempt search for user first
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    password,
                    created_at AS "createdAt"
             FROM public.user
             WHERE username = $1`,
             [username],
        );
        const user = result.rows[0];

        if (user){
            // compare hashed password to new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true){
                // delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data
     * 
     * Returns { username, firstName, lastName, email, isAdmin}
     * 
     * Throws BadRequestError on duplicates
     */

     static async register({ username, password, firstName, lastName, email }) {
            const duplicateCheck = await db.query(
                `SELECT username
                FROM public.user
                WHERE username = $1`,
                [username],
            );        
      
      if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Duplicate username: ${username}`);
      }
  
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  
      const result = await db.query(
            `INSERT INTO public.user
             (username, first_name,last_name, password)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
          [
            username,
            firstName,
            lastName,
            hashedPassword,
          ],
      );
  
      const user = result.rows[0];
  
      return user;
    }

      /** Get a username, return data about user
       * 
       * Throws NotFoundError if user is not found.
       */

    static async get(username){
        console.log("getting user...");
        const userRes = await db.query(
            `SELECT id,
                    username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    password,
                    created_at AS "createdAt"
             FROM public.user
             WHERE username = $1`,
             [username],
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username} found.`)
        
        const userWatchedMovies = await db.query(
            `SELECT w.user_id
            FROM user_watched_movies AS w
            WHERE w.user_id = $1`, [username.user_id]
        );

        user.user_watched_movies = userWatchedMovies.rows.map(w => w.user_id);
        return user;
    }

    /** Update user data with 'data'.
     * 
     * This is a "partial update" -- it's fine if data does not contain each field
     * so only changes are for provided fields.
     * 
     * Data can include: { firstName, lastName, password, isAdmin }
     * 
     * Returns { username, firstName, lastName, email, isAdmin }
     * 
     * Throws NotFoundError if not found.
     * 
     * Warning - this function can set a new password or make a user an admin.
     *  Callers of this function must be absolutely certain they have validated inputs to this
     * or a serious security risk can happen.
     */

    static async update(username, data){
        if (data.password){
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }
        let result = await db.query(`UPDATE public.user
                                     SET username = $1,
                                         password = $2
                                     WHERE username = $3
                                     RETURNING username, password, first_name, last_name, created_at
                                     `,
                                     [data.username, data.password, username]);

        const user = result.rows[0];

        return user;

        // const { setCols, values } = sqlForPartialUpdate(
        //     data, 
        //     {
        //         firstName: "first_name",
        //         lastName: "last_name",
        //         // isAdmin: "is_admin",
        //     }
        // );
        // const usernameVarIdx = "$" + (values.length + 1);

        // const querySql = `UPDATE user
        //                   SET ${setCols}
        //                   WHERE username = ${usernameVarIdx}
        //                   RETURNING username, 
        //                             first_name AS "firstName",
        //                             last_name AS "lastName",
        //                             is_admin AS "isAdmin"`;
        // const result = await db.query(querySql, [...values, username]);
        // const user = result.rows[0];

        // if (!user) throw new NotFoundError(`No user: ${username}`);

        // delete user.password;
        // return user;
    }   

    /** Delete given user from database; returns undefined. */

    static async remove(username) {
        let result = await db.query(
           `DELETE
            FROM user
            WHERE username = $1
            RETURNING username`,
            [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /** Add journal entry  */
    static async addJournalEntry(body, user_id) {
        console.log(body, user_id);
        let result = await db.query(
            `INSERT INTO user_journal
             (user_id, movie_id, comment)
             VALUES ($1, $2, $3)
             RETURNING *`,
             [
                user_id,
                body.movie_id,
                body.comment,
             ],
        )
        const journalEntry = result.rows[0];
        
        return journalEntry;
    }

  /** Get all journal entries for a given user*/
    static async getJournalEntryList(user_id){
        let result = await db.query(
            `SELECT id,
                    user_id,
                    movie_id,
                    comment,
                    created_at
            FROM user_journal
            WHERE user_id = $1`,
            [user_id],
        )
        const journalEntries = result.rows;
        return journalEntries;
    }
  /** Update profile for a given user */
  static async updateProfile(user_id){
    let result = await db.query(
        `INSERT INTO public.user,
                (username, password)
                VALUES($1, $2)
        RETURNING *`,
        [username, password]
    )
  }

  /** Get all favorite movie_ids */
  static async getMovieIds(user_id){
    let result = await db.query(
        `SELECT movie_id
        FROM user_favorite_movies
        WHERE user_id = $1`,
        [user_id],
    );
    const favoriteMoviesList = result.rows;
    console.log(favoriteMoviesList);
    return favoriteMoviesList;
  }
  /** NEED A WATCHED MOVIE METHOD FOR USERS
   * 
   * 
   */
}

module.exports = User;
       