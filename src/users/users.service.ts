import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return {
          ok: false,
          error: "'There is a user with that email already';",
        };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return {
        ok: true,
      };
    } catch (e) {
      return {
        error: "Couldn't create account",
        ok: false,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return { ok: false, error: 'User not found' };
      }
      const correctPassword = await user.checkPassword(password);
      if (!correctPassword) {
        return { ok: false, error: 'Wrong Password' };
      }
      const token = this.jwtService.sign(user.id);
      return { ok: true, token };
    } catch (e) {
      return {
        ok: false,
        error: "Couldn't login",
      };
    }
  }

  async findById(id): Promise<User> {
    return this.users.findOne({ id });
  }
}
