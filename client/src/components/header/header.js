import './header.css'
import logo from './icon-left-font-monochrome-white.svg'
//import React, { useEffect, useState } from 'react'

function Header() {

    const disconnect = () => {
        localStorage.clear()
        window.location.href = "/login";
    }


    if (localStorage["loggedIn"] !== "true") {
        
        return (
            <>
            <div className="header">
                <img src={logo} alt="Logo" />
            </div>
            <div className="Navbar">
                <a href="/">Accueil</a>
                <a href="/login">Se connecter</a>
                <a href="/register">Créer un compte</a>
    
            </div>
            </>
        ) } else {
            return (
                <>
                <div className="header">
                    <img src={logo} alt="Logo" /> <button className='logout' onClick={disconnect}>Déconnexion</button>
                </div>
                <div className="Navbar">
                    <a href="/">Accueil</a>
                    <a href="/post">Créer un post</a>
                    {/*<a href="/profil">Profil</a>*/}
        
                </div>
                </>
            )
        }
}

export default Header