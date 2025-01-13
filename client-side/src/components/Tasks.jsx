import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './utils/Loader';
import API_URL from './utils/url';
import { toast } from 'react-toastify';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      } else {
        console.error(data.msg);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        toast.success("Task deleted successfully!");
      } else {
        console.error(data.msg);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <>
      <div className="my-2 mx-auto max-w-full sm:max-w-[700px] py-4">
        {tasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>}

        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className='w-full sm:w-[600px] h-[300px] flex flex-col items-center justify-center gap-4 mt-20 mx-auto'>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">
                  + Add new task
                </Link>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                  <div className='flex'>
                    <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''} truncate w-full`}>
                      {task.title}
                    </span>

                    <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 group relative'>
                      <img
                        src="/icons/edit.png"
                        alt="Edit Task"
                        className="w-5 h-5 cursor-pointer group-hover:opacity-80"
                      />
                      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">Edit</span>
                    </Link>

                    <span
                      className='text-red-500 cursor-pointer group relative'
                      onClick={() => handleDelete(task._id)}
                    >
                      <img
                        src="/icons/delete.png"
                        alt="Delete Task"
                        className="w-5 h-5 group-hover:opacity-80"
                      />
                      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-sm text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">Delete</span>
                    </span>
                  </div>

                  <div className='whitespace-pre overflow-hidden text-ellipsis'>
                    {task.description}
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <span className={`text-sm ${task.completed ? 'text-green-500' : 'text-yellow-500'}`}>
                      {task.completed ? 'Completed' : 'Not Completed'}
                    </span>
                    <span className="text-sm text-gray-500">
                      Created At: {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>


  );
};

export default Tasks;
