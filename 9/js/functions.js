//Функция для проверки длины строки.
function isStringMaxLength (string, maxLength) {
  return string.length <= maxLength;
}

//Функция для проверки, является ли строка палиндромом
function isPalindrom (string) {
  const StringCopy = string
    .toUpperCase()
    .replaceAll(' ','');
  const StringReverse = StringCopy
    .split ('')
    .reverse()
    .join('');
  return StringReverse === StringCopy;
}

//Функция извлекает содержащиеся цифры в строке
function getNumberFromSrtring(string) {
  let result = '';
  for (const char of string) {
    if(!Number.isNaN(parseInt(char,10))){
      result += char;
    }
  }
  return (result);
}

isPalindrom ('топот');
isStringMaxLength ('топот',2);
getNumberFromSrtring('124');
