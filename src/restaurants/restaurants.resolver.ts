import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantInput } from './dtos/restaurants.dto';
import { Restaurant } from './entities/restaurant.entity';

@Resolver(of => Restaurant)
export class RestaurantResolver {
  @Query(returns => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }

  @Mutation(returns => Boolean)
  createRestaurant(
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): boolean {
    console.log(createRestaurantInput);
    return true;
  }
}
