import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FetchPosts from "../Components/FetchPosts";


export default function UserPosts() {

    const [username, setUsername] = useState("");

    if (sessionStorage.getItem("loggedin") != "true") {
        window.location.replace("/")
    }


    useEffect(() => {
        fetch(`/users/profile/:username`).then(response => response.json()).then(data => { setUsername(data[0].username) }).catch(error => console.error(error));
    }, [])

    if (username === "") {
        return (<></>)
    }


    return (<>
        <div className="pageStyle">
            <div id="profileButtons">
                <Link to={`/profile/:username`}><button id="clicked">Profile</button></Link>
                <button>Posts</button>
                <Link to="/profile/:username/edit"><button>Edit Profile</button></Link>
                <form action="/" method="GET" onSubmit={() => { sessionStorage.clear() }}>
                    <button type="submit">Log Out</button>
                </form>
            </div>
                <h1>Posts:</h1>
            <div id="userPostContainer">
                <FetchPosts name={username} />
            </div>
        </div>

    </>)

}