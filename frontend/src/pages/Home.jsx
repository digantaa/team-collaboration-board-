import { useState } from "react";
import BoardList from "../components/BoardList";
import TaskList from "../components/TaskList";

export default function Home() {
  const [selectedBoard, setSelectedBoard] = useState(null);

  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      <div className="w-1/4 bg-white p-4 rounded-xl shadow">
        <BoardList onSelect={setSelectedBoard} />
      </div>
      <div className="flex-1 bg-white p-4 rounded-xl shadow">
        <TaskList boardId={selectedBoard} />
      </div>
    </div>
  );
}
