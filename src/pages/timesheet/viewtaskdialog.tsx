import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { Task } from "../../component/type/task";

interface Props {
    open: boolean;
    handleClose: () => void;
    tasks: Task[];
    date: string;
}

export default function ViewTaskDialog({
    open,
    handleClose,
    tasks,
    date,
}: Props) {

    const sortedTasks = [...tasks].sort((a, b) => {

        return a.startTime.localeCompare(b.startTime);

    });

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                Tasks - {date}

            </DialogTitle>

            <DialogContent>

                {tasks.length === 0 ? (

                    <Typography>
                        No Tasks Found
                    </Typography>

                ) : (

                    sortedTasks.map((task) => (

                        <Accordion key={task.id} sx={{ mt: 2 }}>

                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >

                                <Typography sx={{ fontWeight: "bold" }}>
                                    {task.task}
                                </Typography>

                            </AccordionSummary>

                            <AccordionDetails>

                                <Box>

                                    <Typography>
                                        <strong>Category:</strong> {task.category}
                                    </Typography>

                                    <Typography sx={{ mt: 1 }}>
                                        <strong>
                                            {task.category === "Learning"
                                                ? "Topic"
                                                : "Project"}
                                            :
                                        </strong>{" "}
                                        {task.category === "Learning"
                                            ? task.topic
                                            : task.projectName}
                                    </Typography>

                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Description:</strong> {task.description}
                                    </Typography>

                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Start Time:</strong> {task.startTime}
                                    </Typography>

                                    <Typography sx={{ mt: 1 }}>
                                        <strong>End Time:</strong> {task.endTime}
                                    </Typography>

                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Duration:</strong> {task.displayHours}
                                    </Typography>

                                </Box>

                            </AccordionDetails>

                        </Accordion>

                    ))

                )}

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