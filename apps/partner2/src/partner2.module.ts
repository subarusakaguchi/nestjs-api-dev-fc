import { Module } from '@nestjs/common';
import { Partner2Controller } from './partner2.controller';
import { Partner2Service } from './partner2.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/core/prisma/prisma.module';
import { EventosModule } from './eventos/events.module';
import { LugaresModule } from './lugares/spots.module';
import { AuthModule } from '@app/core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner2', isGlobal: true }),
    PrismaModule,
    AuthModule,
    EventosModule,
    LugaresModule,
  ],
  controllers: [Partner2Controller],
  providers: [Partner2Service],
})
export class Partner2Module {}
