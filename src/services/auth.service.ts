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
                    let questionnaire = response.data.questionnaire;
                    
                    if (!storageUser.isParent && response.data.questionnaire) {
                        questionnaire = questionnaire.child;
                    }
                    return {
                        user: storageUser,
                        questionnaire: questionnaire
                    }
                }
                return response.data;
            })
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