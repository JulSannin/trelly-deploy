import { useState, useEffect } from "react";
import { type TaskDetailsData, getTask } from "../dal/api";

export const useTaskDetails = (taskId: string | null, boardId: string | null) => {

const [taskDetails, setTaskDetails] = useState<TaskDetailsData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskId == null || boardId == null) {
      return;
    }
    getTask(taskId, boardId)
      .then((json) => setTaskDetails(json.data))
      .catch((err: Error) => setError(err.message));
  }, [taskId, boardId]);

  return {taskDetails, error}
}