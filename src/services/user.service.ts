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

    saveChildQuestionnaire(userId, content) {
        console.log('user service saveChildQuestionnaire')
        console.log("userId: " + userId)
        console.log("content: ")
        console.log(content)

        return axios
            .put(process.env.VUE_APP_ROOT_API + "/childQuestionnaire", {
                userId: userId,
                content: content
            },{
                headers: authHeader()
            })
            .then(response => {
                console.log('response');
                console.log(response);
            });

    }
}

export default new UserService();