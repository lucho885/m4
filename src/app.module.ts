import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from  "./config/typeorm"
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersDetailModule } from './ordersDetails/ordersDetails.module';
import { SeedsModule } from './seeds/seeds.module';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';
import {config as dotenvConfig} from "dotenv";

dotenvConfig({ path: ".env.development" });


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[typeOrmConfig]
  }), TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory: (configService: ConfigService) => configService.get('typeorm')
  }),
    OrdersModule,CategoriesModule,UsersModule,ProductsModule, AuthModule,OrdersDetailModule,SeedsModule,FilesModule, JwtModule.register({
      global:true,
      signOptions:{expiresIn:"1h"},
      secret:process.env.JWT_SECRET,
    })],
})
export class AppModule {}

