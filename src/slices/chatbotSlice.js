import { createSlice } from "@reduxjs/toolkit";

const chatbotSlice = createSlice({
    name: "chatbot",
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
});

export const { addMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;
