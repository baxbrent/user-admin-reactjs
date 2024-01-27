// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateUserForm from "./CreateUserForm";
import UserList from "./UserList";

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8888/users");
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getUsers(); // Call getUsers function to fetch users when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once, on component mount

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
      setSelectedUser(null); // Clear selected user after update
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>User Management System</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
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
      )}
    </div>
  );
};

export default App;
