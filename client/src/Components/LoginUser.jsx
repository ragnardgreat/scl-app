import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Test from "./Test";


export default function LoginUser() {


    const [isUser, setIsUser] = useState("");

    useEffect(() => {
        fetch("/users").then(response => response.json()).then(data => setIsUser(data))
    }, [])


    function handleLogin(e) {
        if (e.currentTarget.username.value === "" || e.currentTarget.password.value === "") {
            e.preventDefault();
            alert("Username or Password field can not be empty");
        }
        else {
            let found = isUser.find((name) => name.username === e.currentTarget.username.value);

            if (found) {
                let pass = isUser.find((pass) => pass.password === e.currentTarget.password.value);
                if (pass) {
                    sessionStorage.setItem("loggedin", "true");
                    changeText();
                    return;
                }
                else {
                    alert("incorrect username or password");
                    e.currentTarget.username.value = "";
                    e.currentTarget.password.value = "";
                    e.preventDefault();
                }
            }
            else {
                alert("incorrect username or password");
                e.currentTarget.username.value = "";
                e.currentTarget.password.value = "";
                e.preventDefault();
            }
        }
    }

    const changeText = ()=>{
        const btn = document.getElementById("login");
        btn.textContent = "Loggin In";
        btn.style.backgroundColor = "pink";
        btn.style.color = "white"
    }

    return (<>
        <form id="loginForm" action="/isUser" method="POST" className="pageStyle" onSubmit={handleLogin}>
                <Test/>
            <h1 id="pageTxt">Login</h1>
            <label>Username:<br></br><input autocomplete="off" type="text" name="username"></input></label><br></br><br></br>
            <label>Password:<br></br><input autocomplete="off" type="password" name="password"></input></label><br></br>
            <button type="submit" id="login">Log in</button><br></br>
            <h1>Not an user?</h1>
            <h1><Link to="/register" id="regStyle">Register</Link></h1>
        </form>
    </>)
}