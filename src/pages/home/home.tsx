import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: 10,
      }}
    >
      <Typography variant="h3">Timesheet Management System</Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Manage your daily learning and assignment tasks.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>
        <Button variant="outlined" component={Link} to="/signup" sx={{ ml: 2 }}>
          Signup
        </Button>
      </Box>    
    </Box>
  );
}
