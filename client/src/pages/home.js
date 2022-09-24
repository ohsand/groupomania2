import React, { useEffect } from 'react';
import '../App.css'
import Axios from 'axios';

function Home() {
  useEffect(()=> {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

    return (
    <div>Page d'accueil 🏡</div>
    )
  };
  
  export default Home