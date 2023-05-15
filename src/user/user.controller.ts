import { Controller, Patch, Get, UseGuards, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { jwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';


@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string) {
        return user
    }

    @Patch()
    editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto);
    }

}
