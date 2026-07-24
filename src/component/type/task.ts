export interface Task{

id:number;

userId:number;

date:string;

category:"Learning" | "Assignment";

task:string;

description:string;

hours:number;

topic?:string;

projectName?:string;

}