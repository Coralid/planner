export default interface EventData {
    id: string;
    title: string;
    category: string;
    type: "assignment"|"event";
    description: string;
    deadline: string;
    created: string;
    points: number;
    subTasks: { description: string, complete: boolean }[];
    syncTarget: string;
}