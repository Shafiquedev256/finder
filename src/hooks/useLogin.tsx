import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userAuth";

type Error = string | null;
type UserInfo = {
  userName: string;
  token: string;
};

export const useLogin = () => {
  const { dispatch } = useAuth();
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrormsg] = useState<Error>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const navigate = useNavigate();
  const login = async (userName: string, password: string) => {
    setIsloading(true);
    axios
      .post(`${import.meta.env.VITE_HEADER}user/signin`, {
        userName,
        password,
      })
      .then((response) => {
        setErrormsg(null);
        setIsloading(false);
        setUserInfo(response.data);
        localStorage.setItem("__user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
      })
      .then(() => navigate("/"))
      .catch((error) => {
        setIsloading(false);
        console.log(error.response.data.err);
        setErrormsg(error.response.data.err);
      });
  };

  const logout = () => {
    dispatch("LOGOUT");
    localStorage.removeItem("__user");
  };
  return { login, logout, errorMessage, isLoading, userInfo };
};
