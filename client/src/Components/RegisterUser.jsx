import { useState, useEffect } from "react";


export default function RegisterUser() {

        const border = {
        border: "2px solid pink",
        width: "20%",
        borderRadius:"20px",
        padding: "10px"
    }

    const [isUser, setIsUser] = useState("");

    useEffect(()=>{
        fetch("/users").then(response=>response.json()).then(data=>setIsUser(data))
    }, [])





    const register = (e) => {
        try {

            if (e.currentTarget.username.value === "" ||
                e.currentTarget.firstlastname.value === "" ||
                e.currentTarget.email.value === "" ||
                e.currentTarget.password.value === "") {
                e.preventDefault();
                alert("Please fill in all of the required fields");     
            }
            else{
                for(let i = 0; i<isUser.length;i++){
                    if(isUser[i].username === e.currentTarget.username.value){
                        e.preventDefault();
                        alert("Username already exists");
                    }
                    if(isUser[i].email === e.currentTarget.email.value){
                                                e.preventDefault();
                        alert("Email address already exists");
                    }
                }
            }


        }
        catch (err) { console.log(err) }
    }



    return (<>
        <form style={border} action="/register" id="registerContainer" className="pageStyle" method="POST" onSubmit={register}>
            <h1 id="pageTxt">Register New user</h1>
            <lable>Username:<br /><br /></lable>
            <input autocomplete="off" type="text" name="username"></input><br /><br />
            <label>First/last name:<br /><br /></label>
            <input autocomplete="off" type="text" name="firstlastname"></input><br /><br />
            <label>Email address:<br /><br /></label>
            <input autocomplete="off" type="text" name="email"></input><br /><br />
            <lable>Password:<br /><br /></lable>
            <input autocomplete="off" name="password"></input><br /><br />
            <button id="register" type="submit">Register</button>
        </form>
    </>)
}