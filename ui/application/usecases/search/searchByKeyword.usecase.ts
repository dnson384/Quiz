import { Search } from "@/domain/entities/Search";
import { ISearchRepository } from "@/domain/repositories/search.repository";

export class SearchByKeywordUsecase {
  constructor(private readonly searchRepository: ISearchRepository) {}

  async execute(
    keyword: string,
    type: string,
    cursorId?: string,
  ): Promise<Search | null> {
    return await this.searchRepository.searchByKeyword(keyword, type, cursorId);
  }
}
