'use client';

function getAttr(htmlString, reg, option = null) {
  const regexp = new RegExp(reg, option);

  return [...htmlString.matchAll(regexp)];
}

export function getImgSrc(htmlString) {
  const reg = `<img[^>]+src=["']([^"']+)["']`;

  const result = getAttr(htmlString, reg, 'g');

  const re = new Set(
    result.map((value) => {
      return value[1];
    }),
  );
  return [...re.values()];
}

export function getImgCount(htmlString) {
  const reg = `<img[^>]+src=["']([^"']+)["']`;

  const result = getAttr(htmlString, reg, 'g');

  return result.length;
}

function replaceAttr(htmlString, newAttr, reg, option = null) {
  const regexp = new RegExp(reg, option);
  return htmlString.replace(regexp, (match, src) => {
    return match.replace(src, newAttr);
  });
}

export function replaceImgSrc(htmlString, oldSrc, newSrc) {
  //   const reg = `/<img[^>]+src=["']([^"']+)["']/g`;
  const reg = `<img[^>]+src=["'](${oldSrc})["']`;
  return replaceAttr(htmlString, newSrc, reg, 'g');
}

export function isImg(htmlString, src) {
  const reg = `<img[^>]+src=["'](${src})["']`;
  if (getAttr(htmlString, reg).length === 0) {
    return false;
  }
  return true;
}
