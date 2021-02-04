import axios from 'axios';
import authHeader from './auth-header';

class UserService {
    getTest() {
        return axios.get(
            process.env.VUE_APP_ROOT_API + "/",
            { 
                headers: authHeader() 
            }
        );
    }
}

export default new UserService();