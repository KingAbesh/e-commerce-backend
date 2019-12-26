// This easy function reverses a number without using loops or converting it to any other data type

let revNum = 0;
const reverseNum = num => {
  let number = num;
  if (number == 0) {
      return console.log(revNum);
  }
  revNum = (revNum * 10) + (number % 10);
  number = Math.floor(number / 10);
  reverseNum(number);
};

console.log(reverseNum(4205));
