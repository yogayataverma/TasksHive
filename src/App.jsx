import { useEffect, useState } from 'react';
import {
   getTasks,
  addTask,
  toggleComplete,
  toggleImportant,
  archiveTask,
  unarchiveTask,
  deleteTask,
  updateTask,
} from '../api';

import TaskForm    from './components/TaskForm';
import TaskItem    from './components/TaskItem';
import TaskFilters from './components/TaskFilters';
import Logo        from './components/Logo';

export default function App() {
  const [tasks, setTasks]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filters, setFilters]   = useState({ completed: false });
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getTasks(filters)
      .then(data => {
        if (!cancelled) {
          const filteredTasks = data.filter(task => {
            if (filters.completed === false && task.isCompleted) return false;
            if (filters.completed === true && !task.isCompleted) return false;
            if (filters.important && !task.isImportant) return false;
            if (filters.archived && !task.isArchived) return false;
            if (filters.completed === false && task.isArchived) return false;
            return true;
          });
          setTasks(filteredTasks);
          setLoading(false);
        }
      })
      .catch(err => !cancelled && (setError(err.message), setLoading(false)));
    return () => { cancelled = true; };
  }, [filters]);

  const handleAdd = async (title) => {
    const newTask = await addTask({ title });
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggleComplete = async (id) => {
    const updated = await toggleComplete(id);
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
    
    if (filters.completed === false && updated.isCompleted) {
      setTasks(prev => prev.filter(t => t._id !== id));
    }

    if (filters.completed === true && !updated.isCompleted) {
      setTasks(prev => prev.filter(t => t._id !== id));
    }
  };

  const handleToggleImportant = async (id) => {
    const updated = await toggleImportant(id);
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
    if (filters.important && !updated.isImportant) {
      setTasks(prev => prev.filter(t => t._id !== id));
    }
  };

  const handleArchive = async (id) => {
    const updated = await archiveTask(id);
    setTasks(prev => prev.map(t => t._id === id ? updated : t));

    if (filters.completed === false) {
      setTasks(prev => prev.filter(t => t._id !== id));
    }
  };

  const handleUnarchive = async (id) => {
    const updated = await unarchiveTask(id);
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
    if (filters.archived) {
      setTasks(prev => prev.filter(t => t._id !== id));
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  const handleUpdate = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks(prev => prev.map(t => t._id === id ? updated : t));
  };

  const actions = { 
    handleToggleComplete, 
    handleToggleImportant, 
    handleArchive, 
    handleUnarchive,
    handleDelete, 
    handleUpdate 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Logo className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-indigo-400">
            TaskHive
          </h1>
        </div>

        <TaskForm onAdd={handleAdd} />

        <TaskFilters onChange={setFilters} />

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400 mx-auto"></div>
            <p className="mt-2 text-gray-400">Loading tasks...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {!loading && !tasks.length && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-lg">No tasks found</p>
          </div>
        )}

        <div className="space-y-3">
          {tasks.map(t => (
            <TaskItem key={t._id} task={t} {...actions} />
          ))}
        </div>
      </div>
    </div>
  );
}
