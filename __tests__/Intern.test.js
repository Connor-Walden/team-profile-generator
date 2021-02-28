const { test, expect } = require('@jest/globals');
const { Intern } = require('../lib/Intern');
const { Employee } = require('../lib/Employee');

test('Object init', () => {
  const intern = new Intern('test', 0, 'a@a.a', 'Test High');

  let internTypeCheck = intern instanceof Employee;

  expect(internTypeCheck).toBe(true);
  expect(intern.school).toBe('Test High');
});

test('Get School', () => {
  const intern = new Intern('test', 0, 'a@a.a', 'Test High');

  expect(intern.getSchool()).toBe('Test High');
});

test('Get Role', () => {
  const intern = new Intern('test', 0, 'a@a.a', 'Test High');

  expect(intern.getRole()).toBe('Intern');
});