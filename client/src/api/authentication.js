const signIn = async (params = {}) => {

    let response = await fetch("http://localhost:3000/login_check",
        {
            method: "post",
            body: JSON.stringify(params),
            headers: {
                'Content-type': 'application/json'
            }
        }
    );
    let data = await response.json();
    return data;
};

export default signIn;