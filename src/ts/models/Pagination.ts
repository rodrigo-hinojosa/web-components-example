/** interface representing a Pokemon Pagination. */
export interface IPokemonPaginationResult {
    name: string;
    url: string;
}

/** interface representing a Pokemon Pagination. */
export interface IPokemonPagination {
    count: number;
    next: string;
    previous: string;
    results: Array<IPokemonPaginationResult>;
}
