import { User } from './user.entity';
import { Repository } from 'typeorm';
import { signUpDto } from './dto/index';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UserRepo;
    private jwtService;
    constructor(UserRepo: Repository<User>, jwtService: JwtService);
    signUp(details: signUpDto): Promise<void>;
    signIn(details: signUpDto): Promise<{
        token: string;
    }>;
}
