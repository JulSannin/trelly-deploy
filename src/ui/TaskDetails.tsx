import { useTaskDetails } from "../bll/useTaskDetails";
import styles from "./TaskDetails.module.css";

type Props = {
  taskId: string | null;
  boardId: string | null;
};

export const TaskDetails = ({ taskId, boardId }: Props) => {

  const { taskDetails, error } = useTaskDetails(taskId, boardId)

  const taskDetail = () => {
    return (
      <>
        {!taskId && <p>Task is not selected</p>}
        {taskId && error && <p>{error}</p>}
        {taskId && !error && !taskDetails?.id && <p>...Loading</p>}
        {taskId && taskDetails?.id && (
          <ol>
            <li>title - {taskDetails?.attributes.title}</li>
            <li>boardTitle - {taskDetails?.attributes.boardTitle}</li>
            <li>
              description -{" "}
              {taskDetails?.attributes.description
                ? JSON.stringify(taskDetails.attributes.description)
                : "no description"}
            </li>
          </ol>
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <h2>Task Details</h2>
      {taskDetail()}
    </div>
  );
};
