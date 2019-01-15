import axios from "axios";

// The getBooks method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
   // Saves a user to the database
  signUp: (userData) => {
    return axios.post("/api/signup", userData);
  },

  login: (userData) => {
    return axios.post("/api/login", userData);
  },

  signedIn: () => {
    return axios.get("/api/user_data")
  },

  logout: () => {
    return axios.get("/api/logout")
  }
  // // Gets all books
  // getSavedBooks: () => {
  //   return axios.get("/api/books");
  // },
  //  // Gets the book with the given id
  //  getOneBook: function(ISBN) {
  //   return axios.get("/api/books/" + ISBN);
  // },
  // deleteBook: (id) => {
  //   return axios.delete("/api/books/" + id);
  // }  
};
