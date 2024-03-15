//Test the setup and project environment
// double quotes is changed to single quotes
// any extra spaces are removed
// raises an error if the one of the rules is not followed or prettier format is not followed
// fixed when the file is saved

//console.log("Hello World");

//console.log('Hello World');
//instead of using relative path in importing(e.g. import add from ../../ etc..), adjust that in the tsconfig file
//define @src--> start from src
// eslint-disable-next-line import/default
import dotenv from 'dotenv-safe';
import add from './math/add';

dotenv.config();

console.log(add(1, 4)); // 3
console.log(process.env.MY_NAME);
