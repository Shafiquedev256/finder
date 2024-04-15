import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userAuth";

type Error = string | null;
type UserInfo = {
  userName: string;
  token: string;
};

export const useSignup = () => {
  const { dispatch } = useAuth();
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrormsg] = useState<Error>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const navigate = useNavigate();
  const signup = async (
    fullName: string,
    userName: string,
    email: string,
    password: string,
    location: string
  ) => {
    setIsloading(true);
    axios
      .post(`${import.meta.env.VITE_HEADER}user/signup`, {
        fullName,
        userName,
        email,
        password,
        location,
      })
      .then((response) => {
        setErrormsg(null);
        setIsloading(false);
        setUserInfo(response.data);
        localStorage.setItem("__user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
      })
      .then(() => navigate("/login"))
      .catch((error) => {
        setIsloading(false);
        console.log(error.response.data.error);
        setErrormsg(error.response.data.error);
      });
  };
  return { signup, errorMessage, isLoading, userInfo };
};
