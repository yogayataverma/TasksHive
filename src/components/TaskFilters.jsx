import { FaList, FaCheck, FaArchive, FaStar } from 'react-icons/fa';

export default function TaskFilters({ onChange }) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-400 mb-2">Task Status</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => onChange({ completed: false })}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-100 transition-colors"
              title="Active Tasks"
            >
              <FaList className="text-blue-400" />
              <span>Active</span>
            </button>
            <button
              onClick={() => onChange({ completed: true })}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-100 transition-colors"
              title="Completed Tasks"
            >
              <FaCheck className="text-green-400" />
              <span>Completed</span>
            </button>
            <button
              onClick={() => onChange({ archived: true })}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-100 transition-colors"
              title="Archived Tasks"
            >
              <FaArchive className="text-purple-400" />
              <span>Archived</span>
            </button>
            <button
              onClick={() => onChange({ important: true })}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-100 transition-colors"
              title="Important Tasks"
            >
              <FaStar className="text-yellow-400" />
              <span>Important</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
