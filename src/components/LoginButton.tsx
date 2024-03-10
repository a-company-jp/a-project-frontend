import React from "react";

import {login}  from '../lib/firebase/auth';

const LoginButton = () => {
    //ログインボタン
    return (
        <form>
          <button id="buttonSignin" onClick={login}>Sign in</button>
        </form>
    );
}

export default LoginButton;