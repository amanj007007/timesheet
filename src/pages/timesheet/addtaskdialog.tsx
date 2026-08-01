import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
    // type SelectChangeEvent,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";


interface Props {
    open: boolean;
    handleClose: () => void;
}

export default function AddTaskDialog({
    open,
    handleClose,
}: Props) {
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [category, setCategory] = useState("");
    const handleCategoryChange = (
        event: SelectChangeEvent
    ) => {
        setCategory(event.target.value);
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
                </LocalizationProvider>
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
                        onChange={handleCategoryChange}
                    >

                        <MenuItem value="Learning">
                            Learning
                        </MenuItem>

                        <MenuItem value="Assignment">
                            Assignment
                        </MenuItem>

                    </Select>

                </FormControl>
            </DialogContent>


            <DialogActions>

                <Button
                    onClick={handleClose}
                >
                    Close
                </Button>

            </DialogActions>

        </Dialog>

    );

}

