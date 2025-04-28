'use client';

export interface CommunityService {
  hello: string;
}

export class CommunityServiceImpl implements CommunityService {
  hello = 'HELLO';

  static async getData() {}

  static async getPost() {}

  static async sendData() {}

  static async sendPost() {}

  static async sendPostComment() {}
}
