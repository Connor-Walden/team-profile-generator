const { Employee } = require('../lib/Employee');

test('Object init', () => {
  const emp = new Employee('test', 0, 'c@c.c'); 

  expect(emp.name).toBe('test');
  expect(emp.id).toBe(0);
  expect(emp.email).toBe('c@c.c');
});

test('Get Name', () => {
  const emp = new Employee('test', 0, 'c@c.c');

  expect(emp.getName()).toBe('test');
});

test('Get ID', () => {
  const emp = new Employee('test', 0, 'c@c.c');

  expect(emp.getId()).toBe(0);
});

test('Get Email', () => {
  const emp = new Employee('test', 0, 'c@c.c');

  expect(emp.getEmail()).toBe('c@c.c');
});

test('Get Role', () => {
  const emp = new Employee('test', 0, 'c@c.c');

  expect(emp.getRole()).toBe('Employee');
});