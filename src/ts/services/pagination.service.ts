import { IPokemonPagination} from '@app/models';
import { ENVIRONMENT_CONFIG as env} from '@app/services/api-client/constants';
import { ApiClient } from './api-client/api-client.service';

export class PokemonPaginationService {
  async getPokemonPaginationStart(): Promise<Array<IPokemonPagination>> {
    return ApiClient.get<Array<IPokemonPagination>>(env.uriBase.concat('?offset=0&limit=20'))
      .then(res => res);
  }
  async getPokemonPagination(url: string): Promise<Array<IPokemonPagination>> {
    return ApiClient.get<Array<IPokemonPagination>>(url)
      .then(res => res);
  }
}