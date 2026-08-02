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
    TextField
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
}

export default function AddTaskDialog({
    open,
    handleClose,
    onSave
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
        if (!category) {
            alert("Please select category");
            return;
        }

        if (!task.trim()) {
            alert("Please enter task");
            return;
        }

        if (!description.trim()) {
            alert("Please enter description");
            return;
        }

        if (category === "Learning" && !topic.trim()) {
            alert("Please enter topic");
            return;
        }

        if (category === "Assignment" && !projectName.trim()) {
            alert("Please enter project name");
            return;
        }

        const newTask: Task = {
            id: Date.now(),
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
                Add Task
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
                    />
                    <FormControl
                        fullWidth
                        sx={{ mt: 3 }}
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
                        {category === "Learning" && (

                            <TextField
                                fullWidth
                                label="Topic"
                                required
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                sx={{ mt: 3 }}
                            />

                        )}
                        {category === "Assignment" && (

                            <TextField
                                fullWidth
                                required
                                label="Project Name"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                sx={{ mt: 3 }}
                            />

                        )}
                        <TextField
                            fullWidth
                            label="Task"
                            required
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            sx={{ mt: 3 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            required
                            rows={4}
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                        />
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={(newValue) => setEndTime(newValue)}
                            sx={{
                                width: "100%",
                                mt: 3,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Hours"
                            value={displayHours}
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
                    Save
                </Button>

            </DialogActions>

        </Dialog>

    );

}

