import { Search } from "../entities/Search";

export interface ISearchRepository {
  searchByKeyword: (
    keyword: string,
    type: string,
    cursorId?: string
  ) => Promise<Search | null>;
}
