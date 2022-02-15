import api from "../Api";
import { ShowMessage, type } from "../Components/Toaster";


export const UserSignUp = async (payload) => {
  try {
    const response = await api.post("/auth/user/signUp", payload);
    return response
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UserLogin = async (payload) => {
  try {
    const response = await api.post("/auth/user/login", payload);
    return response
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const getCurrentUser = async () => {
    try {
      const response = await api.get(`/auth/user/current_user`);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  export const getAllTransactions = async () => {
    try {
      const response = await api.get(`/transaction`);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  export const getAllUsers = async () => {
    try {
      const response = await api.get(`/auth/user/users`);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  export const MakeTransfer = async (payload) => {
    try {
      const response = await api.post("/transaction/create", payload);
      return response
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  //=================================================================================================================


  