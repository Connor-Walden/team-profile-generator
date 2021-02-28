const { Engineer } = require('../lib/Engineer');
const { Employee } = require('../lib/Employee');
const { expect, test } = require('@jest/globals');

test('Object init', () => {
  const emp = new Engineer('test', 0, 'a@a.a', 'test-github');

  let engineerTypeCheck = emp instanceof Employee;

  expect(engineerTypeCheck).toBe(true);
  expect(emp.github).toBe('test-github');
});

test('Get Github', () => {
  const emp = new Engineer('test', 0, 'a@a.a', 'test-github');

  expect(emp.getGithub()).toBe('test-github');
});

test('Get Role', () => {
  const emp = new Engineer('test', 0, 'a@a.a', 'test-github');

  expect(emp.getRole()).toBe('Engineer');
});