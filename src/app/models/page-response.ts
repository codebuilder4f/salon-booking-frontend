export interface PageResponse{
    body: {
        totalPages: number,
        content: any[],
        totalElements: number
    }
}