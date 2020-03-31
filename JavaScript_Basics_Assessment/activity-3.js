// Start off by creating an array with three student names.
// Create a loop that will prompt the user for three more names.
// After every user input, store the new name into the array.
// Create a new loop that will iterate through the array and console log each element of the array.

const studentNames = ['Linda','Ava','Corey'];

for (let i = 0; i < 3; i++) {
const name = prompt('Please enter a name');
 studentNames.push(name);
}

for (let i = 0; i < studentNames.length; i++) {
  const name = studentNames[i];
  console.log(name)
}