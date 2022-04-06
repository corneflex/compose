import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PluginsController } from './ui/api/plugins.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPluginListHandler } from './domain/get-plugin-list/get-plugin-list.handler';

export const QueryHandlers = [GetPluginListHandler];
@Module({
  imports: [CqrsModule],
  controllers: [AppController, PluginsController],
  providers: [AppService, ...QueryHandlers],
})
export class AppModule {}
