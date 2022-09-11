import useAuth from './useAuth';
import axios from '../../api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
    
        
        const loggedInUser = localStorage.getItem("user");
        let refreshtoken;
        let accessToken;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);

            console.log(foundUser);
            refreshtoken = foundUser?.refreshToken;
            
        } 
        console.log("refresh token is :" + refreshtoken);
        const response = await axios.post('/api/users/refreshtoken',
            JSON.stringify({
                "refreshToken":refreshtoken
            }),
            {   headers: { "Content-Type": "application/json"},
                withCredentials: true
            });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.body.accessToken);
            return { ...prev, accessToken: response.data.body.accessToken }
        });

        console.log("RESPONE :" + response.data.body.accessToken);
        return response.data.body.accessToken;
    }
    return refresh;
};

export default useRefreshToken;