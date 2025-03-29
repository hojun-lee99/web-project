'use client';

function getAttr(htmlString, reg, option = null) {
  const regexp = new RegExp(reg, option);

  return [...htmlString.matchAll(regexp)];
}

export function getImgSrc(htmlString) {
  const reg = `<img[^>]+src=["']([^"']+)["']`;

  const result = getAttr(htmlString, reg, 'g');

  const re = result.map((value) => {
    return value[1];
  });
  return re;
}

function replaceAttr(htmlString, newAttr, reg, option = null) {
  const regexp = new RegExp(reg, option);
  return htmlString.replace(regexp, (match, src) => {
    return match.replace(src, replaceAttr);
  });
}

function replaceImgSrc(htmlString, oldSrc, newSrc) {
  //   const reg = `/<img[^>]+src=["']([^"']+)["']/g`;
  const reg = `<img[^>]+src=["'](${oldSrc})["']`;
  return replaceAttr(htmlString, replaceImgSrc, reg, 'g');
}
