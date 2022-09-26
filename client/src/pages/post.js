import React, { useEffect, useState } from 'react';
import '../App.css'
import Axios from 'axios';

function Post() {
  useEffect(()=> {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);



    const [post, setPost] = useState("")
    const [image, setImage] = useState("");
    const username = localStorage.username;

    const upload = () => {
      Axios.post("http://localhost:3001/post/post", {
            post: post,
            image: image,
            username: username,
        }).then((response)=> {
            console.log(response);
        });
    }

    if (localStorage["loggedIn"] == "true") {

    return (
      <div className="Upload">
            <div className='loginText'>
                <h1>Créer un post</h1>
                <p>Partagez avec la communauté Groupomania!</p>
                    <form className='UploadForm'>
                        <div className='inputBox'>
                                <textarea className='textPost' name="text" rows="12" cols="50" onChange={(event) => {setPost(event.target.value);}}></textarea>
                        </div>
                        <div className='inputBoxFile'>
                            <span className='label'>Joindre une photo</span>
                                <input type="file" placeholder='*****' className='loginPassword' onChange={(event) => {setImage(event.target.value);}} />
                        </div>
                        <button className="btn" type="submit" onClick={upload} >Publier</button>
                    </form>
            </div>
        </div>
    ) } else {
      return (
        <p> Vous devez être connecté pour accéder à cette page</p>
      )
    }
  };
  
  export default Post 