import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateUserForm from "./CreateUserForm";
import UserList from "./UserList";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css"; // Import CSS file for styling

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUsers, setShowUsers] = useState(true); // State to control showing users
  const [openDrawer, setOpenDrawer] = useState(false); // State to control the drawer

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8888/users");
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getUsers();
  }, []);

  const createUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8888/users",
        userData
      );
      setUsers([...users, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8888/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      await axios.put(
        `http://localhost:8888/users/${updatedUserData.id}`,
        updatedUserData
      );
      const updatedUsers = users.map((user) =>
        user.id === updatedUserData.id ? updatedUserData : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="app">
      {/* Collapsible Left Sidebar */}
      <IconButton onClick={() => setOpenDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem button onClick={() => setShowUsers(true)}>
            <ListItemText primary="Users" />
          </ListItem>
          {/* Add more list items for other options */}
        </List>
      </Drawer>

      <main className="main">
        <div className="main-container">
          <h2>User Management System</h2>
          {/* Conditional rendering based on showUsers state */}
          {showUsers ? (
            <>
              <CreateUserForm
                onCreateUser={createUser}
                selectedUser={selectedUser}
                onUpdateUser={updateUser}
              />
              <UserList
                users={users}
                onDeleteUser={deleteUser}
                onSelectUser={setSelectedUser}
              />
            </>
          ) : (
            <div>Other content goes here</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
