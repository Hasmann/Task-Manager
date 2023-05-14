import { TaskStatus } from './dto';
import { User } from 'src/auth/user.entity';
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
}
