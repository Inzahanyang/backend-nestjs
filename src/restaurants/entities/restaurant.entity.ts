import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(3)
  name: string;

  @Field(type => Boolean, { nullable: true })
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isVegan?: boolean;

  @Field(type => String, { defaultValue: '인천시 계양구 계산동' })
  @Column()
  @IsString()
  address: string;
}
