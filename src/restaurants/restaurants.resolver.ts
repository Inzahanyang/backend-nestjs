import { Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

export class RestaurantResolver {
  @Resolver()
  @Query(returns => Restaurant)
  myRestaurant(): boolean {
    return true;
  }
}
