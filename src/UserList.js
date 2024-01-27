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
          <li key={user.id}>
            <input
              type="radio"
              name="selectedUser"
              value={user.id}
              onChange={() => handleUserSelect(user)}
            />
            {user.first_name} {user.last_name} - {user.email}
            <button onClick={() => onDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
