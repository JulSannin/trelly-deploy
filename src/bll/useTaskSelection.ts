import { useState } from "react";

export const useTaskSelection = () => {
    const [taskId, setTaskId] = useState<string | null>(null);
      const [boardId, setBoardId] = useState<string | null>(null);

    return { taskId, boardId, setTaskId, setBoardId}
}