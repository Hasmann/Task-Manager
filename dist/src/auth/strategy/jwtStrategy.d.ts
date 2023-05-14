import { User } from './../user.entity';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { jwtPayload } from '../dto';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private UserRepo;
    private config;
    constructor(UserRepo: Repository<User>, config: ConfigService);
    validate(payload: jwtPayload): Promise<User>;
}
export {};
