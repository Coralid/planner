import React from "react";


function get(path: string) {
    return {
        title: "My Planner",
        categories: {
            "g2o0sf": {
                title: "My Category",
                theme: "#6600ff",
                priority: 0,
                syncTarget: "courses/79996/"
            }
        },
        events: {
            "3rnv89": {
                id: "3rnv89",
                title: "Heu, alter tabes!",
                category: "g2o0sf",
                type: "assignment",
                description: "A falsis, onus albus bromium!\n" +
                    "Ionicis tormentos volare, tanquam primus navis.\n" +
                    "Ubi est dexter frondator?",
                deadline: "2023-02-07T23:59:59Z",
                created: "2023-02-06T23:35:00Z",
                points: 10,
                subTasks: [
                    {
                        description: "Nunquam desiderium impositio",
                        complete: true
                    },
                    {
                        description: "Cur bubo accelerare?",
                        complete: false
                    }
                ],
                syncTarget: "assignments/1717127/"
            }
        },
        syncTargetDomain: "https://nkcschools.instructure.com/api/v1/"
    };
}

class Planner extends React.Component<any, {
    mode: string;
    weekdays: number;
    dates: Date[];
    indexKey: string;
    target: Date;
}> {

    planner: any;

    constructor(props: any) {
        super(props);
        this.planner = get(this.props.plannerId);
        let queue = [];
        for (let i = - new Date().getDay(); i <  - new Date().getDay() + 7; i ++) {
            queue.push(new Date(new Date().getTime() + i * 8.64e7));
        }
        this.state = {
            mode: "Week",
            weekdays: 7,
            dates: queue,
            indexKey: "deadline",
            target: new Date()
        }
    }

    index() {
        let queue: {[key: string]: any} = {};
        for (const eventId in this.planner.events) {
            if (queue[this.planner.events[eventId][this.state.indexKey].substring(0, 10)] == null) {
                queue[this.planner.events[eventId][this.state.indexKey].substring(0, 10)] = [];
            }
            queue[this.planner.events[eventId][this.state.indexKey].substring(0, 10)].push(this.planner.events[eventId]);
        }
        return queue;
    }

    render() {
        const indexedEvents = this.index();
        return (
            <div className="planner">
                <div className="toolbar">
                    <select>
                        <option>{ this.planner.title }</option>
                    </select>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        New Event
                    </button>
                    <input />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {
                                this.state.dates.slice(0, this.state.weekdays).map((date: Date) => {
                                    return (
                                        <th>
                                            {
                                                date.toLocaleDateString('en-US', {
                                                    weekday: "long"
                                                })
                                            }
                                        </th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.target == null ? undefined : [...Array(Math.ceil(this.state.dates.length / this.state.weekdays))].map((value: any, week: number) => {
                                return (
                                    <tr key={week}>
                                        {
                                            this.state.dates.slice(week * this.state.weekdays, week * this.state.weekdays + this.state.weekdays).map((date: Date) => {
                                                return (
                                                    <td key={date.toISOString()}>
                                                        <div className={"day-heading" + (date.toISOString().substring(0, 10) === this.state.target.toISOString().substring(0, 10) ? " target" : "")}>
                                                            {
                                                                date.toLocaleDateString('en-US', {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric"
                                                                })
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                (indexedEvents[date.toISOString().substring(0, 10)] ?? []).map((event: any) => {
                                                                    return (
                                                                        <div className="day-content" key={event.id}>
                                                                            {event.title}
                                                                            <br />
                                                                            <span className="event-description">
                                                                                ({event.points} points)
                                                                                <br />
                                                                                {event.description.substring(0, 100)}...
                                                                                <br/>
                                                                                Due By: {new Date(event.deadline).toLocaleDateString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}
                                                                                <br />
                                                                                Created: {new Date(event.created).toLocaleDateString('en-US', {year: "numeric", month: "numeric", day: "numeric"})}
                                                                                <br />
                                                                                <ul>
                                                                                    {
                                                                                        event.subTasks.map((task: any) => {
                                                                                            return (
                                                                                                <li className={task.complete ? "complete" : ""}>
                                                                                                    {task.description}
                                                                                                </li>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </ul>
                                                                                <a href={this.planner.syncTargetDomain + this.planner.categories[event.category].syncTarget + event.syncTarget}>View Source</a>
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                }) ?? undefined
                                                            }
                                                        </div>
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <div className="toolbar">
                    <select value={this.state.mode} onChange={this.updateMode.bind(this)}>
                        <option>Work Week</option>
                        <option>Day</option>
                        <option>Week</option>
                        <option>Month</option>
                    </select>
                    <button onClick={this.navBackward.bind(this)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </button>
                    <input type="date"
                           value={this.state.target.toISOString().substring(0, 10)}
                           onChange={this.updateTarget.bind(this)}
                    />
                    <button onClick={this.navForward.bind(this)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>
                    <select value={this.state.indexKey} onChange={this.updateFilter.bind(this)}>
                        <option>deadline</option>
                        <option>created</option>
                    </select>
                </div>
            </div>
        );
    }

    navForward(event: React.MouseEvent<HTMLButtonElement>) {
        const target = new Date(this.state.target.getTime() + this.state.dates.length * 8.64e7);
        this.setState({
            target: target
        });
        let queue = [];
        switch (this.state.mode) {
            default:
                for (let i = 1; i < 6; i ++) {
                    queue.push(new Date(target.getTime() - (target.getDay() - i) * 8.64e7))
                }
                this.setState({
                    weekdays: 5,
                    dates: queue
                });
                break;
            case "Day":
                queue = [ target ];
                this.setState({
                    weekdays: 1,
                    dates: queue
                });
                break;
            case "Week":
                for (let i = - target.getDay(); i <  - target.getDay() + 7; i ++) {
                    queue.push(new Date(target.getTime() + i * 8.64e7));
                }
                this.setState({
                    weekdays: 7,
                    dates: queue
                });
                break;
            case "Month":
                for (let i = - target.getDate() - new Date(target.getTime() - target.getDate() * 8.64e7).getDay(); i < - target.getDate() - new Date(target.getTime() - target.getDate() * 8.64e7).getDay() + 28; i ++) {
                    queue.push(new Date(target.getTime() + i * 8.64e7));
                }
                this.setState({
                    weekdays: 7,
                    dates: queue
                });
                break;
        }
    }
    navBackward(event: React.MouseEvent<HTMLButtonElement>) {
        const target = new Date(this.state.target.getTime() - this.state.dates.length * 8.64e7);
        this.setState({
            target: target
        });
        let queue = [];
        switch (this.state.mode) {
            default:
                for (let i = 1; i < 6; i ++) {
                    queue.push(new Date(target.getTime() - (target.getDay() - i) * 8.64e7))
                }
                this.setState({
                    weekdays: 5,
                    dates: queue
                });
                break;
            case "Day":
                queue = [ target ];
                this.setState({
                    weekdays: 1,
                    dates: queue
                });
                break;
            case "Week":
                for (let i = - target.getDay(); i <  - target.getDay() + 7; i ++) {
                    queue.push(new Date(target.getTime() + i * 8.64e7));
                }
                this.setState({
                    weekdays: 7,
                    dates: queue
                });
                break;
            case "Month":
                for (let i = - target.getDate() - new Date(target.getTime() - target.getDate() * 8.64e7).getDay(); i < - target.getDate() - new Date(target.getTime() - target.getDate() * 8.64e7).getDay() + 28; i ++) {
                    queue.push(new Date(target.getTime() + i * 8.64e7));
                }
                this.setState({
                    weekdays: 7,
                    dates: queue
                });
                break;
        }
    }

    updateMode(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setMode(event.target.value);
    }

    updateTarget(event: React.ChangeEvent<HTMLInputElement>) {
        this.setTarget(new Date(event.target.value.replace(/-/g, '/')));
    }

    updateFilter(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setFilter(event.target.value);
    }

    setMode(mode: string) {
        this.setState({
            mode: mode
        });
        let queue = [];
        switch (mode) {
            default:
                for (let i = 1; i < 6; i ++) {
                    queue.push(new Date(this.state.target.getTime() - (this.state.target.getDay() - i) * 8.64e7))
                }
                this.setState({
                    weekdays: 5,
                    dates: queue
                });
                break;
            case "Day":
                queue = [ this.state.target ];
                this.setState({
                    weekdays: 1,
                    dates: queue
                });
                break;
            case "Week":
                for (let i = - this.state.target.getDay(); i <  - this.state.target.getDay() + 7; i ++) {
                    queue.push(new Date(this.state.target.getTime() + i * 8.64e7));
                }
                this.setState({
                    weekdays: 7,
                    dates: queue
                });
                break;
            case "Month":
                for (let i = - this.state.target.getDate() - new Date(this.state.target.getTime() - this.state.target.getDate() * 8.64e7).getDay(); i < - this.state.target.getDate() - new Date(this.state.target.getTime() - this.state.target.getDate() * 8.64e7).getDay() + 28; i ++) {
                    queue.push(new Date(this.state.target.getTime() + i * 8.64e7));
                }
                this.setState({
                    weekdays: 7,
                    dates: queue
                });
                break;
        }
    }

    setTarget(target: Date) {
        this.setState({
            target: target
        });
        let queue = [];
        switch (this.state.mode) {
            default:
                for (let i = 1; i < 6; i ++) {
                    queue.push(new Date(target.getTime() - (target.getDay() - i) * 8.64e7))
                }
                this.setState({
                    weekdays: 5,
                    dates: queue
                });
                break;
            case "Day":
                queue = [ target ];
                this.setState({
                    weekdays: 1,
                    dates: queue
                });
                break;
            case "Week":
                for (let i = - target.getDay(); i <  - target.getDay() + 7; i ++) {
                    queue.push(new Date(target.getTime() + i * 8.64e7));
                }
                this.setState({
                    weekdays: 7,
                    dates: queue
                });
                break;
            case "Month":
                for (let i = - target.getDate() - new Date(target.getTime() - target.getDate() * 8.64e7).getDay(); i < - target.getDate() - new Date(target.getTime() - target.getDate() * 8.64e7).getDay() + 28; i ++) {
                    queue.push(new Date(target.getTime() + i * 8.64e7));
                }
                this.setState({
                    weekdays: 7,
                    dates: queue
                });
                break;
        }
    }

    setFilter(key: string) {
        this.setState({
            indexKey: key
        });
    }
}

export default Planner;