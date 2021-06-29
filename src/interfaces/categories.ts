export interface BasicCategory {
    categoryId: number
}

export interface Category extends BasicCategory{
    title: string,
    description?: string
}