import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

 export interface SharedTodo {
      id: string;
 
      todo_id: string;
  
      user_id: string;
  
      shared_with_id: string;
     }

@Injectable()

export class TodosService {
     constructor(private prisma: PrismaService){}

    

async getUserById(id: string): Promise<SharedTodo | null>  {
    try {
      const query = await this.prisma.$queryRaw`SELECT * FROM user WHERE id = ${id}`;
      const SharedTodo = query[0]
    return SharedTodo || null
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const query = await this.prisma.$queryRaw`SELECT * FROM user WHERE email = ${email}`;
    return{
      query
    }
    } catch (error) {
      throw error;
    }
  }

  async getTodosById(id: string) {
    try {
      const query = await this.prisma.$queryRaw`SELECT todo.*, shared_todo.shared_with_id
    FROM todo
    LEFT JOIN shared_todo ON todo.id = shared_todo.todo_id
    WHERE todo.user_id = ${id} OR shared_todo.shared_with_id = ${id}`;
    return{
      query
    }
    } catch (error) {
      throw error;
    }
  }

   async getTodo(id: string) {
    try {
      const query = await this.prisma.$queryRaw`SELECT * FROM todo WHERE id = ${id}`;
    return{
      query
    }
    } catch (error) {
      throw error;
    }
  }

  async getSharedTodoById(id: string): Promise<SharedTodo | null> {
    try {
      const query = await this.prisma.$queryRaw`SELECT * FROM shared_todo WHERE todo_id = ${id}`;
      const SharedTodo = query[0]
    return SharedTodo || null
    
    } catch (error) {
      throw error;
    }
  }

  async createTodo(user_id: string, title: string) {
    try {
      const query = await this.prisma.$queryRaw` INSERT INTO todo (user_id, title)
    VALUES (${user_id}, ${title})`;
    return{
      query
    }
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(id: string) {
    try {
      const query = await this.prisma.$queryRaw`DELETE FROM todo WHERE id = ${id}`;
    return{
      query
    }
    } catch (error) {
      throw error;
    }
  }

   async toggleCompleted(id: string, value: boolean) {
    try {
      const newValue = value === true ? "TRUE" : "FALSE"
      const query = await this.prisma.$queryRaw`UPDATE todo
        SET completed = ${newValue} 
        WHERE id = ${id}`
    return{
      query
    }
    } catch (error) {
      throw error;
    }
  }

   async shareTodo(todo_id: string, user_id: string, shared_with_id) {
    try {
      const query = await this.prisma.$queryRaw`INSERT INTO shared_todo (todo_id, user_id, shared_with_id) 
    VALUES (${todo_id}, ${user_id}, ${shared_with_id})`;
    return{
      query
    }
    } catch (error) {
      throw error;
    }
  }
}