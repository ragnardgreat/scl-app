import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

export default function UserProfile() {

    if (sessionStorage.getItem("loggedin") != "true") {
        window.location.replace("/")
    }


    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch(`/users/profile/:username`).then(response => response.json()).then(data => { setUsername(data[0].username) }).catch(error => console.error(error));
    }, [])

    if (username === "") {
        return (<></>)
    };




    return (<>
        <div id="userContainer" className="pageStyle">
            <div id="profileButtons">
                <button id="clicked">Profile</button>
                <Link to="myposts"><button>Posts</button></Link>
                <Link to="edit"><button>Edit Profile</button></Link>
                <form action="/" method="GET" onSubmit={() => { sessionStorage.clear() }}>
                    <button type="submit">Log Out</button>
                </form>
            </div>
            <div className="pageStyle" id="picContainer">
                <ProfilePicture name={username} />
                <h1>{username}</h1>
            </div>
        </div>

    </>)


}