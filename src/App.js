import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // ADD
  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, newItem]);
    setNewItem("");
  };

  // DELETE
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // EDIT
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(items[index]);
  };

  const saveEdit = () => {
    const updated = [...items];
    updated[editingIndex] = editingText;
    setItems(updated);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-10">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-indigo-400 text-center mb-10">
        React CRUD Application
      </h1>

      {/* INPUT FORM */}
      <div className="max-w-xl mx-auto flex gap-3 bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />

        <button
          onClick={addItem}
          className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-lg"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="max-w-xl mx-auto mt-10 space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 p-4 rounded-lg flex justify-between items-center border border-slate-700 hover:border-indigo-400 transition"
          >
            {/* EDITING */}
            {editingIndex === index ? (
              <input
                type="text"
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span className="text-lg">{item}</span>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 ml-4">

              {/* Save button */}
              {editingIndex === index ? (
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(index)}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                >
                  Edit
                </button>
              )}

              {/* Delete button */}
              <button
                onClick={() => deleteItem(index)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
