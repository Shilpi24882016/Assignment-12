import { useState } from "react";
import { produce } from "immer";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Assignment", completed: false },
    { id: 2, text: "Kitchen turn", completed: false },
    { id: 3, text: "daily goal", completed: false }
  ]);

  const [input, setInput] = useState("");

  // ➕ Add Task
  const addTask = () => {
    if (!input.trim()) return;

    setTodos(
      produce((draft) => {
        draft.push({
          id: Date.now(),
          text: input,
          completed: false
        });
      })
    );

    setInput("");
  };

  // ❌ Delete Task
  const deleteTask = (id) => {
    setTodos(
      produce((draft) => {
        return draft.filter((todo) => todo.id !== id);
      })
    );
  };

  // ✏️ Update Task (toggle checkbox)
  const toggleTask = (id) => {
    setTodos(
      produce((draft) => {
        const task = draft.find((t) => t.id === id);
        if (task) task.completed = !task.completed;
      })
    );
  };

  return (
    <div>
      <h1>Todo Application</h1>

      <input
        type="text"
        placeholder="Enter a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <h2>Task List</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </span>

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTask(todo.id)}
            />

            <button onClick={() => deleteTask(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}