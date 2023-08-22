import { Controller, Get, Param, Put, Delete, Post, Body} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('')
export class TodosController {
   constructor(private readonly todosService: TodosService){}

 @Get('/todos/:id')
    async getTodosById(@Param('id') id: string) {
    const todos = await this.todosService.getTodosById(id);
    return todos
  }

@Get('/todos/shared_todos/:id')
 async todos(@Param('id') id: string) {
 const todo = await this.todosService.getSharedTodoById(id);
 const author = await this.todosService.getUserById(todo.user_id);
 const shared_with = await this.todosService.getUserById(todo.shared_with_id);
 return {
   statusCode: 200,
   data: author,shared_with
 }
}

   @Get('/users/:id')
    async getUserById(@Param('id') id: string) {
    const user = await this.todosService.getUserById(id);
    return user
  }

  @Put('/todos/:id')
    async toggleCompleted(@Param('id') id: string, value: boolean) {
    const todo = await this.todosService.toggleCompleted(id, value)
    return todo
  }

  @Delete('/todos/:id')
    async deleteTodo(@Param('id') id: string) {
    const todo = await this.todosService.deleteTodo(id)
    return todo
  }

  @Post('/todos/shared_todos')
    async post(@Body('') todo_id: string, user_id: string, email: string) {
    const userToShare = await this.todosService.getUserByEmail(email);
    const sharedTodo = await this.todosService.shareTodo(todo_id, user_id, userToShare);
    return sharedTodo
  }

  @Post('/todos')
    async createTodo(@Body() user_id: string, title: string) {
    const todo = await this.todosService.createTodo(user_id, title)
    return todo
  }
}

