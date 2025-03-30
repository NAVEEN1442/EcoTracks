import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import chatbotReducer from "../slices/chatbotSlice"; // 👈 Import chatbot reducer

const rootReducer = combineReducers({
    auth: authReducer,
    chatbot: chatbotReducer, // 👈 Add chatbot reducer
});

export default rootReducer;
