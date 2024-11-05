// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

export function fictorial(n) {
  if (n == 1 || n == 0) return 1;

  return n * fictorial(n - 1);
}

export function getName(name, age) {
  return { name, age };
}
