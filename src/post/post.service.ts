import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    
    getAllPosts() { }

    getPostsById() { }

    getUserPostsOnly() { }

    createPosts() { }

    editPostsById() { }

    deletePostsById() { }

}