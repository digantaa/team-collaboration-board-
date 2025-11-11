import { useEffect, useState } from "react";
import axios from "axios";

export default function TaskList({ boardId }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    assignedTo: "",
    dueDate: ""
  });

  useEffect(() => {
    if (boardId)
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${boardId}`).then(res => setTasks(res.data));
  }, [boardId]);

  const addTask = async () => {
    if (!task.title) return alert("Title required");
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, { ...task, boardId });
    setTasks([...tasks, res.data]);
    setTask({ title: "", description: "", status: "To Do", priority: "Medium", assignedTo: "", dueDate: "" });
  };

  const updateStatus = async (id, status) => {
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`, { status });
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  if (!boardId) return <p className="text-gray-500">Select a board to view tasks</p>;

  const grouped = {
    "To Do": tasks.filter(t => t.status === "To Do"),
    "In Progress": tasks.filter(t => t.status === "In Progress"),
    "Done": tasks.filter(t => t.status === "Done")
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-stone-600">Tasks</h2>

      <div className="flex gap-2 mb-6">
        <input className="border p-2 rounded-md w-1/4" placeholder="Title"
          value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} />
        <input className="border p-2 rounded-md w-1/4" placeholder="Assigned To"
          value={task.assignedTo} onChange={e => setTask({ ...task, assignedTo: e.target.value })} />
        <select className="border p-2 rounded-md" value={task.priority}
          onChange={e => setTask({ ...task, priority: e.target.value })}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <input type="date" className="border p-2 rounded-md"
          value={task.dueDate} onChange={e => setTask({ ...task, dueDate: e.target.value })} />
        <button onClick={addTask} className="bg-stone-600 hover:bg-stone-700 text-white px-3 py-2 rounded-md">Add</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Object.keys(grouped).map(status => (
          <div key={status} className="bg-gray-100 p-3 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">{status}</h3>
            {grouped[status].map(t => (
              <div key={t._id} className="bg-white p-3 rounded-md shadow mb-2">
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-gray-600">{t.description}</p>
                <p className="text-xs text-gray-500">Assigned to: {t.assignedTo || "N/A"}</p>
                <p className="text-xs text-gray-500">Priority: {t.priority}</p>
                <p className="text-xs text-gray-500">Due: {t.dueDate ? t.dueDate.slice(0,10) : "—"}</p>

                <select className="border mt-2 p-1 rounded-md w-full text-sm"
                  value={t.status} onChange={e => updateStatus(t._id, e.target.value)}>
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>

                <button onClick={() => deleteTask(t._id)} className="mt-2 text-red-500 text-sm">
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
