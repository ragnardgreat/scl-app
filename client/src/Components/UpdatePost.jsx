import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function UpdatePost() {

    const [postContent, setPostContent] = useState([{}]);

    try {
        function updatePost(id, update) {
            fetch(`/posts/update/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ update: update, id: id }),
                headers: { "Content-Type": "application/json" }
            });
        };

        useEffect(() => { fetch(`/posts/id/${sessionStorage.getItem("postId")}`).then(response => response.json()).then(data => setPostContent(data)) }, [])


        function handleUpdate(e) {
            if (e.currentTarget.update.value === "") {
                e.preventDefault()
                alert("Content update can not be empty!");
            }
            if (e.currentTarget.update.value === postContent[0].postTitle) {
                e.preventDefault()
                alert("Content update can not be same");
            }
            else {
                updatePost(sessionStorage.getItem("postId"), e.currentTarget.update.value);
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
            <div id="updatePost">
                <form action={"/feed"} className="pageStyle" onSubmit={handleUpdate}>
                    <label>Update:<br></br><input autocomplete="off" type="text" name="update" placeholder={postContent[0].postTitle}></input><br></br></label>
                    <button type="submit">Update</button>
                </form>
            </div>

        </>)
    }
    catch (error) {
        if (error) console.error(error)
    }

}