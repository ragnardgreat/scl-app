import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function FetchPosts(props) {

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        fetch(`/posts/${props.name}`).then(response => response.json()).then(data => setPostData(data)).catch(error => console.error(error))
    }, []);


    function deletePost(id) {
        fetch(`/posts/delete/${id}`, {
            method: 'DELETE',
        })
    };

    function showPosts() {
        let allPosts;

        if (postData.length === 0) {
            return (<>
            <h1>You havent made any posts yet!</h1></>)
        }
        if (postData.length != 0) {
            allPosts = postData.map(post => <>
                <div id="editPostsContainer">
                    <div id="postTitle">{post.postTitle}</div><br></br>
                    <div id="postEditButtons">
                        <Link to={`/profile/myposts/update/${post.postId}`}><button id="update" type="submit" onClick={() => { sessionStorage.setItem("postId", post.postId) }}>Update</button></Link>
                        <form onSubmit={() => deletePost(post.postId)}>
                            <button id="delete">Delete</button>
                        </form>
                    </div>
                </div>
            </>)
            return allPosts;
        }

    };

    return (<>
        <div id="userPosts">
            {showPosts()}
        </div>
    </>)
}