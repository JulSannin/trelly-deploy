import { useState, useEffect } from "react";
import { getTasks, type TaskListItem } from "../dal/api";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Array<TaskListItem> | null>(null);
    const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        getTasks()
          .then((json) => setTasks(json.data))
          .catch((err: Error) => setError(err.message));
      }, []);

      return {tasks, setTasks, error}
}