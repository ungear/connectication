import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsInt()
  userId: number;

  @IsNotEmpty()
  text: string;
}
