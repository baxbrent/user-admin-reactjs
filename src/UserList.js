// UserList.js
import React from "react";

const UserList = ({ users, onDeleteUser, onSelectUser }) => {
  const handleUserSelect = (user) => {
    onSelectUser(user);
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <div key={user.id}>
            {" "}
            {/* Wrap elements in a parent div */}
            <input
              type="radio"
              name="selectedUser"
              value={user.id}
              onChange={() => handleUserSelect(user)}
            />
            <label>
              {user.first_name} {user.last_name} - {user.email}
            </label>
            <button onClick={() => onDeleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
