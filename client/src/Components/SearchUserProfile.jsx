import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import FetchPosts from "./FetchPosts";
import SearchPosts from "./SearchPosts";

export default function SearchuserProfile() {

    let username = window.location.pathname.split("/")[2];
    const [userData, setUserData] = useState("");

    const style = {
        marginTop: "40px",
        float: "left",
        fontSize: "40px",
    }


    try {
        useEffect(() => {
            fetch(`/users/${username}`).then(response => response.json()).then(data => setUserData(data));
        }, [])


        return (<>
            <div className="pageStyle">
                <h1 style={style}>{username}´s profile:</h1><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <ProfilePicture name={username} />
                <div id="userPostsContainer">
                    <SearchPosts name={userData[0].username} />
                </div>
            </div>

        </>)
    }
    catch (error) {
        console.log(error)
    }
}