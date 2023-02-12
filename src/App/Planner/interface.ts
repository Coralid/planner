import EventData from "./Event/interface";

export default interface PlannerData {
    title: string;
    categories: {
        [key: string]: {
            title: string;
            theme: string;
            priority: number;
            syncTarget: string;
        }
    }
    events: {
        [key: string]: EventData
    }
    syncTargetDomain: "https://nkcschools.instructure.com/api/v1/"
}