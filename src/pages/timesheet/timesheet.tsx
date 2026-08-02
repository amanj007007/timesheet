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
import { useState, useEffect } from "react";

import AddTaskDialog from "./addtaskdialog";
import type { Task } from "../../component/type/task";

export default function Timesheet() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {

    const savedTasks = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );

    setTasks(savedTasks);

  }, []);

  const handleOpen = () => {
    // console.log("Open button clicked");

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveTask = (task: Task) => {

    const updatedTasks = [...tasks, task];

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
    handleClose();
  };
  const groupedTasks = tasks.reduce((groups, task) => {

    const existingGroup = groups.find(
      (group) => group.date === task.date
    );

    if (existingGroup) {

      existingGroup.tasks.push(task);

      existingGroup.totalHours += task.hours;

    } else {

      groups.push({

        date: task.date,

        tasks: [task],

        totalHours: task.hours,

      });

    }

    return groups;

  }, [] as {
    date: string;
    tasks: Task[];
    totalHours: number;
  }[]);


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

            {tasks.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={4}
                  align="center"
                >
                  No tasks found
                </TableCell>

              </TableRow>

            ) : (

              groupedTasks.map((group) => (

                <TableRow key={group.date}>

                  <TableCell>
                    {group.date}
                  </TableCell>

                  <TableCell>
                    {group.tasks[0].task}
                  </TableCell>

                  <TableCell>
                    {group.totalHours}
                  </TableCell>

                  <TableCell>

                    👁

                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>
        <AddTaskDialog
          open={open}
          handleClose={handleClose}
          onSave={handleSaveTask}
        />

      </Paper>

    </Box>

  );
}