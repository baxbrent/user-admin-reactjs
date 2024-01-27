// CreateUserForm.js
import React, { useState, useEffect } from "react";

const CreateUserForm = ({ onCreateUser, selectedUser, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      // Reset form data when selectedUser is null
      setFormData({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (selectedUser) {
      onUpdateUser(formData);
    } else {
      onCreateUser(formData);
    }
  };

  const handleClear = () => {
    setFormData({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
    });
  };

  const handleCreateUser = () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert(
        "Please fill in all fields (First Name, Last Name, Email) before creating user."
      );
      return;
    }

    onCreateUser(formData);
    setFormData({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
    });
  };

  return (
    <div>
      <h2>Create User</h2>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default CreateUserForm;
