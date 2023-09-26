// Decode Token and Get User Information
import decode from "jwt-decode";

// Create New Class 
class AuthService {

    getprofile (){
       return decode (this.getToken()); 
    }
}
// Checks if User is Logged in
loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
}
// Check if Token is Expired
isTokenExpired(token) {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000){
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}

getToken() {
    // Retrieves Token from LocalStorage
    return localStorage.getItem("id_token");
}

login(idToken) {
    // Saves to LocalStorage
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
}

logout() {
    // Clear token
    localStorage.removeItem("id_token");
    // Page Reload 
    window.location.assign("/")
}

export default new AuthService();