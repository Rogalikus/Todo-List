export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type FilteredValuesType = 'all' | 'complete' | 'active';

export type TaskListType = { id: string, title: string, filter: FilteredValuesType }