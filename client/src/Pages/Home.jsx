import CreatePost from "../Components/CreatePost";
import { useState, useEffect } from "react";
import DisplayPosts from "../Components/DisplayPosts";


function Home() {


    if(sessionStorage.getItem("loggedin")!="true"){
        window.location.replace("/")
    }

    return (<>
        <div id="home">
            <h1>Everyone</h1>
            <DisplayPosts/>
        </div>
    </>)
}

export default Home