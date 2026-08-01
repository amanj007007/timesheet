// import type { CurrentUser } from "../../component/type/currentuser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useauth";
import {
    Box,
    Typography,
    Button,
} from "@mui/material";

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();

        navigate("/login");
    };
    return (
        <Box
            sx={{
                p: 4,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    mb: 2,
                }}
            >
                Dashboard
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    mb: 3,
                }}
            >
                Welcome  {currentUser?.name} to Timesheet Management System
            </Typography>

            <Button
                variant="contained"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Box>
    );
}