import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
expot class JwtAuthGuard extends AuthGuard('jwt') {}