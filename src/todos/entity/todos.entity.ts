import { ApiProperty } from '@nestjs/swagger';
import { todo } from '@prisma/client';

export class TodoEntity implements todo {
  constructor(partial: Partial<TodoEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  title: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  user_id: number;
}