const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href("/auth/login");
};

export default logout;
