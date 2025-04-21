// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     loading: false,
//     user: {},
//     isAuthenticated: false,
//     error: null,
//     message: null,
//     isUpdated: false,
//   },
//   reducers: {
//     loginRequest(state, action) {
//       state.loading = true;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = action.payload;
//     },
//     logoutSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//       state.message = action.payload;
//     },
//     logoutFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = state.isAuthenticated;
//       state.user = state.user;
//       state.error = action.payload;
//     },
//     loadUserRequest(state, action) {
//       state.loading = true;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = null;
//     },
//     loadUserSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loadUserFailed(state, action) {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = {};
//       state.error = action.payload;
//     },
//     updatePasswordRequest(state, action) {
//       state.loading = true;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = null;
//     },
//     updatePasswordSuccess(state, action) {
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updatePasswordFailed(state, action) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = action.payload;
//     },
//     updateProfileRequest(state, action) {
//       state.loading = true;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = null;
//     },
//     updateProfileSuccess(state, action) {
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = action.payload;
//       state.error = null;
//     },
//     updateProfileFailed(state, action) {
//       state.loading = false;
//       state.isUpdated = false;
//       state.message = null;
//       state.error = action.payload;
//     },
//     updateProfileResetAfterUpdate(state, action) {
//       state.error = null;
//       state.isUpdated = false;
//       state.message = null;
//     },
//     clearAllErrors(state, action) {
//       state.error = null;
//       state = state.user;
//     },
//   },
// });

// export const login = (email, password) => async (dispatch) => {
//   dispatch(userSlice.actions.loginRequest());
//   try {
//     const { data } = await axios.post(
//       "http://localhost:4000/api/v1/user/login",
//       { email, password },
//       { withCredentials: true, headers: { "Content-Type": "application/json" } }
//     );
//     dispatch(userSlice.actions.loginSuccess(data.user));
//     dispatch(userSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(userSlice.actions.loginFailed(error.response.data.message));
//   }
// };

// export const getUser = () => async (dispatch) => {
//   dispatch(userSlice.actions.loadUserRequest());
//   try {
//     const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
//       withCredentials: true,
//     });
//     dispatch(userSlice.actions.loadUserSuccess(data.user));
//     dispatch(userSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
//   }
// };

// export const logout = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get(
//       "http://localhost:4000/api/v1/user/logout",
//       { withCredentials: true }
//     );
//     dispatch(userSlice.actions.logoutSuccess(data.message));
//     dispatch(userSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(userSlice.actions.logoutFailed(error.response.data.message));
//   }
// };

// export const updatePassword =
//   (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
//     dispatch(userSlice.actions.updatePasswordRequest());
//     try {
//       const { data } = await axios.put(
//         "http://localhost:4000/api/v1/user/password/update",
//         { currentPassword, newPassword, confirmNewPassword },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       dispatch(userSlice.actions.updatePasswordSuccess(data.message));
//       dispatch(userSlice.actions.clearAllErrors());
//     } catch (error) {
//       dispatch(
//         userSlice.actions.updatePasswordFailed(error.response.data.message)
//       );
//     }
//   };

// export const updateProfile = (data) => async (dispatch) => {
//   dispatch(userSlice.actions.updateProfileRequest());
//   try {
//     const response = await axios.put(
//       "http://localhost:4000/api/v1/user/me/profile/update",
//       data,
//       {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
//     dispatch(userSlice.actions.clearAllErrors());
//   } catch (error) {
//     dispatch(
//       userSlice.actions.updateProfileFailed(error.response.data.message)
//     );
//   }
// };
// export const resetProfile = () => (dispatch) => {
//   dispatch(userSlice.actions.updateProfileResetAfterUpdate());
// };
// export const clearAllUserErrors = () => (dispatch) => {
//   dispatch(userSlice.actions.clearAllErrors());
// };

// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: null,
  message: null,
  isUpdated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Auth Actions
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // Logout
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
      state.error = null;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Load User
    loadUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // Update Password
    updatePasswordRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Profile
    updateProfileRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
    },
    updateProfileFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset Update State
    updateProfileResetAfterUpdate: (state) => {
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },

    // Clear Errors
    clearAllErrors: (state) => {
      state.error = null;
    },
  },
});

const handleError = (error) =>
  error?.response?.data?.message || error.message || "Something went wrong";

// === Async Thunks ===

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      { email, password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(handleError(error)));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(handleError(error)));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/user/logout",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(handleError(error)));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/password/update",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.updatePasswordFailed(handleError(error)));
    }
  };

export const updateProfile = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/user/me/profile/update",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.updateProfileFailed(handleError(error)));
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
