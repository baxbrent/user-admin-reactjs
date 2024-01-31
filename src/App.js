import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateUserForm from "./CreateUserForm";
import UserList from "./UserList";
import "./App.css"; // Import CSS file for styling

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUsers, setShowUsers] = useState(true); // State to control showing users

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
      {/* Left Sidebar/Navbar */}
      <aside className="sidebar">
        <nav className="navbar">
          <ul>
            <li>
              <button onClick={() => setShowUsers(true)}>Users</button>
            </li>
            {/* Add more navbar options here if needed */}
          </ul>
        </nav>
      </aside>

      {/* Main Content Section */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <h1 className="header-title">User Management System</h1>
        </header>

        <div className="main-container">
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
