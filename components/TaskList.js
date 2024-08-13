const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
