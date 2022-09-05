import { useContext } from "react";
import AuthContext from "./AuthenticationProvider";

const useAuth = () => {
    return useContext(AuthContext);
}
export default useAuth;