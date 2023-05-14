import { PipeTransform } from '@nestjs/common';
export declare class statusValidation implements PipeTransform {
    readonly allowedTasks: string[];
    transform(value: any): {
        status: string;
    };
    private checkAllowed;
}
