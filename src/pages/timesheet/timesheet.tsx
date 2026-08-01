import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";

import AddTaskDialog from "./addtaskdialog";

export default function Timesheet() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      // console.log("Open button clicked");

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Timesheet
        </Typography>

        <Button
          variant="contained"
          onClick={handleOpen}
        >
          Add Task
        </Button>
        
      </Box>

      {/* Table */}

      <Paper elevation={3}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Date</TableCell>

              <TableCell>Task</TableCell>

              <TableCell>Hours</TableCell>

              <TableCell>Action</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            <TableRow>

              <TableCell
                colSpan={4}
                align="center"
              >
                No tasks found
              </TableCell>

            </TableRow>

          </TableBody>

        </Table>
        <AddTaskDialog
          open={open}
          handleClose={handleClose}
        />

      </Paper>

    </Box>

  );
}