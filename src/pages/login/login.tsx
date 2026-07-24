import { useState } from "react";

import { Box, Typography, TextField, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import type { User } from "../../component/type/user";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,

      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required.");

      return false;
    }

    if (!formData.password.trim()) {
      setError("Password is required.");

      return false;
    }

    return true;
  };

  // ------------------
  // FIND USER
  // ------------------

  const findUser = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    return users.find((user) => user.email === formData.email);
  };

  // ------------------
  // SAVE CURRENT USER
  // ------------------

  const saveCurrentUser = (user: User) => {
    const currentUser = {
      id: user.id,

      name: user.name,

      email: user.email,
    };

    localStorage.setItem(
      "currentUser",

      JSON.stringify(currentUser),
    );
  };

  // ------------------
  // HANDLE LOGIN
  // ------------------

  const handleLogin = () => {
    setError("");

    if (!validateForm()) {
      return;
    }

    const user = findUser();

    if (!user) {
      setError("User does not exist.");

      return;
    }

    if (user.password !== formData.password) {
      setError("Incorrect Password.");

      return;
    }

    saveCurrentUser(user);

    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: "auto",
        mt: 8,
        p: 3,
      }}
    >
      <Typography variant="h4"
      sx= {{textAlign:"center" ,mb:3}}>
        Login
      </Typography>

      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
      />

      {error && (
        <Typography sx={{color:"error" ,mt:1}}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleLogin}
      >
        Login
      </Button>

      <Typography 
      sx={{textAlign:"center", mt:2}}>
        Don't have an account?
        <Button component={Link} to="/signup">
          Signup
        </Button>
      </Typography>
    </Box>
  );
}
