const register = async (params = {}) => {

    console.log(params);

    let response = await fetch("http://localhost:3000/register",
        {
            method: "post",
            body: JSON.stringify(params),
            headers: {
                'Content-type': 'application/json'
            }
        }
    );
    let data = await response.json()
    return data;
};

export default register;