const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { body } = require('express-validator');

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Create employee
router.post('/employees', [
    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required'),
    body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email'),
    body('position')
        .trim()
        .notEmpty().withMessage('Position is required'),
    body('salary')
        .notEmpty().withMessage('Salary is required')
        .isNumeric().withMessage('Salary must be a number')
        .custom(value => value >= 0).withMessage('Salary must be a positive number'),
    body('date_of_joining')
        .notEmpty().withMessage('Date of joining is required')
        .isISO8601().withMessage('Please provide a valid date'),
    body('department')
        .trim()
        .notEmpty().withMessage('Department is required')
], employeeController.createEmployee);

// Get employee by ID
router.get('/employees/:eid', employeeController.getEmployeeById);

// Update employee
router.put('/employees/:eid', [
    body('salary')
        .optional()
        .isNumeric().withMessage('Salary must be a number')
        .custom(value => value >= 0).withMessage('Salary must be a positive number'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Please provide a valid email'),
    body('date_of_joining')
        .optional()
        .isISO8601().withMessage('Please provide a valid date')
], employeeController.updateEmployee);

// Delete employee
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;