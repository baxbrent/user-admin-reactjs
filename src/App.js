// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
// import axios from 'axios';
import CreateUserForm from "./CreateUserForm";
import UserList from "./UserList";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8888/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8888/users",
        userData
      );
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8888/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>User Management System</h1>
      <CreateUserForm onCreateUser={createUser} />
      <UserList users={users} onDeleteUser={deleteUser} />
    </div>
  );
};

export default App;
