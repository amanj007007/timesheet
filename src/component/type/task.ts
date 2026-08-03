export interface Task {
    id: number;
    userId: number;
    date: string;
    category: "Learning" | "Assignment";
    task: string;
    description: string;
    displayHours: string;
    hours:number;
    startTime: string;
    endTime: string;
    topic?: string;
    projectName?: string;
}