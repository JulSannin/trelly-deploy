import { TasksList } from "./TasksList";
import { TaskDetails } from "./TaskDetails";
import { useTaskSelection } from "../bll/useTaskSelection";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const { taskId, boardId, setTaskId, setBoardId } = useTaskSelection();

  const handleTaskSelect = (id: string | null, boardId: string | null) => {
    setTaskId(id);
    setBoardId(boardId);
  };

  return (
    <div className={styles.container}>
      <TasksList selectedTaskId={taskId} onTaskSelect={handleTaskSelect} />
      <TaskDetails key={taskId ?? "none"} taskId={taskId} boardId={boardId} />
    </div>
  );
};
