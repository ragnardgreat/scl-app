import FetchPosts from "./FetchPosts";
import { useState, useEffect } from "react";
import ProfilePicture from "./ProfilePicture";

export default function DisplayPosts() {

    const [posts, setPosts] = useState("");

    useEffect(() => {
        fetch(`/posts`).then(response => response.json()).then(data => setPosts(data)).catch(error => console.error(error))
    }, []);


    if (posts.length <= 0) {
        return (<></>)
    }

    let allPosts = posts.map(post =>
        <>
            <div id="container">
                <div id="nameAndContent">
                    <ProfilePicture name={post.creatorName} />
                    <h2>{post.creatorName}</h2>
                </div>
                <h1>{post.postTitle}</h1>
            </div>

        </>)


    return (<>
        
            {allPosts}
        </>)


}