import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, EditPostDto, LikePostDto } from './dto';
import { Post, Prisma, PrismaClient, User } from '@prisma/client';

@Injectable()
export class PostService {

    constructor(private prisma: PrismaService) { }

    // not working
    getAllPosts(userId: string) {
        return this.prisma.post.findMany()
    }

    // Get a post by its id and author ?????
    getPostsById(userId: string, postId: string) {
        return this.prisma.post.findFirst({
            where: {
                id: postId,
                authorId: userId
            }
        })
    }

    getUserPostsOnly(userId: string) {
        return this.prisma.post.findMany({
            where: {
                authorId: userId
            }
        })
    }

    async createPosts(authorId: string, dto: CreatePostDto) {

        //create a post
        const post = await this.prisma.post.create({
            data: {
                ...dto,
                authorId: authorId,
            }
        });

        return post
    }

    async editPostsById(postId: string, dto: EditPostDto) {

        const post = await this.prisma.post.update({
            where: {
                id: postId,

            },
            data: {
                ...dto,
            },
        })

        return post
    }

    async deletePostsById(/*userId: string,*/ postId: string) {

        return await this.prisma.post.delete({
            where: {
                id: postId,

            }
        })

    }

    likePostById(userId: string, postId: string, dto: LikePostDto) {

    }
}



/*
data: {
  name: 'Alice',
  email: 'alice@prisma.io',
  posts: {
    create: [
      {
        title: 'Follow Prisma on Twitter',
      },
      {
        title: 'Join us for GraphQL Conf in 2019',
      },
    ],
  },
}
*/