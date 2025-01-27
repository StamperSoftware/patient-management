export type PaginationResult<T> = {
    pageIndex:number;
    pageSize:number;
    count:number;
    data:T[];
}