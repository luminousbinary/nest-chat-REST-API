import { Controller, Delete, Get, Param, Body, Patch, Post, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { jwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';
import { CreatePostDto, LikePostDto } from './dto';
import { EditPostDto } from './dto/edit-post.dto';

@UseGuards(jwtGuard)
@Controller('posts')
export class PostController {

    constructor(private postService: PostService) { }

    @Get('timeline/:id') 
    getAllPosts(
        @GetUser('id') userId: string,
    ) {
        return this.postService.getAllPosts(
            userId,
        )
    }

    // @Get(':id') //check
    // getPostsById(
    //     @GetUser('id') userId: string,
    //     @Param('id') postId: string
    // ) {
    //     return this.postService.getPostsById(
    //         userId,
    //         postId
    //     )
    // }

    @Get() ////not checked
    getUserPostsOnly(
        @GetUser('id') userId: string,
    ) {
        return this.postService.getUserPostsOnly(
            userId
        )

    }

    @Post() //check
    createPosts(
        @GetUser('id') author: string,
        @Body() dto: Prisma.PostCreateInput,
    ) {
        return this.postService.createPosts(
          author,
           dto
            
            
        )
    }

    @Patch(':id') //check
    editPostsById(
        @Param('id') postId: string,
        @Body() dto: EditPostDto,
    ) { 
        return this.postService.editPostsById(
            postId,
            dto
        )
     }

    @Delete(':id') //chcek
    deletePostsById(
        // @GetUser('id') userId: string,
        @Param('id') postId: string,
    ) {
        return this.postService.deletePostsById(
            // userId,
            postId,
        )
     }

    @Patch(':id')
    likePostById(
        @GetUser('id') userId: string,
        @Param('id') postId: string,
        @Body() dto: LikePostDto

    ){ 
        return this.postService.likePostById(
            userId,
            postId,
            dto
        )
    }

}



