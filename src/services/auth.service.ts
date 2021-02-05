import axios from 'axios';

class AuthService {
    login(user) {
        return axios
            .post(process.env.VUE_APP_ROOT_API + "/users/login", {
                email: user.email,
                password: user.password,
            })
            .then(response => {
                if (response.data.token) {
                    const storageUser = {
                        token: response.data.token,
                        consent: response.data.user.consent,
                        isParent: response.data.user.isParent,
                        parentId: response.data.user.parentId,
                        email: response.data.user.email,
                        userId: response.data.user._id
                    };
                    localStorage.setItem('user', JSON.stringify(storageUser));
                    console.log('storageUser:')
                    console.log(storageUser)
                    
                    if (!storageUser.isParent && response.data.questionnaire) {
                        localStorage.setItem('childQuestionnaire', JSON.stringify(response.data.questionnaire));
                    }
                    return storageUser;
                }
                return response.data;
            })
    }

    logout() {
        localStorage.removeItem('user');
    }

    signup(user) {
        return axios
            .put(process.env.VUE_APP_ROOT_API + "/users", {
                email: user.email,
                password: user.password,
                isChild: !user.isParent,
                parentId: user.parentId
              })
              .then(response => {
                console.log(response)
                return response.data;
            })
            
    }
}

export default new AuthService();