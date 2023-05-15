import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config/dist";



@Injectable()
export class AuthService {

   constructor(private config: ConfigService, private prisma: PrismaService, private jwt: JwtService) { }

   async signup(dto: AuthDto) {

      try {
         // generate hashed password
         const hash = await argon.hash(dto.password);
         //save user to db
         const user = await this.prisma.user.create({
            data: {
               email: dto.email,
               hash,
            },
         });

         //return new saved user to db
         return this.signToken(Number(user.id), user.email)
      }
      catch (error) {
         if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
               throw new ForbiddenException('Credentials taken');
            }
         }
         throw error
      }

   }

   //// check how i fixed the databasse with prisma

   async signin(dto: AuthDto) {
      // find user by email
      const user = await this.prisma.user.findFirst({
         where: {
            email: dto.email,
         },
      })
      // if user does not exist trow an exception
      if (!user) throw new ForbiddenException("Credentials incorrect")

      // compare the password
      const pwMatch = await argon.verify(user.hash, dto.password);
      // if password i sincorrect trow an exception
      if (!pwMatch) throw new ForbiddenException("Credentials incorrect")


      // send back user
      return this.signToken(Number(user.id), user.email)

   }

   async signToken(userId: number, email: string): Promise<{ access_token: string }> {
      const payload = {
         seb: userId,
         email
      }
      const token = await this.jwt.signAsync(payload, {
         expiresIn: '15m',
         secret: this.config.get('JWT_SECRET')
      })

      return {
         access_token: token,
      }
   }


}