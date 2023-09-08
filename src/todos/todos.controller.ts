import { Controller, Get, Param, Put, Delete, Post, Body, UseGuards} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ShareTodoDto } from './dto/share-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('')
export class TodosController {
   constructor(private readonly todosService: TodosService){}

  @Post('todos/create')
  async createTodo(@Body() todo: CreateTodoDto) {
    return await this.todosService.createTodo(todo)
  }

  @Get('todos/:id')
      async getTodosById(@Param('id') id: string) {
      const todos = await this.todosService.getTodosById(id);
      return todos
    }

   @Get('todos/shared_todos/:id')
    async todos(@Param('id') id: string) {
    const todo = await this.todosService.getSharedTodoById(id);
    const author = await this.todosService.getUserById(todo.user_id);
    const shared_with = await this.todosService.getUserById(todo.shared_with_id);
  return {
    statusCode: 200,
    author, shared_with
  }
  }

    @Get('users/:id')
    async getUserById(@Param('id') id: string) {
    const user = await this.todosService.getUserById(id);
    return { 
      statusCode:200,
      user
    }
   }

  @Put('todos/:id')
    async toggleCompleted(@Param('id') id: string, @Body('') todoCompleted: UpdateTodoDto) {
    const todo = await this.todosService.toggleCompleted(id, todoCompleted)
    return todo
  }

  @Delete('todos/:id')
    async deleteTodo(@Param('id') id: string) {
    const todo = await this.todosService.deleteTodo(id)
    return todo
  }

  @Post('todos/shared_todos')
    async shareTodo(@Body('') todo: ShareTodoDto) {
    const userToShare = await this.todosService.getUserByEmail(todo.email);
    const sharedTodo = await this.todosService.shareTodo(todo, userToShare);
     return { 
       statusCode:201,
       sharedTodo
      }
  }

  @Post('users')
    async getUser(@Body('') todo: ShareTodoDto) {
    const userToShare = await this.todosService.getUserByEmail(todo.email);
     return { 
       statusCode:201,
       userToShare
      }
  }
}

