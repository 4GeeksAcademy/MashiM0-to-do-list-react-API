import React, { useState, useEffect } from "react";

let nextId = 0;

const todoAPI = 'https://playground.4geeks.com/todo';

//create your first component
const Home = () => {
	const [task, setTask] = useState("")
	const [tasks, setTasks] = useState([]);

	async function createUser() {
		try {
			const response = await fetch(`${todoAPI}/users/johnusername`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
			return await response.json()
		} catch {
			return false;
		}
	}

	async function handleKeypress(e) {
		if (e.keyCode === 13) {
			if (task === "") alert("Cannot add an empty task");
			else {
				const respuesta = await loadOnApi(task)
				console.log(respuesta)
				if (respuesta) {
					setTasks(
						[
							...tasks,
							{ id: respuesta.id, label: task }
						]);
					setTask("");
				}
			}
		}
	};


	async function loadOnApi(taskName) {
		try {
			const response = await fetch(`${todoAPI}/todos/johnusername`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"label": taskName,
					"is_done": false
				})
			})
			return await response.json()
		} catch {
			return false;
		}
	}

	useEffect(() => {
		createUser();
		fetch(`${todoAPI}/users/johnusername`)
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}

				return response.json();
			})
			.then(responseAsJson => {
				setTasks(responseAsJson.todos)
				// Do stuff with the JSONified response

				console.log(responseAsJson);
			})
			.catch(error => {
				console.log("ERROR", error)
			})

	}, [])

	async function deleteTaskOnAPI(id) {
		try {
			const response = await fetch(`${todoAPI}/todos/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				}
			})
			console.log(await response.json())
			return await response.json()
		} catch (error) {
			console.log(error)
			return false;
		}
	}

	async function deleteTask(id) {
		const respuesta = await deleteTaskOnAPI(id)
		console.log(respuesta)
		if (!respuesta) {
			setTasks(
				tasks.filter(a =>
					a.id !== id
				)
			)
		};
	}

	async function deleteUserOnAPI() {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/johnusername`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				}
			})
			if (response.status == 204) {
				setTasks([])
			}
		} catch (error) {
			console.log(error)
			return false;
		}
	}

	return (
		<>
		<div className="d-flex justify-content-center" onClick={() => console.log(tasks)}>
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
					<input className="col" label="What the dog doin" type="text" value={task}
						onChange={e => setTask(e.target.value)} onKeyUp={handleKeypress} />
				</div>
				<div className="border-bottom p-1 mb-3" />
				<div className="tasks">
					<ul className="list-group p-1">
						{tasks.map(x => (
							<li className="list-group-item d-flex justify-content-between" key={x.id} style={{ height: "56px" }}>
								<p className="text-primary-emphasis my-auto">{x.label}</p>
								<button className="btn btn-danger" style={{ visibility: "hidden" }} onClick={() => {
									deleteTask(x.id)
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
		<div className="container d-flex align-content-center">
					<button className="btn btn-success m-auto" onClick={deleteUserOnAPI}>Delete all tasks</button>
					</div>
					</>
	);
};

export default Home;