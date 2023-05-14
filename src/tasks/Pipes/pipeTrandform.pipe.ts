import { BadRequestException, PipeTransform } from '@nestjs/common';

export class statusValidation implements PipeTransform {
  readonly allowedTasks: string[] = ['OPEN', 'CLOSED', 'IN_PROGRESS'];
  transform(value: any) {
    console.log(value);
    value = value.status.toUpperCase();
    const check = this.checkAllowed(value);
    if (!check) {
      throw new BadRequestException(
        `THE VALUE OF ${value} IS NOT AN ALLOWED VALUE`,
      );
    }
    return { status: `${value}` };
  }
  private checkAllowed(value: any) {
    if (this.allowedTasks.includes(value)) {
      return true;
    }
    return false;
  }
}
