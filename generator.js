const execSync = require("child_process").execSync;
const fs = require("fs");
const outputFile = `dev/data/tinyshakespeare/tiny_shakespeare.txt`;

let str = "";

for (let i = 0; i < 60000; i++) {
  let maxLength = 4;
  
  let number1 = Math.floor(Math.random() * 9500);
  let number2 = Math.floor(Math.random() * 9500);
  
  let digits1 = number1.toString().padStart(maxLength, "0").split("");
  let digits2 = number2.toString().padStart(maxLength, "0").split("");
  
  let number1Str = number1.toString().padStart(maxLength, "0").split("").reverse().map(x => x + " 0").join(" ");
  let number2Str = number2.toString().padStart(maxLength, "0").split("").reverse().map(x => x + " 0").join(" ");
  
  let resultNumber = number1 + number2;
  let paddedResult = resultNumber.toString().padStart(maxLength + 1, "0");
  let result = paddedResult.split("").reverse().join(" ");
  
  let intermediate = [];
  digits1.forEach((d1, i) => {
      let d2 = digits2[i] || "0";
      let product = parseInt(d1) + parseInt(d2);
      let paddedProduct = product.toString().padStart(2, "0").split("").reverse().join(" ");
      intermediate.push(paddedProduct);
  });
  
  /*
      5 _ 2 _ 3
      6 _ 2 _ 1
      +
      > 1 1 4 0 4
      = 1 5 4
  */
  
  str += number1Str + "\n";
  str += number2Str + "\n";
  str += "+\n";
  str += "> " + intermediate.reverse().join(" ") + "\n";
  str += "= " + result + "\n\n";
  //str += `//${number1} + ${number2} = ${resultNumber}\n`;
}

fs.writeFileSync(outputFile, str);

execSync("rm dev/data/tinyshakespeare/tiny_shakespeare_train.bin");
execSync("rm dev/data/tinyshakespeare/tiny_shakespeare_val.bin");
execSync("python3 dev/data/tinyshakespeare.py");
