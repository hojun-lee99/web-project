// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-kakao';

// @Injectable()
// export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
//   constructor() {
//     super({
//       clientID: process.env.KAKAO_CLIENT_ID,
//       clientSecret: process.env.KAKAO_CLIENT_SECRET,
//       callbackURL: process.env.KAKAO_CALLBACK_URL,
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: any,
//   ): Promise<any> {
//     const { email } = profile._json.kakao_account;

//     const payload = {
//       email,
//       isRegistered: false,
//     };

//     done(null, payload);
//   }
// }
