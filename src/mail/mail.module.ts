import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailMoudleOptions } from './mail.interfaces';

@Module({})
export class MailModule {
  static forRoot(options: MailMoudleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
