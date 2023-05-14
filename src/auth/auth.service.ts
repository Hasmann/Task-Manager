import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDto, jwtPayload } from './dto/index';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(details: signUpDto) {
    const { email, password } = details;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const User = this.UserRepo.create({
      email: email,
      password: hashedPassword,
    });
    try {
      await this.UserRepo.save(User);
    } catch (err) {
      if (err.code == '23505') {
        throw new ConflictException('This Email already Exists');
      }
      throw new InternalServerErrorException();
    }
  }
  async signIn(details: signUpDto): Promise<{ token: string }> {
    const { email, password } = details;

    const User = await this.UserRepo.findOneBy({ email: email });
    console.log(User);
    if (!User || !(await bcrypt.compare(password, User.password))) {
      throw new UnauthorizedException('Wrong Email Or Password');
    }
    const payload: jwtPayload = { email: email };
    const token = await this.jwtService.sign(payload);
    return { token: token };
  }
}
