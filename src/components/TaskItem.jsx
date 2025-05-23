import { useState } from 'react';
import { FaCheck, FaStar, FaArchive, FaTrash, FaEdit, FaSave, FaUndo } from 'react-icons/fa';

export default function TaskItem({
  task,
  handleToggleComplete,
  handleToggleImportant,
  handleArchive,
  handleUnarchive,
  handleDelete,
  handleUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      handleUpdate(task._id, { title: editedTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(task.title);
    }
  };

  const handleArchiveToggle = () => {
    if (task.isArchived) {
      handleUnarchive(task._id);
    } else {
      handleArchive(task._id);
    }
  };

  return (
    <div
      className={`mb-2 p-4 rounded-lg border flex items-center justify-between transition-colors ${
        task.isCompleted 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-gray-800 border-gray-700'
      } ${task.isArchived ? 'opacity-75' : ''}`}
    >
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-indigo-500"
            autoFocus
          />
        ) : (
          <span
            className={`font-medium ${
              task.isCompleted ? 'line-through text-gray-500' : 'text-gray-100'
            }`}
          >
            {task.title}
          </span>
        )}
        {task.isImportant && (
          <span className="ml-2 text-yellow-400">
            <FaStar />
          </span>
        )}
      </div>

      <div className="flex gap-2 text-sm">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 text-green-400 hover:text-green-300 transition-colors"
              title="Save"
            >
              <FaSave />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(task.title);
              }}
              className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
              title="Cancel"
            >
              <FaUndo />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleToggleComplete(task._id)}
              className={`p-2 transition-colors ${
                task.isCompleted 
                  ? 'text-green-400 hover:text-green-300' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              title={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.isCompleted ? <FaUndo /> : <FaCheck />}
            </button>
            <button
              onClick={() => handleToggleImportant(task._id)}
              className={`p-2 transition-colors ${
                task.isImportant 
                  ? 'text-yellow-400 hover:text-yellow-300' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              title={task.isImportant ? 'Remove from important' : 'Mark as important'}
            >
              <FaStar />
            </button>
            <button
              onClick={handleArchiveToggle}
              className={`p-2 transition-colors ${
                task.isArchived 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              title={task.isArchived ? 'Unarchive' : 'Archive'}
            >
              <FaArchive />
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="p-2 text-red-400 hover:text-red-300 transition-colors"
              title="Delete"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
