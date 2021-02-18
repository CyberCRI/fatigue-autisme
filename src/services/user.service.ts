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

    sendConsent(userId) {
        return axios
          .patch(
            process.env.VUE_APP_ROOT_API + "/users",
            {
              id: userId,
              consent: true
            },{
                headers: authHeader()
            });
    }

    sendComment(userId, comment) {
        return axios
            .put(process.env.VUE_APP_ROOT_API + "/comment", {
                userId: userId,
                comment: comment
            },{
                headers: authHeader()
            });
    }

    saveChildQuestionnaire(userId, content) {
        return axios
            .put(process.env.VUE_APP_ROOT_API + "/childQuestionnaire", {
                userId: userId,
                content: content
            },{
                headers: authHeader()
            });

    }
}

export default new UserService();