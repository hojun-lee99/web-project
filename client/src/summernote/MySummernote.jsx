'use clinet';

import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';

import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js';
import { getImgCount, getImgSrc } from '@/utils/htmlUtils';
import styled from 'styled-components';

const SummernoteEditor = ({
  onChange,
  setFiles,
  initCode = '',
  initFiles = (args) => {},
}) => {
  const editorRef = useRef(null);
  const imgCount = useRef(null);
  const inputFile = useRef(null);

  const maxImg = 2;

  const imgFun = (event) => {
    if (typeof window !== 'undefined' && editorRef.current) {
      const $editor = $(editorRef.current);
      let files = event;
      if (!!event.target) {
        files = event.target.files;
      }

      const $imageCount = $(imgCount.current);
      const imgSrc = getImgSrc($editor.summernote('code'));
      $imageCount.val(imgSrc.length);

      for (let file of files) {
        const c = $imageCount.val();
        if (c >= maxImg) {
          alert(`이미지 ${maxImg}개 초과`);
          return;
        } else if (file.size > 1024 * 1024 * 20) {
          alert('20mb 초과');
          return;
        }

        const fileUrl = URL.createObjectURL(file);
        $imageCount.val(c + 1);
        setFiles(fileUrl, file, imgSrc);
        $editor.summernote('insertImage', fileUrl);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && editorRef.current) {
      const $editor = $(editorRef.current);

      $editor.summernote({
        width: '100%',
        height: 500,
        disableDragAndDrop: true,
        disableResize: false,
        minHeight: 500,
        maxHeight: null,
        popover: {
          image: [],
          link: [],
          air: [],
        },
        toolbar: [
          // ['insert', ['picture']],
          ['custom', ['myCustomButton']],
        ],
        buttons: {
          myCustomButton: function (context) {
            var ui = $.summernote.ui;

            var button = ui.button({
              contents: '<i class="note-icon-picture"></i>',
              tooltip: '',
              container: $('.note-editor.note-frame'),
              click: function () {
                inputFile.current.click();
              },
            });
            return button.render();
          },
        },
        callbacks: {
          onChange: function (contents) {
            onChange(contents);
          },
          onInit: function () {
            $editor.summernote('code', initCode);
            initFiles(getImgSrc($editor.summernote('code')));
          },
          onImageUpload: imgFun,
        },
      });
    }
    return () => {
      if (typeof window !== 'undefined' && editorRef.current) {
        const $editor = $(editorRef.current);
        $editor.summernote('destroy');
      }
    };
  }, [initCode]);

  return (
    <div>
      <input type="number" defaultValue="0" hidden ref={imgCount} />
      <input
        ref={inputFile}
        onChange={imgFun}
        type="file"
        accept="image/*"
        multiple
        hidden
      />
      <div ref={editorRef}></div>
    </div>
  );
};

export default SummernoteEditor;
