import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function SearchPosts(props) {

    const [postData, setPostData] = useState([]);

    const linkStyle = {
        textDecoration:"none"
    }


    useEffect(() => {
        fetch(`/posts/${props.name}`).then(response => response.json()).then(data => setPostData(data)).catch(error => console.error(error))
    }, []);

    function showPosts() {
        let allPosts;

        if (postData.length === 0) {
            return (<>
            <h2>This user has not made any posts yet!</h2>
            </>)
        }
        if (postData.length != 0) {
            allPosts = postData.map(post => <>
                <Link style={linkStyle} to="/feed"><div id="userPost">{post.postTitle}<br></br>
                </div></Link>
            </>)
            return allPosts;
        }
    };

    return(<>
    <h1>Users Posts:</h1>
    <div id="userProfilePosts" className="pageStyle">
            {showPosts()}
    </div>
    </>)
}