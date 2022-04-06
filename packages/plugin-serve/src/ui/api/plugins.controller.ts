import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPluginListQuery } from '../../domain/get-plugin-list/get-plugin-list.query';

@Controller('plugins')
export class PluginsController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getPlugins(): Promise<string[]> {
    return await this.queryBus.execute(new GetPluginListQuery());
  }
}
