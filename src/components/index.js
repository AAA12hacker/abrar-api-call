import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./home";
import UserView from "./userView";
import UserEdit from "./userEdit";
import UserAdd from "./userAdd";
const UserPages = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserAdd />} />
        <Route path="/user/view/:id" element={<UserView />} />
        <Route path="/user/edit/:id" element={<UserEdit />} />
      </Routes>
    </Router>
  );
};
export default UserPages;
