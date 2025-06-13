import React from "react";
import { useState, useEffect } from "react";

export default function ProfilePicture(props) {

    const [profilePic, setProfilePic] = useState();


    function getPics(){
        fetch(`/users/${props.name}`).then(respone => respone.json()).then(data => {setProfilePic(pics[data[0].profileId]) }).catch(error => {console.error(error)});
    }

    useEffect(() => {

        setTimeout(getPics(), 1000)
        
    }, [])

    const pic1 = "https://i.postimg.cc/q7w74Zs1/profile1.jpg";
    const pic2 = "https://cdn11.bigcommerce.com/s-3uewkq06zr/images/stencil/1280x1280/products/238/464/fluorescent_orange__65442.1492527693.png?c=2";
    const pic3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToQ1r3rw63vqZnBZ-tJQxunJ9AfWnn4ZLZMg&s";
    let pics = [pic1, pic2, pic3];




    return (<>
        <img id="profilePic" src={profilePic} /><br></br>
    </>)

}