'use client';

import LoginFilterPopup from '@/components/auth/LoginFilterPopup';
import SummernoteEditor from '@/summernote/MySummernote';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { getImgSrc, isImg, replaceImgSrc } from '@/utils/htmlUtils';

interface CommunityFormData {
  title: string;
  category: string;
  contents: string;
}

interface MyFile {
  name: string;
  file: File;
}

class MySet<T> {
  key: (a: T, b: T) => boolean;
  set: Set<T>;
  constructor(
    key: (a: T, b: T) => boolean = (a: T, b: T) => {
      return a === b;
    },
  ) {
    this.key = key;
    this.set = new Set<T>();
  }

  add: (value: T) => boolean = (value: T) => {
    if (this.has(value)) {
      return false;
    }

    this.set.add(value);
    return true;
  };

  has: (value: T) => boolean = (value: T) => {
    for (let v of this.set) {
      if (this.key(v, value)) {
        return true;
      }
    }

    return false;
  };

  delete: (value: T) => boolean = (value: T) => {
    const newSet = new Set<T>();
    this.set.forEach((v) => {
      if (!this.key(value, v)) {
        newSet.add(v);
      }
    });
    if (newSet.size !== this.set.size) {
      this.set = newSet;
      return true;
    }
    return false;
  };

  values: () => SetIterator<T> = () => {
    return this.set.values();
  };
}

function getMyFiles(set: MySet<MyFile>, arrayStr: string[]) {
  const result1 = set.values().filter((value) => {
    console.log(value);
    for (let v of arrayStr) {
      console.log('v: ', v);
      console.log('value.name: ', value.name);
      if (value.name === v) {
        console.log('filter true');
        return true;
      }
    }
    return false;
  });
  const result2 = [
    ...result1,
    // .map((value) => {
    //   return value.file;
    // }),
  ];

  return result2;
}

export default function Write() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<CommunityFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const router = useRouter();
  const [contents, setContents] = useState<string>('');
  const [preContents, setPreContents] = useState<string>('');
  const [preFiles, setPreFiles] = useState<string[]>([]);
  const [imgFiles, setImgFiles] = useState<MySet<MyFile>>(
    new MySet((a, b) => {
      return a.name === b.name;
    }),
  );

  const setImg = (key: string, img: File, args: string[]) => {
    setImgFiles((v) => {
      const mySet = new MySet<MyFile>((a, b) => {
        return a.name === b.name;
      });
      v.values().forEach((vl) => {
        if (args.includes(vl.name)) {
          mySet.add(vl);
        }
      });
      // for (let value of v.values()) {
      //   mySet.add(value);
      // }
      mySet.add({ name: key, file: img });
      return mySet;
    });
  };

  useEffect(() => {
    setPreContents('Hello World<img src="hello World!!!" />');
  }, []);

  useEffect(() => {
    console.log(preFiles);
  }, [preFiles]);

  return (
    // <LoginFilterPopup message="로그인 필요">
    <div className="content">
      <WriteDiv>
        <div style={{ width: '100%' }}>
          <BackButton
            onClick={() => {
              router.back();
            }}
          >
            ← Go Back
          </BackButton>
          <form
            style={{ width: '100%' }}
            onSubmit={handleSubmit(async (data, e) => {
              e?.preventDefault();

              preFiles.forEach((v) => {
                console.log(v, isImg(contents, v));
              });

              const imgFormData = new FormData();

              const imgSrcArray = getImgSrc(contents);

              const myFileArray = getMyFiles(imgFiles, imgSrcArray);

              for (let v of myFileArray) {
                imgFormData.append('file', v.file);
              }

              replaceImgSrc;

              const formData: CommunityFormData = {
                title: data.title
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/\s+/g, ' '),
                category: data.category,
                contents: contents,
              };
              console.log(formData);
              console.log([...imgFormData.values()]);
            })}
          >
            <label>제목</label>
            <input
              {...register('title', {
                required: '적어주세요',
              })}
              id="write-title"
            />
            <label htmlFor="write-category">카테고리</label>
            <select
              {...register('category', {
                required: '선택하세요',
                validate: (value) => {
                  return value !== '' || '선택하세요';
                },
              })}
              id="write-category"
            >
              <option value="">선택</option>
              <option value="cate1">female</option>
              <option value="cate2">male</option>
              <option value="cate3">other</option>
            </select>
            <SummernoteEditor
              onChange={setContents}
              setFiles={setImg}
              initCode={preContents}
              initFiles={(args) => {
                setPreFiles((v) => {
                  return [...args];
                });
              }}
            />
            <button>sumbit</button>
          </form>
        </div>
      </WriteDiv>
    </div>
    // </LoginFilterPopup>
  );
}

const WriteDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
  margin: 100px;
`;

const BackButton = styled.span`
  color: var(--color-primary-accent);
  cursor: pointer;
`;
