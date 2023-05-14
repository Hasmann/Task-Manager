import { AuthService } from './auth.service';
import { signUpDto } from './dto/index';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(details: signUpDto): Promise<void>;
    signIn(details: signUpDto): Promise<{
        token: string;
    }>;
    test(): string;
}
