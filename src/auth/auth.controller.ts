import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/index';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  signUp(@Body(ValidationPipe) details: signUpDto): Promise<void> {
    return this.authService.signUp(details);
  }
  @Post('/signIn')
  signIn(@Body(ValidationPipe) details: signUpDto): Promise<{ token: string }> {
    return this.authService.signIn(details);
  }
  @UseGuards(AuthGuard())
  @Get('/test')
  test() {
    return 'test Here';
  }
}
