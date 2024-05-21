function setCookie(name: string, value: null | string, daysToLive: number) {
  const date = new Date();

  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);

  let expires = 'expires=' + date.toUTCString();

  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function deleteCookie(name: string) {
  setCookie(name, null, -1);
}

function getCookie(name: string) {
  const cDecoded = decodeURIComponent(document.cookie);

  const cArray = cDecoded.split('; ');

  let result = null;

  cArray.forEach((element) => {
    if (element.indexOf(name) == 0) {
      result = element.substring(name.length + 1);
    }
  });

  return result;
}
export { setCookie, getCookie, deleteCookie };
