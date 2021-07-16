import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Lottie from "lottie-react";
import hashtag from '../../assets/hashtag_animation.json';
import logo from '../../assets/twitter-blue.png';

import './styles.css';

function Signin() {
  const history = useHistory();
  const [click, setClick] = useState(false);

  function handleLogin() {
    setClick(true);
  }
  useEffect(() => {
    if(click) {
        window.location.assign('http://localhost:4000/auth/twitter');
    }
  })

  return (
    <div className="signin">
        <div className="logo-signin">
            <Lottie animationData={hashtag} />
        </div>
        <div className="form-signin">
            <h1 className="header-signin">
                Login
            </h1>
            <p>
                Descubra aonde os seus assuntos de mais interesse<br/>estão sendo falado...
            </p>
            <button onClick={handleLogin} className="button-signin">
                <p>Login com Twitter</p>
            </button>
        </div>
    </div>
    );
}

export default Signin;