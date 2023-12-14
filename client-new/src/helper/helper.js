export const DefaultGroupId = '63c917686086807eb2e80d0a';

export const checkFloatLength = function (amount) {
   const floatLength = amount?.split('.')[1];
   if (floatLength) {
      const isValidLength = floatLength.length > 4 ? false : true;

      if (isValidLength) {
         return Number(amount).toFixed(floatLength.length);
      } else {
         const new_float_num = Number(amount).toFixed(8);
         return new_float_num;
      }
   }
   return amount;
};

export function camelCase(str) {
   return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
         return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
}
