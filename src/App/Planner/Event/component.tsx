import React from "react";
import PlannerData from "../interface";
import EventData from "./interface";

class Event extends React.Component<{src: EventData, planner: PlannerData}, any> {

    planner: PlannerData;
    id: string;

    constructor(props: any) {
        super(props);
        this.planner = this.props.planner;
        this.id = this.props.src.id;
        this.state = {
            ...this.props.src,
            id: null
        };
    }

    render() {
        return (
            <div className="day-content" key={this.id}>
                <span style={{color: this.planner.categories[this.state.category].theme}}>
                    {this.planner.categories[this.state.category].title}:&nbsp;
                </span>
                {this.state.title}
                <br />
                <span className="event-description">
                    ({this.state.points} points)
                    <br />
                    {this.state.description.substring(0, 100)}...
                    <br/>
                    Due By: {new Date(this.state.deadline).toLocaleDateString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}
                    <br />
                    Created: {new Date(this.state.created).toLocaleDateString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}
                    <br />
                    <ul>
                    {
                        this.state.subTasks.map((task: any) => {
                            return (
                                <li className={task.complete ? "complete" : ""}>
                                    {task.description}
                                </li>
                            )
                        })
                    }
                    </ul>
                    <a href={this.planner.syncTargetDomain + this.planner.categories[this.state.category].syncTarget + this.state.syncTarget}>View Source</a>
                </span>
            </div>
        );
    }

}

export default Event;