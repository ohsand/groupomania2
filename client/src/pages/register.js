import React, { useState } from 'react';
import '../App.css';
import Axios from "axios";

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
        Axios.post("http://localhost:3001/user/register", {
            username: username,
            password: password,
        }).then((response)=> {
            console.log(response);
        });
    };

    return (
        
        <div className="loginBox">
            <div className='loginText'>
                <h1>Créer un compte</h1>
                <p>Créez votre profil Groupomania!</p>
                    <form className='loginForm'>
                        <div className='inputBox'>
                            <span className='label'>E-mail</span>
                                <input type="text" placeholder='name@abc.com' className='loginEmail' onChange={(event) => {setUsername(event.target.value);}} />
                        </div>
                        <div className='inputBox'>
                            <span className='label'>Mot de passe</span>
                                <input type="password" placeholder='*****' className='loginPassword' onChange={(event) => {setPassword(event.target.value);}} />
                        </div>
                        <button className="btn" type="submit" onClick={register} >S'inscrire</button>
                        <div className='createAccount'>
                            <span>Vous avez déjà un compte?</span>
                            <a href="/login">Se connecter</a>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default Register