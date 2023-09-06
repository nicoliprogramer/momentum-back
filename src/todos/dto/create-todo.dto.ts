import {IsNotEmpty, IsString, IsInt} from 'class-validator'


export class CreateTodoDto {
    @IsNotEmpty()
    @IsInt()
    user_id:number;
    
    @IsNotEmpty()
    @IsString()
    title:string;    
}