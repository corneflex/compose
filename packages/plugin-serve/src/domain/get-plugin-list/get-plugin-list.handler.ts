import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetPluginListQuery } from './get-plugin-list.query';

@QueryHandler(GetPluginListQuery)
export class GetPluginListHandler implements IQueryHandler<GetPluginListQuery> {
  async execute(query: GetPluginListQuery): Promise<any> {
    return Promise.resolve(['plugins']);
  }
}
