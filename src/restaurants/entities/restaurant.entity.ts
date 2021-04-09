import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field(type => String)
  @Column()
  @IsString()
  @Length(3)
  name: string;

  @Field(type => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field(type => String, { defaultValue: '인천시 계양구 계산동' })
  @Column()
  @IsString()
  address: string;

  @ManyToOne(type => Category, category => category.restaurants)
  category: Category;
}
