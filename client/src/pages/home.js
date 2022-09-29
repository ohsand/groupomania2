import React, { useEffect } from 'react';
import '../App.css'
//import image from './16644430197124927082.png'
//import images from '../../../server/images';
//const SERVER = "http://localhost:3001/16644430197124927082.png";
const image = 'http://localhost:3001/images/1664455878582selfie.png';
//import Axios from 'axios';

function Home() {
  useEffect(()=> {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

    return (
    <div className='home'>Page d'accueil Groupomania 🏡
    
    <div className='post'>
      <div className='user'>test@test.com</div>
      <div className='content'>Had a great day at work today, was lovely to see everyone! Hope you all have a great weekend, see you soon!</div>
      {/* <img src="./16644430197124927082.png" alt='postimage'/> */}
      {/* <img src={`${SERVER}`} alt="postimage"/> */}
      {/* <img src={`${req.protocol}://${req.get('host')}/images/16644430197124927082.png`} /> */}
      <img src={image} alt="postphoto"/>
    </div>
    </div>
    )
  };
  
  export default Home