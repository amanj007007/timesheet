import {
AppBar,
Toolbar,
Typography,
Button,
Box

} from "@mui/material";


import { Link } from "react-router-dom";


export default function Navbar(){

return(

<AppBar position="static">


<Toolbar>


<Typography
variant="h6"
sx={{flexGrow:1}}

>

Timesheet Management System

</Typography>


</Toolbar>

</AppBar>


);


}