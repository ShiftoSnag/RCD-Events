// Decode Token and Get User Information
import decode from "jwt-decode";

// Create New Class 
class AuthService {
    getprofile (){
       return decode (this.getToken()); 
    }
}