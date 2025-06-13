import React from "react";
import { useState, useEffect } from "react";

export default function EditProfilePic() {

    const [profilePic, setProfilePic] = useState();
    const [id, setId] = useState("");
    const [picNum, setpicNum] = useState();

    function updateProfile(picId, id) {
        fetch(`/profile/edit/pic/:username}`, {
            method: 'PUT',
            body: JSON.stringify({ picId: picId, id: id }),
            headers: { "Content-Type": "application/json" }
        });
    };


    function getPics() {
        fetch(`/users/profile/:username`).then(respone => respone.json()).then(data => { setProfilePic(pics[data[0].profileId]) }).catch(error => { console.error(error) });
    }

    useEffect(() => {

        setTimeout(getPics(), 1000)

    }, [])

    const pic1 = "https://i.postimg.cc/q7w74Zs1/profile1.jpg";
    const pic2 = "https://cdn11.bigcommerce.com/s-3uewkq06zr/images/stencil/1280x1280/products/238/464/fluorescent_orange__65442.1492527693.png?c=2";
    const pic3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToQ1r3rw63vqZnBZ-tJQxunJ9AfWnn4ZLZMg&s";
    let pics = [pic1, pic2, pic3];



    function handleProfilePicChange(e) {
        updateProfile(picNum, id)
    }


    return (<>
        <form action={"/"} className="pageStyle" onSubmit={handleProfilePicChange}>
            <br></br> <img id="profilePic" src={profilePic} /><br></br>
            <div id="changeImgBtn">
                <button type="button" onClick={() => { setProfilePic(pics[0]); setpicNum(0) }}>Pic 1</button>
                <button type="button" onClick={() => { setProfilePic(pics[1]); setpicNum(1) }}>Pic 2</button>
                <button type="button" onClick={() => { setProfilePic(pics[2]); setpicNum(2) }}>Pic 3</button>
                <button type="submit">Update</button>
            </div>
        </form>
    </>)

}