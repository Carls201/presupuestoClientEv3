
export const saveToken = (token) => {
    return localStorage.setItem('userToken', token)
};

export const getToken = () => {
    return localStorage.getItem('userToken');
}