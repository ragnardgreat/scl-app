import { useEffect, useState } from "react";
import EditProfilePic from "./EditProfilePic";
import { Link } from "react-router-dom";

export default function EditProfile() {

    const [profile, setProfile] = useState([{}]);


    try {
        function updateProfile(username, password, id) {
            fetch(`/profile/edit/${profile.username}`, {
                method: 'PUT',
                body: JSON.stringify({ newuser: username, newpass: password, id: id }),
                headers: { "Content-Type": "application/json" }
            });
        };

        useEffect(() => { fetch(`/users/profile/:username`).then(response => response.json()).then(data => setProfile(data[0])) }, [])


        function handleUpdate(e) {
            const newUsername = e.currentTarget.newUsername.value;
            const newPassword = e.currentTarget.newPassword.value;
            if (newUsername === profile.username || newPassword === profile.password) {
                e.preventDefault();
                alert("Username nor password can be the same as the previous one")
            }
            if (newUsername === "" && newPassword === "") {
                e.preventDefault();
                alert("Enter in either a new username or password")
            }
            else {
                updateProfile(newUsername, newPassword, profile.UserId);
                sessionStorage.clear()
            }
        }


        return (<>
            <div className="pageStyle">
                <div id="profileButtons">
                    <Link to={`/profile/:username`}><button id="clicked">Profile</button></Link>
                    <Link to="/profile/:username/myposts"><button>Posts</button></Link>
                    <button type="button">Edit Profile</button>
                    <form action="/" method="GET" onSubmit={() => { sessionStorage.clear() }}>
                        <button type="submit">Log Out</button>
                    </form>
                </div>
            </div>

            <form action={"/"} className="pageStyle" onSubmit={handleUpdate}>
                <div id="usernamePasswordChange"><br></br>
                    <label>Change Username:<input autocomplete="off" type="text" name="newUsername"></input><br></br></label><br></br>
                    <label>Change Password:<input autocomplete="off" type="text" name="newPassword"></input><br></br></label>
                </div>
                <button type="submit">Update</button>
            </form><br></br><br></br>
            <div id="profilePicChange" className="pageStyle">
                <label>Change profile picture:</label>
                <EditProfilePic />
            </div>

        </>)
    }
    catch (error) {
        if (error) console.error(error)
    }

}