"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editForm, seteditForm] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const date = new Date().toISOString().split("T")[0]; // today's date
  const [data, setData] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // ✅ search flag

  // create task
  async function formData(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, startDate, content, deadline }),
      });
      await response.json();
      fetchTasks();
      setTask("");
      setStartDate("");
      setContent("");
      setDeadline("");
    } catch (error) {
      console.log(error);
    }
  }

  // fetch all tasks
  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:8000/tasks");
      const data = await response.json();
      setTasks(data);
      setsearchResult([]);
      setIsSearching(false); // ✅ reset search mode
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // delete task
  async function deleteTask(_id) {
    try {
      await fetch(`http://localhost:8000/delete/${_id}`, { method: "DELETE" });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  // open edit modal
  async function editTask(_id) {
    try {
      const response = await fetch(`http://localhost:8000/edit/${_id}`);
      const data = await response.json();
      setTask(data.task);
      setStartDate(data.startDate);
      setContent(data.content);
      setDeadline(data.deadline);
      setCurrentId(_id);
      seteditForm(true);
    } catch (err) {
      console.error(err);
    }
  }

  // save edited task
  async function updateTask() {
    try {
      await fetch(`http://localhost:8000/update/${currentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, startDate, content, deadline }),
      });
      fetchTasks();
      seteditForm(false);
      setTask("");
      setStartDate("");
      setContent("");
      setDeadline("");
      setCurrentId(null);
    } catch (err) {
      console.error(err);
    }
  }
  
// search tasks
async function searchformData(e) {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:8000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const val = await response.json();
    setsearchResult(Array.isArray(val) ? val : [val]); // ✅ ensure array
    setIsSearching(true);
  } catch (err) {
    console.error(err);
  }
}


  // which list to render
  const displayedTasks = isSearching ? searchResult : tasks;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 text-gray-900">

      {/* --- EDIT MODAL --- */}
      {editForm && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Task
                </h3>
                <button
                  onClick={() => seteditForm(false)}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                >
                  ✖
                </button>
              </div>

              <div className="p-4 space-y-4">
                <input
                  type="text"
                  placeholder="Edit task title"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <textarea
                  placeholder="Edit content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex items-center justify-end p-4 border-t border-gray-200">
                <button
                  onClick={() => seteditForm(false)}
                  className="py-2 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={updateTask}
                  className="ml-3 py-2 px-5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ADD TASK FORM --- */}
      <div className="w-full lg:w-1/3 flex justify-center items-start lg:items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <form
          onSubmit={formData}
          className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
            Add New Task
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            Organize your work efficiently 🚀
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Task</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={date}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Content</label>
              <textarea
                placeholder="Enter details..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow-md"
            >
              ➕ Add Task
            </button>
          </div>
        </form>
      </div>

      {/* --- TASK LIST --- */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 justify-center flex">
          📋 Your Tasks
        </h2>

        <form className="max-w-md mx-auto flex gap-2" onSubmit={searchformData}>
          <div className="relative flex-1">
            <input
              type="search"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="block w-full p-4 ps-3 text-sm text-black border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search tasks..."
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
          {isSearching && (
            <button
              type="button"
              onClick={fetchTasks}
              className="text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-4 py-2"
            >
              Clear
            </button>
          )}
        </form>

        <hr className="m-2" />

        {displayedTasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedTasks.map((data) => (
              <div
                key={data._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-200"
              >
                <h5 className="text-lg font-semibold text-gray-900 mb-2">
                  {data.task}
                </h5>
                <p className="text-sm text-gray-600">🟢 Start: {data.startDate}</p>
                <p className="text-sm text-gray-600">⏳ Deadline: {data.deadline}</p>
                <p className="text-gray-700 mt-2">📖 {data.content}</p>

                <div className="flex gap-4 mt-5">
                  <button
                    onClick={() => deleteTask(data._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 font-medium"
                  >
                    ❌ Delete
                  </button>

                  <button
                    onClick={() => editTask(data._id)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
