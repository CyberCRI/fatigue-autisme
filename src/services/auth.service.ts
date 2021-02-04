import axios from 'axios';

class AuthService {
    login(user) {
        console.log('AuthService login');
        console.log('user:');
        console.log(user);
        return axios
            .post(process.env.VUE_APP_ROOT_API + "/users/login", {
                email: user.email,
                password: user.password,
            })
            .then(response => {
                console.log('response');
                console.log(response);
                if (response.data.token) {
                    const storageUser = {
                        token: response.data.token,
                        consent: response.data.user.consent,
                        isParent: response.data.user.consent,
                        parentId: response.data.user.parentId,
                        email: response.data.user.email
                    };
                    console.log('there is a token');
                    console.log('adding user in storage');
                    console.log(JSON.stringify(storageUser));
                    localStorage.setItem('user', JSON.stringify(storageUser));
                    console.log(localStorage)
                }
                return response.data;
            })
    }

    logout() {
        console.log('AuthService logout')
        console.log('remove user from storage')
        localStorage.removeItem('user');
    }

    signup(user) {
        console.log('AuthService signup')
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