import {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export type Children = {
  children: ReactNode;
};
type State = {
  user: boolean | { token: string; userName: string };
};
type Context = {
  state: State;
  dispatch: React.Dispatch<any>;
};

type AppAction = {
  type: string;
  payload: { token: string; userName: string };
};

const userAuth = createContext<Context>({} as Context);

const reducer = (state: State, action: AppAction) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: false };
    default:
      return state;
  }
};
const initialState = { user: false };

export const Authprovider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getUser = localStorage.getItem("__user");
    if (getUser) {
      let user = JSON.parse(getUser);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  return (
    <userAuth.Provider value={{ state, dispatch }}>
      {children}
    </userAuth.Provider>
  );
};

export const useAuth = () => useContext(userAuth);
