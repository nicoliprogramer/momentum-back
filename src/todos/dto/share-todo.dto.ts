import {IsNotEmpty, IsEmail, IsInt, isEmpty} from 'class-validator'


export class ShareTodoDto {
    @IsNotEmpty()
    @IsInt()
    todo_id:number;  

    @IsNotEmpty()
    @IsInt()
    user_id:number;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;    
}