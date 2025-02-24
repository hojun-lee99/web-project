'use client';

export interface PathFilterService {
  hello: string;
}
export class PathFilterServiceImpl implements PathFilterService {
  hello = 'HELLO';
}
