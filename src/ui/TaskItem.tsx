import { type TaskListItem } from "../dal/api";
import styles from "./TaskItem.module.css";
import clsx from "clsx";

type Props = {
  task: TaskListItem,
  onTaskSelect: (taskId: string | null, boardTaskId: string | null) => void;
  changeTaskStatus: (taskId: string) => void,
  isSelected: boolean,
}

export function TaskItem({
  task,
  onTaskSelect,
  changeTaskStatus,
  isSelected,
}: Props) {

  const isDone = task.attributes.status >= 2;
  const isImportant = task.attributes.priority > 1;

  const objItem = {
    [styles.item]: true,
    [styles.selected]: isSelected,
    [styles.important]: isImportant
  }

  const itemClassName = clsx(objItem);

  const objStrike = {
    [styles.done]: isDone,
  }

  const strikethrough = clsx(objStrike)

  const correctDate = new Date(task.attributes.addedAt).toLocaleDateString(
    "ru-RU",
  );

  const handleChange =  () => {
    changeTaskStatus(task.id)
  };

  return (
    <li
      className={itemClassName}
      onClick={() => {
        onTaskSelect(task.id, task.attributes.boardId);
      }}
    >
      <p>
        Заголовок: <span className={strikethrough}>{task.attributes.title ?? "Без названия"}</span>
      </p>
      <label onClick={(e) => e.stopPropagation()}>
        Статус :
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleChange}
        />
      </label>
      <p>
        Дата создания задачи: <span className={strikethrough}>{correctDate}</span>
      </p>
    </li>
  );
}
