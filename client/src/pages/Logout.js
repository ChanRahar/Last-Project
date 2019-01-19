import API from "../utils/API"

function Logout() {
  
    function logout()  {
      console.log("clicked")
     API.logout()
     .then(window.location.href = "/")
     .catch(err => console.log(err));
   }

   return (
        {logout}
   )
}

export default Logout;