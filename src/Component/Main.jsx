import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import "./main.css";
const filters = { all: "all", active: "active", completed: "completed" };
function Main() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState(filters.all);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const inputRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };
  const handleAddTask = () => {
    if ((inputValue || "").trim() !== "") {
      const newTask = {
        id: Date.now(),
        content: inputValue,
        completed: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInputValue("");
    }
    inputRef.current.focus();
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([...tasks.filter((task) => !task.completed)]);
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case filters.active:
        return tasks.filter((task) => !task.completed);
      case filters.completed:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };
  return (
    <div className="App">
      <div style={{ marginBottom: 20 }}>
        <b>#TODO</b>
      </div>

      <div className="TaskList">
        <div className="Filters">
          <ul style={{ listStyle: "none" }}>
            <li
              className={filter === filters.all ? "active" : ""}
              onClick={() => handleFilterChange(filters.all)}
            >
              All
            </li>
            <li
              className={filter === filters.active ? "active" : ""}
              onClick={() => handleFilterChange(filters.active)}
            >
              Active
            </li>
            <li
              className={filter === filters.completed ? "active" : ""}
              onClick={() => handleFilterChange(filters.completed)}
            >
              Completed
            </li>
          </ul>
        </div>
        {filter === filters.completed ? null : (
          <div
            className="AddTask"
            style={{ listStyle: "none", marginBottom: 10 }}
          >
            <input
              type="text"
              ref={inputRef}
              placeholder="Add details"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <li onClick={handleAddTask} className="addBtn">
              Add
            </li>
          </div>
        )}

        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {getFilteredTasks().map((task) => (
            <ul
              key={task.id}
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task.id)}
                  style={{ width: "20px", height: "20px" }}
                />
                <span className={task.completed ? "completed" : ""}>
                  {task.content}
                </span>
              </div>
              {filter === filters.completed ? (
                <li
                  onClick={() => handleDeleteTask(task.id)}
                  className="btnDel"
                >
                  <i className="bx bx-trash" />
                </li>
              ) : null}
            </ul>
          ))}
        </ul>
        {filter === filters.completed
          ? tasks.filter((task) => task.completed).length > 1 && (
              <div className="TaskActions" style={{ listStyle: "none" }}>
                <li onClick={handleDeleteAllTasks} className="btnDelAll">
                  Delete All
                </li>
              </div>
            )
          : null}
      </div>
    </div>
  );
}

export default Main;
