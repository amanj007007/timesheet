import { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import  type {User} from "../../component/type/user"

export default function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",
    confirmPassword: "",

  });

  const [error, setError] = useState("");

  const handleChange = (

    e: React.ChangeEvent<HTMLInputElement>

  ) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({

      ...previousData,

      [name]: value,

    }));

  };

  const validateForm = () => {

    if (!formData.name.trim()) {

      setError("Name is required.");

      return false;
    }

    if (!formData.email.trim()) {

      setError("Email is required.");

      return false;
    }
    const emailRegex =/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(!emailRegex.test(formData.email)){
      setError("Invalide Email")
      return false
    }


    if (!formData.password.trim()) {

      setError("Password is required.");

      return false;
    }


    if (formData.password.length < 6) {

      setError("Password must contain at least 6 characters.");

      return false;
    }

    if (formData.password !== formData.confirmPassword) {

      setError("Passwords do not match.");

      return false;
    }


    return true;

  };

  const checkEmailExists = () => {

    const users: User[] = JSON.parse(

      localStorage.getItem("users") || "[]"

    );


    const userExists = users.some(

      (user) => user.email === formData.email

    );


    if (userExists) {

      setError("Email already exists.");

      return true;

    }


    return false;

  };

  const saveUser = () => {

    const users: User[] = JSON.parse(

      localStorage.getItem("users") || "[]"

    );


    const newUser: User = {

      id: Date.now(),

      name: formData.name,

      email: formData.email,

      password: formData.password,

    };


    users.push(newUser);


    localStorage.setItem(

      "users",

      JSON.stringify(users)

    );

  };


  const resetForm = () => {

    setFormData({

      name: "",
      email: "",
      password: "",
      confirmPassword: "",

    });

  };

  const handleSignup = () => {


    setError("");


    if (!validateForm()) {

      return;

    }


    if (checkEmailExists()) {

      return;

    }


    saveUser();

    resetForm();


    navigate("/login");

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

      <Typography
        variant="h4"
        
        sx={{mb:3,textAlign:"center"}}
      >

        Signup

      </Typography>



      <TextField

        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange}

      />


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
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}

      />


      <TextField

        label="Confirm Password"
        name="confirmPassword"
        type="password"
        fullWidth
        margin="normal"
        value={formData.confirmPassword}
        onChange={handleChange}

      />


      {

        error && (

          <Typography
            color="error"
            sx={{mt:1}}
          >

            {error}

          </Typography>

        )

      }


      <Button

        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSignup}

      >

        Signup

      </Button>

      <Typography
        
        sx={{mt:2,textAlign:"center"}}
      >

        Already have an account ?


        <Button

          component={Link}
          to="/login"

        >

          Login

        </Button>


      </Typography>



    </Box>

  );

}