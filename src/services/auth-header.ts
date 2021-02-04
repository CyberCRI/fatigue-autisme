export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 
            "content-type": "application/json",
            Authorization: "Bearer " + user.token 
        };
        
        // for Node.js Express back-end
        // return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}