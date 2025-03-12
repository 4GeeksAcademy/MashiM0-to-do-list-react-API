import React, { useState } from "react";

let nextId = 0;

//create your first component
const Home = () => {
	const [task, setTask] = useState("")
	const [tasks, setTasks] = useState([]);

	return (
		<div className="d-flex justify-content-center">
			<div className="text-center taskpad m-5 card p-2">
				<div className="row px-3 d-flex justify-content-between">
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
					<div className="hole px-1 mx-1" />
				</div>
				<h1 className="mt-3 fw-bold mb-0">To-do</h1>
				<div className="row p-3">
					<input className="col-9" label="What the dog doin" type="text" value={task} onChange={e => setTask(e.target.value)} />
					<button className="col ms-2 btn btn-info fw-bold text-light" onClick={() => {
						if(task === "") alert("Cannot add an empty task");
						else {
						setTasks(
						[
							...tasks,
							{ id: nextId++, name: task }
						]);
						setTask("");
					}
					}}>
						Add
					</button>
				</div>
				<div className="border-bottom p-1 mb-3" />
				<div className="tasks">
					<ul className="list-group p-1">
						{tasks.map(x => (
							<li className="list-group-item d-flex justify-content-between" key={x.id} style={{ height: "56px" }}>
								<p className="text-primary-emphasis my-auto">{x.name}</p>
								<button className="btn btn-danger" style={{visibility:"hidden"}} onClick={() => {
									setTasks(
										tasks.filter(a =>
											a.id !== x.id
										)
									);
								}}>
									X
								</button>
							</li>

						))}
					</ul>
					<div className="border-bottom p-1 mb-2" />
					<div className="text-body-tertiary"> There are {tasks.length == 0 ? "no" : tasks.length} tasks left. {tasks.length == 0 ? "Good Job!" : " "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;