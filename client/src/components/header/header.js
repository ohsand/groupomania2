import './header.css'
import logo from './icon-left-font-monochrome-white.svg'
//import React, { useEffect, useState } from 'react'

function Header() {
    if (localStorage["loggedIn"] === "false") {
        
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
                    <img src={logo} alt="Logo" />
                </div>
                <div className="Navbar">
                    <a href="/">Accueil</a>
                    <a href="/post">Créer un post</a>
                    <a href="/profil">Profil</a>
        
                </div>
                </>
            )
        }
}

export default Header