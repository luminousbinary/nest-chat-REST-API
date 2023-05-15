import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { jwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';

@UseGuards(jwtGuard)
@Controller('posts')
export class PostController {

    constructor(private postService:PostService){}
 
    @Get()
    getAllPosts(@GetUser() userId: User) { }

    @Get()
    getPostsById() { }

    @Get()
    getUserPostsOnly() { }

    @Post()
    createPosts() { }

    @Patch()
    editPostsById() { }

    @Delete()
    deletePostsById() { }


}
