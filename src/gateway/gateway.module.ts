import { Module } from "@nestjs/common";
import { MyGateway } from "./gateway";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { UserModule } from "src/user/user.module";
import { JWTSECRET } from "src/constant";

@Module({
    imports: [JwtModule.register({
        secret: JWTSECRET,
        signOptions: { expiresIn: '60s' }
      }),
      UserModule,
    //   MyGateway
    ],
    providers: [MyGateway],
    controllers: []
})
export class GatewayModule {}