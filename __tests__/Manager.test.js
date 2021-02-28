const { Manager } = require('../lib/Manager');
const { Employee } = require('../lib/Employee');
const { expect, test } = require('@jest/globals');

test('Object init', () => {
  const emp = new Manager('test', 0, 'a@a.a', 10);

  let managerTypeCheck = emp instanceof Employee;

  expect(managerTypeCheck).toBe(true);
  expect(emp.officeNumber).toBe(10);
});

test('getRole', () => {
  const emp = new Manager('test', 0, 'a@a.a', 10);

  expect(emp.getRole()).toBe('Manager');
});