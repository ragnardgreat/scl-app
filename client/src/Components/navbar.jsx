import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import SearchPage from "../Pages/SearchPage";
import Test from "./Test";

function Navbar() {

    const [userData, setUserData] = useState("");

    useEffect(()=>{
        fetch("/users/:username").then(respone=>respone.json()).then(data=>setUserData(data.username)).catch(error=>console.error(error));
    }, []);

    const style = {
        textDecoration: "none"
    }
    const navStyle = {
        marginTop: "5%",
        listStyleType: "none",
        padding: "0px",
        margin: "0px",
        height: "100vh",
    }
    const navBtnStyle = {
        textAlign: "center",
        fontWeight: "bold",
        padding: "20px",
        transition: ".5s",
        fontSize:"30px"
    }

    
    const linkStyle = {
        color: "hsl(0, 0%, 80%)",
        textDecoration: "none"
    }

    function showHideSearch(){
       const sBar =  document.getElementById("searchbar");

       if(sBar.style.left  === "100%"){
            sBar.style.left="-200%";     
            sBar.style.opacity="0"       
       }
        else{
            sBar.style.transition = ".6s"
            sBar.style.left="100%";
            sBar.style.opacity="100"  
       }
    }



    return (<>
        <div id="outerContainer">
                            <Test/>
            <ul style={navStyle}>
                <Link style={linkStyle} to="/feed"><li style={navBtnStyle} className="navBtn" id="feed">Home</li></Link>
                <Link style={linkStyle} onClick={()=>{showHideSearch()}}><li style={navBtnStyle} className="navBtn" id="search">Search</li></Link>
                <SearchPage id="searchbar"/>
                <Link style={linkStyle} to={`/profile/:username`}><li style={navBtnStyle} className="navBtn" id="profile">Profile</li></Link>
                <Link style={linkStyle} to="/posts/createpost"><li style={navBtnStyle} className="navBtn" id="createPost">Create Post</li></Link>
            </ul>
        </div>
        


        <main>
            <Outlet />
        </main>
    </>)
}

export default Navbar