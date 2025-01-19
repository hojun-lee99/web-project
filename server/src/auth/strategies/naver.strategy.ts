// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-naver';

// @Injectable()
// export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
//   constructor() {
//     super({
//       clientID: process.env.NAVER_CLIENT_ID,
//       clientSecret: process.env.NAVER_CLIENT_SECRET,
//       callbackURL: process.env.NAVER_CALLBACK_URL,
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: any,
//   ): Promise<any> {
//     const { email } = profile._json;

//     const payload = {
//       email,
//       isRegistered: false,
//     };

//     done(null, payload);
//   }
// }
