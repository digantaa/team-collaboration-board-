import { useEffect, useState } from "react";
import axios from "axios";

export default function BoardList({ onSelect }) {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/boards")
      .then(res => setBoards(res.data));
  }, []);

  const addBoard = async () => {
    if (!name) return;
    const res = await axios.post("http://localhost:5000/api/boards", { name });
    setBoards([...boards, res.data]);
    setName("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-stone-600 ">Boards</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full rounded-md"
          placeholder="Add new board"
        />
        <button
          onClick={addBoard}
          className="bg-stone-600 hover:bg-stone-700 text-white px-3 py-2 rounded-md"
        >
          +
        </button>
      </div>

      <ul>
        {boards.map(b => (
          <li
            key={b._id}
            onClick={() => onSelect(b._id)}
            className="p-2 mb-2 rounded-md cursor-pointer hover:bg-stone-100"
          >
            {b.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
