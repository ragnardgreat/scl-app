import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './Pages/Home';
import Navbar from './Components/navbar';
import RegisterUser from './Components/RegisterUser';
import LoginUser from './Components/LoginUser';
import UserProfile from './Components/UserProfile';
import Explore from './Pages/Explore';
import CreatePost from './Components/CreatePost';
import UserPosts from './Pages/UserPosts';
import UpdatePost from './Components/UpdatePost';
import SearchPage from './Pages/SearchPage';
import EditProfile from './Components/EditProfile';
import SearchuserProfile from './Components/SearchUserProfile';
import Test from './Components/Test';

function App() {




  return (<>
  <meta name="viewport" content="width=device-width"></meta>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap');
</style>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginUser />}></Route>
        <Route path="/" element={<LoginUser />}></Route>
        <Route path="/register" element={<RegisterUser />}></Route>
        <Route element={<Navbar />}>
          <Route path="/feed" element={<Home />}></Route>
          <Route path="/posts/:id"></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/explore" element={<Test />}></Route>
          <Route path="profile/:username" element={<UserProfile />}></Route>
          <Route path="/search/:username" element={<SearchuserProfile />}></Route>
          <Route path="/posts/createpost" element={<CreatePost />}></Route>
          <Route path="/profile/:username/myposts" element={<UserPosts />}></Route>
          <Route path="/profile/myposts/update/:id" element={<UpdatePost />}></Route>
          <Route path="profile/:username/edit" element={<EditProfile />}></Route>
        </Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
