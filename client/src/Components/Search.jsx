import { useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {


    const [timerID, setTimerID] = useState(null);

    const handler = (e) => {
        let users = document.getElementById("users");
        users.innerHTML = "";
        e.preventDefault();
        let user = e.currentTarget.value;
        clearTimeout(timerID);
        const id = setTimeout(() => {

            if (user === "") {
                return
            }
            fetch(`/users/search/${user}`).then(response => response.json()).then(data => {
                console.log(data)
                if (users === "") {
                    users.innerHTML = "Search for people"
                }
                else {
                    data.length <= 0 ? users.innerHTML += `No Users Found` : users = data.map(user => users.innerHTML += `<button id="userProfileBtn" onClick={window.location.replace("/search/${user.username}")} type="button">${user.username}</button><br></br>`)
                    console.log(users)
                }
            })
        }, 1000);
        setTimerID(id);
    };

    return (<>
        <div id="search">
            <label id="searchText">Search for users:</label>
            <input autoComplete="off" name="search" onChange={handler}></input>
            <div id="users"><br></br></div>
        </div>
    </>)

}