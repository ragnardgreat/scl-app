import { useEffect, useState } from "react";

export default function CreatePost() {

    const createPostStyle = {
        fontSize: "30px",
        fontWeight: "bold"
    }

    const inputStyle = {
        fontSize: "30px",
        background: "black",
        border: "2px solid white",
        color: "white",
        paddingBottom: "100px",
        width: "50%",
        overflowWrap: "new-line"
    }



    function handlePost(e) {
        if (e.currentTarget.content.value === "") {
            alert("Empty content can not be posted!")
            e.preventDefault();
        }
        changeText();
    }

    const changeText = () => {
        const btn = document.getElementById("upload");
        btn.textContent = "Uploading...";
        btn.style.backgroundColor = "pink";
        btn.style.color = "white"
    }


    return (<>
        <form style={createPostStyle} className="pageStyle" action="/posts/createpost/upload" method="post" onSubmit={handlePost}><br></br>
            <label name="username">{sessionStorage.getItem("username")}</label>
            <label>What do you want to write about?:<br></br><br></br><input autocomplete="off" style={inputStyle} placeholder="Today I did....." name="content"></input></label><br></br>
            <button id="upload" type="submit">Upload post</button>
        </form>
    </>)


}