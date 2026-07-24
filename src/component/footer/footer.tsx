import { Box, Typography } from "@mui/material";
import { auto } from "@popperjs/core";
// import { lightBlue } from "@mui/material/colors";


export default function Footer(){


return(

<Box

sx={{

textAlign:"center",
padding:2,
marginTop:auto,
backgroundColor : "lightblue"

}}

>


<Typography>

© 2026 Timesheet Management System

</Typography>


</Box>

);


}