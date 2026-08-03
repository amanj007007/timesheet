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
import ViewTaskDialog from "./viewtaskdialog";
import AddTaskDialog from "./addtaskdialog";
import EditIcon from "@mui/icons-material/Edit";
import type { Task } from "../../component/type/task";

export default function Timesheet() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{
    date: string;
    tasks: Task[];
  } | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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
  const handleView = (group: {
    date: string;
    tasks: Task[];
  }) => {

    console.log("Eye clicked", group);

    setSelectedGroup(group);

    setViewOpen(true);

  };
  const handleEdit = (task: Task) => {

    setEditingTask(task);

    setViewOpen(false);

    setOpen(true);

  };
  const handleSaveTask = (task: Task) => {

    let updatedTasks: Task[];

    if (editingTask) {

      updatedTasks = tasks.map((t) =>
        t.id === editingTask.id ? task : t
      );

    } else {

      updatedTasks = [...tasks, task];

    }

    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );

    setEditingTask(null);

    handleClose();

  };
  const sortedTasks = [...tasks].sort((a, b) => {

    const dateA = new Date(
      a.date.split("/").reverse().join("-")
    );

    const dateB = new Date(
      b.date.split("/").reverse().join("-")
    );

    return dateA.getTime() - dateB.getTime();

  });
  const groupedTasks = sortedTasks.reduce((groups, task) => {

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

  const formatHours = (hours: number) => {

    const totalMinutes = Math.round(hours * 60);

    const hrs = Math.floor(totalMinutes / 60);

    const mins = totalMinutes % 60;

    let result = "";

    if (hrs > 0) {
      result += `${hrs} ${hrs === 1 ? "Hour" : "Hours"}`;
    }

    if (mins > 0) {

      if (result) {
        result += " ";
      }

      result += `${mins} ${mins === 1 ? "Minute" : "Minutes"}`;

    }

    return result;

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
                    {formatHours(group.totalHours)}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => handleView(group)}
                    >
                      👁
                    </Button>

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
          editingTask={editingTask}
        />
        <ViewTaskDialog
          open={viewOpen}
          handleClose={() => setViewOpen(false)}
          tasks={selectedGroup?.tasks || []}
          date={selectedGroup?.date || ""}
          onEdit={handleEdit}
        />
      </Paper>

    </Box>

  );
}