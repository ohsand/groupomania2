import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import { useAsyncValue } from 'react-router-dom';
import '../App.css';
import { AutoFixHighSharp } from '@mui/icons-material';
//import image from './16644430197124927082.png'
//import images from '../../../server/images';
//const SERVER = "http://localhost:3001/16644430197124927082.png";
//const image = 'http://localhost:3001/images/1664455878582selfie.png';

// import image from 'http://localhost:3001/images/1664455878582selfie.png';

function Home() {

  const [uploads, setUploads] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

  const getData = () => {
    Axios.get("http://localhost:3001/post").then((response) => {
      setUploads(response.data);
      // response.data.map((val)=> {
      //   setLikes([...likes, val.likes]);
      // });
    });
    console.log(likes);
  }

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
    getData(); } else {
      alert("vous devez être connecté pour afficher ce contenu!");
      window.location.href = "/login";
    }
  }, []);


  const likePost = (id) => {
    Axios.post("http://localhost:3001/post/like", { userLiking: localStorage.getItem('username'), postid: id }).then((response) => {
      console.log("You liked this post", response);
      getData();
    });
  };

  const editPost = (id) => {
    window.location.href = `/edit/${id}`;
    console.log(id);
    
  };

  return (
    <div className='home'>
      {uploads.map((val) => {
        return (
          <div className='post'>
            <div className='user'>{val.username}</div>
            <div className='content'>{val.post}</div>
            {/* <img src="./16644430197124927082.png" alt='postimage'/> */}
            {/* <img src={`${SERVER}`} alt="postimage"/> */}
            {/* <img src={`${req.protocol}://${req.get('host')}/images/16644430197124927082.png`} /> */}
            <div> <img src={val.image} alt="postphoto" /> </div>
            <ThumbUpAltIcon
              id="likeButton"
              onClick={() => {
                likePost(val.id);
              }}
            />
            {val.likes}
            <button onClick={() => {
                editPost(val.id);
              }}>modifier ce post</button>
              {/* <div><img src="./../images/1665482108659ae7dcd7bcb1861f88999f1277775df23.jpg" alt="postphoto" /> </div> */}
          </div>
        )
      })}

    </div>
  )
}; 

export default Home