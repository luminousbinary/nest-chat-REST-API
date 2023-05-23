import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum'
import { Test } from '@nestjs/testing'
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from 'src/app.module'
import { AuthDto } from 'src/auth/dto/index';
import { EditUserDto } from 'src/user/dto';
import { CreatePostDto } from 'src/post/dto';


describe('App e2e', () => {

  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }))
    await app.init();
    await app.listen(4001)

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:4001')
  }, 60000);

  afterAll(async () => {
    app.close();
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'caleb@gmail.com',
      password: '321123'
    };

    // // end to end testing on the auth endpoints
    describe('Signup', () => {
      it('should trow an erorr if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.email
          })
          .expectStatus(400)

      });

      it('should trow an erorr if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password
          })
          .expectStatus(400)

      });

      it('should trow an erorr if empty body', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password
          })
          .expectStatus(400)

      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201 | 200)

      });

    })

    describe('Signin', () => {
      it('should trow an erorr if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.email
          })
          .expectStatus(400)

      });

      it('should trow an erorr if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password
          })
          .expectStatus(400)

      });

      it('should trow an erorr if empty body', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password
          })
          .expectStatus(400)

      });

      it('should signin', () => {

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(201 | 200)
          .stores('userAt', 'access_token')
      });

    })
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get my profile', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
      });
    })

    describe('Edit me', () => {
      const dto: EditUserDto = {
        email: 'caleb@gmail.com',
        firstName: 'Tolase',
        lastName: 'Luminous'
      };

      it('should update user profile', () => {
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(200)
        // .expectBodyContains(dto.email)
      });

    })

    //   describe('Delete me', ()=>{
    // it.todo('should delete my profile');

    //   })

    //   describe('Search a user', ()=>{
    // it.todo('should bring up a user');

    //   })

    //   describe('Connect with user', ()=>{
    // it.todo('should Connect with a user');

    //   })

    //   describe('Disconnect with user', ()=>{
    // it.todo('should disonnect with a user');

    //   })

    //   describe('Show Connect list', ()=>{
    // it.todo('should show Connect my list');

    //   })

    //   describe('User log out', ()=>{
    // it.todo('should log me out');

    //   })

  });

  describe('Post', () => {

    describe('Get all my post', () => {
      it('should get all my post', () => {
        return pactum
          .spec()
          .get('/posts')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectBody([])
      });
    })

    describe('create a post', () => {
      const dto: CreatePostDto = {
        title: 'This is the fist test post',
        body: 'Welcome to bling Project'

      };
      it.todo('should create a post', () => {
        return pactum
          .spec()
          .get('/posts')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectBody([])
      });
    })

    describe('get a post by id', () => {
      it.todo('should get a post by id');

    })

    describe('Update a post by id', () => {
      it.todo('should update a post by id');

    })

    describe('delete a post by id', () => {
      it.todo('should delete a post by id');

    })

    //   describe('like a post', ()=>{
    // it.todo('should like a post');

    //   })

    //   describe('get all personal post', ()=>{
    // it.todo('should get all personal post');

    //   })

    //   describe('get all post', ()=>{
    // it.todo('should get all post');

    //   })

  });

})