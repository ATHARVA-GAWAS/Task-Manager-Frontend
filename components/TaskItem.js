const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    );
  };
  
  export default TaskItem;
  