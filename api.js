import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://taskshive-1.onrender.com/api',
});


export const getTasks        = (params = {})     => api.get('/tasks', { params }).then(r => r.data);
export const addTask         = (payload)         => api.post('/tasks', payload).then(r => r.data);
export const updateTask      = (id, payload)     => api.put(`/tasks/${id}`, payload).then(r => r.data);
export const toggleComplete  = (id)              => api.patch(`/tasks/${id}/toggle-complete`).then(r => r.data);
export const toggleImportant = (id)              => api.patch(`/tasks/${id}/toggle-important`).then(r => r.data);
export const archiveTask     = (id)              => api.patch(`/tasks/${id}/archive`).then(r => r.data);
export const unarchiveTask   = (id)              => api.patch(`/tasks/${id}/unarchive`).then(r => r.data);
export const deleteTask      = (id)              => api.delete(`/tasks/${id}`);
