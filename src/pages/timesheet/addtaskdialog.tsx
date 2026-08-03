import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography
}
    from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useAuth } from "../../hooks/useauth";
import type { Task } from "../../component/type/task";
interface Props {
    open: boolean;
    handleClose: () => void;
    onSave: (task: Task) => void;
    editingTask: Task | null;
}

export default function AddTaskDialog({
    open,
    handleClose,
    onSave,
    editingTask,
}: Props) {
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [category, setCategory] = useState<"Learning" | "Assignment" | "">("");
    const [topic, setTopic] = useState("");
    const [projectName, setProjectName] = useState("");
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [hours, setHours] = useState("");
    const [displayHours, setDisplayHours] = useState("");
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const { currentUser } = useAuth();
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [errors, setErrors] = useState({
        date: "",
        category: "",
        topic: "",
        projectName: "",
        task: "",
        description: "",
        startTime: "",
        endTime: "",
        hours: "",
    });
    const resetForm = () => {
        setDate(dayjs());
        setCategory("");
        setTopic("");
        setProjectName("");
        setTask("");
        setDescription("");
        setStartTime(null);
        setEndTime(null);
        setHours("");
        setDisplayHours("");
        setErrors({
            date: "",
            category: "",
            topic: "",
            projectName: "",
            task: "",
            description: "",
            startTime: "",
            endTime: "",
            hours: "",
        });
    };

    useEffect(() => {

        if (startTime && endTime) {

            const totalMinutes = endTime.diff(startTime, "minute");

            if (totalMinutes > 0) {

                const calculatedHours = totalMinutes / 60;

                setHours(calculatedHours.toString());

                const hour = Math.floor(totalMinutes / 60);
                const minute = totalMinutes % 60;

                let text = "";

                if (hour > 0) {
                    text += `${hour} ${hour === 1 ? "Hour" : "Hours"}`;
                }

                if (minute > 0) {

                    if (text) {
                        text += " ";
                    }

                    text += `${minute} ${minute === 1 ? "Minute" : "Minutes"}`;
                }

                setDisplayHours(text);

            } else {

                setHours("0");
                setDisplayHours("");

            }

        }

    }, [startTime, endTime]);

    useEffect(() => {

        if (!editingTask) return;

        setDate(dayjs(editingTask.date, "DD/MM/YYYY"));

        setCategory(editingTask.category);

        setTopic(editingTask.topic || "");

        setProjectName(editingTask.projectName || "");

        setTask(editingTask.task);

        setDescription(editingTask.description);

        setHours(editingTask.hours.toString());

        setDisplayHours(editingTask.displayHours);

        setStartTime(
            dayjs(editingTask.startTime, "HH:mm")
        );

        setEndTime(
            dayjs(editingTask.endTime, "HH:mm")
        );

    }, [editingTask]);

    const handleCategoryChange = (
        event: SelectChangeEvent
    ) => {

        const value = event.target.value as
            "Learning" | "Assignment" | "";

        setCategory(value);

        if (value === "Learning") {
            setProjectName("");
        }

        if (value === "Assignment") {
            setTopic("");
        }
    };
    const handleSave = () => {
        const newErrors = {
            date: "",
            category: "",
            topic: "",
            projectName: "",
            task: "",
            description: "",
            startTime: "",
            endTime: "",
            hours: "",
        };
        if (!date) {

            newErrors.date = "Date is required";

        }
        if (!startTime) {

            newErrors.startTime = "Start Time is required";

        }
        if (!endTime) {

            newErrors.endTime = "End Time is required";

        }
        if (
            startTime &&
            endTime &&
            endTime.isBefore(startTime)
        ) {

            newErrors.endTime =
                "End Time cannot be earlier than Start Time";

        }
        if (Number(hours) <= 0) {

            newErrors.hours =
                "Hours cannot be zero";

        }
        if (!category) {

            newErrors.category = "Category is required";

        }
        if (!task.trim()) {

            newErrors.task = "Task is required";

        } else if (task.trim().length < 5) {

            newErrors.task =
                "Task must contain at least 5 characters";

        }
        if (!description.trim()) {

            newErrors.description =
                "Description is required";

        } else if (description.trim().length < 20) {

            newErrors.description =
                "Description must contain at least 20 characters";

        }
        if (
            category === "Learning" &&
            !topic.trim()
        ) {

            newErrors.topic =
                "Topic is required";

        }
        if (
            category === "Assignment" &&
            !projectName.trim()
        ) {

            newErrors.projectName =
                "Project Name is required";

        }
        if (
            Object.values(newErrors).some(
                (error) => error !== ""
            )
        ) {

            setErrors(newErrors);

            return;

        }

        const newTask: Task = {
            id: editingTask
                ? editingTask.id
                : Date.now(),
            userId: currentUser!.id,
            date: date ? date.format("DD/MM/YYYY") : "",
            category,
            task,
            description,
            hours,
            displayHours,
            startTime: startTime ? startTime.format("HH:mm") : "",
            endTime: endTime ? endTime.format("HH:mm") : "",
            topic: category === "Learning" ? topic : undefined,
            projectName: category === "Assignment" ? projectName : undefined,
        };
        onSave(newTask);
        console.log(newTask);
        resetForm();
        handleClose();

    };
    return (

        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>

                {editingTask
                    ? "Edit Task"
                    : "Add Task"}

            </DialogTitle>

            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        sx={{
                            width: "100%",
                            mt: 2,
                        }}
                        slotProps={{
                            textField: {
                                error: !!errors.date,
                                helperText: errors.date,
                            },
                        }}
                    />
                    <FormControl
                        fullWidth
                        sx={{ mt: 3 }}
                        error={!!errors.category}
                    >

                        <InputLabel>
                            Category
                        </InputLabel>

                        <Select
                            value={category}
                            label="Category"
                            displayEmpty
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="Learning">
                                Learning
                            </MenuItem>

                            <MenuItem value="Assignment">
                                Assignment
                            </MenuItem>

                        </Select>
                        <Typography
                            color="error"
                            variant="caption"
                        >
                            {errors.category}
                        </Typography>
                        {category === "Learning" && (

                            <TextField
                                fullWidth
                                label="Topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                error={!!errors.topic}
                                helperText={errors.topic}
                                sx={{ mt: 3 }}
                            />

                        )}
                        {category === "Assignment" && (

                            <TextField
                                fullWidth
                                label="Project Name"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                error={!!errors.projectName}
                                helperText={errors.projectName}
                                sx={{ mt: 3 }}
                            />

                        )}
                        <TextField
                            fullWidth
                            label="Task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            error={!!errors.task}
                            helperText={errors.task}
                            sx={{ mt: 3 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            error={!!errors.description}
                            helperText={errors.description}
                            sx={{ mt: 3 }}
                        />
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={(newValue) => setStartTime(newValue)}
                            sx={{
                                width: "100%",
                                mt: 3,
                            }}
                            slotProps={{
                                textField: {
                                    error: !!errors.startTime,
                                    helperText: errors.startTime,
                                },
                            }}
                        />

                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={(newValue) => setEndTime(newValue)}
                            sx={{
                                width: "100%",
                                mt: 3,
                            }}
                            slotProps={{
                                textField: {
                                    error: !!errors.endTime,
                                    helperText: errors.endTime,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Hours"
                            value={displayHours}
                            error={!!errors.hours}
                            helperText={errors.hours}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            sx={{ mt: 3 }}
                        />

                    </FormControl>
                </LocalizationProvider>

            </DialogContent>


            <DialogActions>

                <Button
                    color="error"
                    onClick={() => {
                        resetForm();
                        handleClose();
                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}

                >
                    {editingTask
                        ? "Update"
                        : "Save"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}
