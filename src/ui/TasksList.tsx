import { useTasks } from "../bll/useTasks";
import { TaskItem } from "./TaskItem";
import { type TaskListItem } from "../dal/api";
import styles from "./TasksList.module.css";

type Props = {
  selectedTaskId: string | null;
  onTaskSelect: (taskId: string | null, boardTaskId: string | null) => void;
};

export const TasksList = ({ selectedTaskId, onTaskSelect }: Props) => {
  const {tasks, setTasks, error } = useTasks()

  const changeTaskStatus = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks
        ? currentTasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  attributes: {
                    ...task.attributes,
                    status: task.attributes.status >= 2 ? 0 : 2,
                  },
                }
              : task,
          )
        : null,
    );
  };

  const handleReset = () => {
    onTaskSelect(null, null);
    setTasks((currentTasks) =>
      currentTasks
        ? currentTasks.map((task) => ({
            ...task,
            attributes: {
              ...task.attributes,
              status: 0,
            },
          }))
        : null,
    );
  };

  const renderTask = (task: TaskListItem) => (
    <TaskItem
      key={task.id}
      task={task}
      onTaskSelect={onTaskSelect}
      changeTaskStatus={changeTaskStatus}
      isSelected={task.id === selectedTaskId}
    />
  );

  if (error) {
    return (
      <div className={styles.container}>
        <h1>Задачи</h1>
        <span>{error}</span>
      </div>
    );
  }

  if (!tasks) {
    return (
      <div className={styles.container}>
        <h1>Загрузка...</h1>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className={styles.container}>
        <h1>Задачи</h1>
        <span>Нет задач</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.reset_button} onClick={handleReset}>reset</button>
      <ul className={styles.list}>{tasks.map(renderTask)}</ul>
    </div>
  );
};
