export const ellipsis = (text: string = '', size: number) => {
  if (!text) {
    return '';
  }
  return text.length <= size ? text : text.substr(0, size) + '...';
};
