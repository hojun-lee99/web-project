'use clinet';

import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';

import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js';

const SummernoteEditor = ({ onChange, setFiles }) => {
  const editorRef = useRef(null);
  const imgCount = useRef(null);

  const maxImg = 2;

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
          ['insert', ['picture']],
          ['custom', ['myCustomButton']],
        ],
        buttons: {
          myCustomButton: function (context) {
            var ui = $.summernote.ui;
            var button = ui.button({
              contents: '<i class="note-icon-pencil"></i> My Button',
              tooltip: 'My Custom Button',
              container: $('.note-editor.note-frame'),
              click: function () {
                alert('커스텀 버튼 클릭됨!');
              },
            });
            return button.render();
          },
        },
        callbacks: {
          onChange: function (contents) {
            onChange(contents);
          },
          onInit: function () {},
          onImageUpload: function (files) {
            const $imageCount = $(imgCount.current);
            for (let file of files) {
              const c = $imageCount.val();
              if (c > maxImg) {
                alert(`이미지 ${maxImg}개 초과`);
                return;
              } else if (file.size > 1024 * 1024 * 20) {
                alert('20mb 초과');
                return;
              }
              const fileUrl = URL.createObjectURL(file);
              $imageCount.val(c + 1);
              setFiles(file);
              $editor.summernote('insertImage', fileUrl);
            }
          },
        },
      });
    }
    return () => {
      if (typeof window !== 'undefined' && editorRef.current) {
        const $editor = $(editorRef.current);
        $editor.summernote('destroy');
      }
    };
  }, [onChange]);

  return (
    <div>
      <input type="number" defaultValue="0" hidden ref={imgCount} />
      <div ref={editorRef}></div>
    </div>
  );
};

export default SummernoteEditor;
