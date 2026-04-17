import {
  Injectable,
  ConflictException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '../generated/prisma/client';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(dto: RegisterDto): Promise<Omit<User, 'hashedPassword'>> {
    const existingUser = await this.usersService.findOne({ email: dto.email });

    if (existingUser) {
      this.logger.warn(`Attempt to register with existing email: ${dto.email}`);
      throw new ConflictException('User with this email already registered');
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(dto.password, salt);

    // Первый пользователь становится Admin, остальные — User
    const usersCount = await this.usersService.count();
    const role = usersCount === 0 ? Role.Admin : Role.User;

    const user = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      hashedPassword,
      role,
    });

    this.logger.log(
      `User registered successfully: ${user.email} with role ${user.role}`,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async validate(email: string, password: string): Promise<string> {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      this.logger.warn(`Validation failed: user with email ${email} not found`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      this.logger.warn(
        `Validation failed: incorrect password for email ${email}`,
      );
      throw new UnauthorizedException('Invalid email or password');
    }

    this.logger.log(`User validated successfully: ${email}`);
    return email;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const validatedEmail = await this.validate(email, password);

    const payload = { email: validatedEmail };
    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`User logged in successfully: ${email}`);

    return {
      access_token: accessToken,
    };
  }
}
