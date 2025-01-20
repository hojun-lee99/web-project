'use-client';

import { useEffect } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
// import { useRouter } from 'next/router';

export default function checkLogin() {
  const path1 = useParams();
  const path2 = usePathname();
  const path3 = useSearchParams();

  useEffect(() => {
    console.log('path1: ' + path1);
    console.log(path1);
    console.log('path2: ' + path2);
    console.log('path3: ' + path3);
  }, [path1, path2, path3]);
  //   localStorage.getItem(process.env.MY_LOGIN_JWT as string);
}
