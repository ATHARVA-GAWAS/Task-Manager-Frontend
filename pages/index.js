import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import styles from '../styles/Home.module.css';

// Define the API URL using environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasks`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);
  console.log('MongoDB URI:', process.env.MONGODB_URI);

  // Refresh tasks list and clear editing task
  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/tasks`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        setEditingTask(null);
      } else {
        console.error('Failed to save task');
      }
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Set the task to be edited
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // Delete task and refresh task list
  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/tasks/${id}`, { method: 'DELETE' });
      handleSave();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Manager</h1>
      <TaskForm task={editingTask} onSave={handleSave} />
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
