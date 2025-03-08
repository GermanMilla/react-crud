import { createSlice } from '@reduxjs/toolkit';

export const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        value: {},
        activeStats: false,
        sessionSessionStats: false,
        activeDemoStats: false,
        showLog: '',
        showUpdateSession: '',
        showBookSession2: '',
        showDocs: ''
    },
    reducers: {
        updateUserInfo: (state, action) => {
            state.value = { ...action.payload }
        },
        isStatsActive: (state, action) => {
            state.activeStats = action.payload;
        },
        isDemoStatsActive: (state, action) => {
            state.activeDemoStats = action.payload;
        },
        setShowUpdateSession: (state, action) => {
            state.showUpdateSession = action.payload;
        },
        setShowBookSession2: (state, action) => {
            state.showBookSession2 = action.payload;
        },
        setShowDocs: (state, action) => {
            state.showDocs = action.payload;
        },
        setSessionStats: (state, action) => {
            state.sessionSessionStats = action.payload
        },
        setShowLog: (state, action) => {
            state.showLog = action.payload;
        }

    },
})

// Action creators are generated for each case reducer function
export const { updateUserInfo, isStatsActive, isDemoStatsActive, setShowUpdateSession, setShowBookSession2, setShowDocs, setSessionStats, setShowLog } = userInfo.actions;

export default userInfo.reducer;