const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("BASE URL",BASE_URL)

//AUTH
export const endpoint = {
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/logIn",
    OTP_API: BASE_URL + "/auth/sendotp",

};


//PROFILE
export const profile = {
    SHOW_USER_DETAILS : BASE_URL + "/profile/getUserProfile",
    
}


