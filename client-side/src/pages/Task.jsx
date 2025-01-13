import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import MainLayout from '../layouts/MainLayout';
import API_URL from '../components/utils/url';
import { toast } from 'react-toastify';

const Task = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const mode = taskId === undefined ? "add" : "update";
  const [state, setState] = useState({
    loading: false,
  });
  const [formData, setFormData] = useState({
    description: "",
    title: "",
    completed: false, 
  });
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      if (mode === "update") {
        setState({ ...state, loading: true });
        try {
          const res = await fetch(`${API_URL}/api/tasks/${taskId}`);
          const data = await res.json();
          if (data.status) {
            setTask(data.task);
            setFormData({
              title: data.task.title,
              description: data.task.description,
              completed: data.task.completed || false,
            });
          } else {
            toast.error("Task not found");
          }
        } catch (error) {
          toast.error("Error fetching task data");
          console.error("Error fetching task data:", error);
        } finally {
          setState({ ...state, loading: false });
        }
      }
    };

    fetchTaskData();
  }, [mode, taskId]);

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.checked
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      description: task.description,
      title: task.title,
      completed: task.completed,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const config = {
      method: mode === "add" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const url = mode === "add" ? `${API_URL}/api/tasks` : `${API_URL}/api/tasks/${taskId}`;
    try {
      const res = await fetch(url, config);
      const data = await res.json();
      if (data.status) {
        toast.success(mode === "add" ? "Task added successfully" : "Task updated successfully");
        navigate("/");
      } else {
        toast.error(mode === "add" ? "An error occurred while adding" : "An error occurred while updating");
      }
    } catch (error) {
      toast.error("Internal server error on handleSubmit");
      console.error("Error occurred on handleSubmit", error);
    } finally {
      setState({ ...state, loading: false });
    }
  };

  return (
    <>
      <MainLayout>
        <form className='m-auto my-16 max-w-4xl bg-white p-8 border-2 shadow-lg rounded-lg'>
          {state.loading ? (
            <Loader />
          ) : (
            <>
              <h2 className='text-center text-xl font-semibold mb-6'>
                {mode === "add" ? "Add New Task" : "Edit Task"}
              </h2>

              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title..."
                  required
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label htmlFor="description" className="block text-gray-700 font-medium mt-4 mb-2">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description..."
                  required
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="completed" className="block text-gray-700 font-medium mb-2">Completed</label>
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Mark as completed</span>
              </div>

              <div className="flex justify-between items-center">
                <button
                  className="bg-blue-600 text-white px-6 py-3 font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSubmit}
                  disabled={state.loading}
                >
                  {mode === "add" ? "Add Task" : "Update Task"}
                </button>
                <button
                  className="ml-4 bg-red-600 text-white px-6 py-3 font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                {mode === "update" && (
                  <button
                    className="ml-4 bg-yellow-500 text-white px-6 py-3 font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </MainLayout>
    </>
  );
};

export default Task;
