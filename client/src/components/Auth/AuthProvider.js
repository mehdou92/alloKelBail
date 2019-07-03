import React, { createContext, useState, useEffect, Component } from 'react';
import signIn from '../../api/authentication';
import register from '../../api/register';
import actions from './Actions';
import publicActions from '../../helpers/public-actions';

export const AuthContext = createContext({});

class AuthProvider extends Component {

    state = {
        user: null,
    };

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) this.setState({ user: token });
    }

    login = async (email, password) => {
        let response;
        try {
            response = await signIn({ email: email, password: password });

        } catch (e) {
            console.log('Error :', e);
        }

        if (response) {
            const token = response.token;
            sessionStorage.setItem('token', `Bearer ${token}`);
            this.setState({ user: token });
        }
    }

    logout = () => {
        sessionStorage.removeItem('token');
        this.setState({user : null});
    }

    register = async (firstname, lastname, email, password, newsletterAccepted) => {
        let response;
        try {
            response = await register({firstname: firstname, lastname: lastname, email: email, password: password, newsletterAccepted: newsletterAccepted});
        } catch (e) {
            console.log('Error :',  e);
        }
        if(response){
            console.log('Response register :', response);
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state, ...publicActions(this, actions) }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

// export function AuthProvider(props) {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const token = sessionStorage.getItem('token');
//         if(token) setUser(token);
//     })

//     let login = async (email,password) => {
//         console.log('login provider');

//         let response;
//         try {
//             response = await loginApi({email: email, password: password});

//         } catch (e) {
//             console.log('Error :', e);
//         }
//         console.log('response login:', response);

//         if(response){
//             const token = response.token;

//             sessionStorage.setItem('token', token);
//             setUser(token);

//         }

//     };

//     let logout = () => {
//         console.log('logout');
//         sessionStorage.removeItem('token');
//         setUser(null);
//     };

//     return(
//         <AuthContext.Provider value={{...user, ...publicActions(AuthProvider, actions)}}>
//             {props.children}
//             {console.log(actions)}
//             {console.log(AuthProvider)}
//         </AuthContext.Provider>
//     );
// }

export default AuthProvider;