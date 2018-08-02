import kebabCase from 'lodash/kebabCase';
import each from 'lodash/each';
import XRegExp from 'xregexp';

// Get the slug from the blog title, category name, etc. This should support unicode.
export function getSlug(name) {
  const regexLetterNum = XRegExp('\\p{L}|\\p{N}');
  let result = '';

  each(name, function(char, index) {
    if (regexLetterNum.test(char)) {
      result += char;
    } else if (!regexLetterNum.test(char) && index !== 0) {
      // If the first character is not a letter or number, just drop it.
      result += '-';
    }
  });

  // Post process using lodash, lodash doesn't support unicode kebab sadly.
  result = kebabCase(result);

  return result;
}

export const LEAN_CLOUD_APP_ID = '12BFWtsWfSLN9XaKG5NDqlGd-gzGzoHsz';
export const LEAN_CLOUD_APP_KEY = 'hcSnDohUOmgOV7MDQ4E4cKGo';
