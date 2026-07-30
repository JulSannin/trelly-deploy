export type TaskDetailsDto = {
    id: string,
    title?: string,
    boardId: string,
    boardTitle: string,
    description?: Record<string, unknown> | null,
    addedAt: string,
    status: 0 | 1 | 2 | 3,
    priority: 0 | 1 | 2 | 3 | 4,
    order: number,
    startDate?: object,
    deadline?: object,
    updatedAt: string,
    attachments: string[],
};

export type TaskDetailsData = {
    id: string,
    attributes: TaskDetailsDto,
    type: string,
};

type JsonApiMeta = {
    page: number;
    pageSize: number;
    totalCount: number;
    pagesCount: number;
};

type TaskListItemAttributes = {
    id: string,
    title?: string,
    boardId: string,
    status: 0 | 1 | 2 | 3,
    priority: 0 | 1 | 2 | 3 | 4,
    addedAt: string,
    attachmentsCount: number,
};

export type TaskListItem = {
    id: string,
    type: "tasks",
    attributes: TaskListItemAttributes,
};

type GlobalTaskListResponse = {
    data: TaskListItem[];
    meta: JsonApiMeta;
};

type GetTaskOutput = {
    data: TaskDetailsData;
};

const prepareHeaders = () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    // На задеплоенном домене ключ передавать нельзя (code=8):
    // там API пускает по адресу, зарегистрированному в apihub.
    // Локально .env есть, ключ уходит и запрос проходит.
    if (!apiKey) return undefined;
    return {
        "api-key": apiKey,
    };
};

const checkResponse = <T,>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json() as Promise<T>;
    }

    // fetch не реджектится на 4xx/5xx, поэтому ошибку бросаем сами,
    // иначе в стейт попадёт undefined вместо данных.
    return res
        .json()
        .catch(() => null)
        .then((body) => {
            throw new Error(body?.message ?? `Ошибка ${res.status}`);
        });
};

export const getTask = (taskId: string, boardId: string) => {
    const promise: Promise<GetTaskOutput> = fetch(
        `https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${taskId}`,
        {
            headers: prepareHeaders(),
        },
    )
        .then((res) => checkResponse<GetTaskOutput>(res))
    return promise;
}

export const getTasks = () => {
    const promise: Promise<GlobalTaskListResponse> = fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
        headers: prepareHeaders(),
    })
      .then((res) => checkResponse<GlobalTaskListResponse>(res))
    return promise;
}