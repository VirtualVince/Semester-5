const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        const formattedEmployees = employees.map(emp => ({
            employee_id: emp._id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            position: emp.position,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining,
            department: emp.department
        }));

        res.status(200).json(formattedEmployees);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Create employee
exports.createEmployee = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: errors.array()[0].msg
            });
        }

        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

        // Check if employee with email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({
                status: false,
                message: 'Employee with this email already exists'
            });
        }

        const employee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });

        await employee.save();

        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: employee._id
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const { eid } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(eid)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid employee ID'
            });
        }

        const employee = await Employee.findById(eid);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
        const { eid } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(eid)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid employee ID'
            });
        }

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: errors.array()[0].msg
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            eid,
            req.body,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            message: 'Employee details updated successfully.'
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;

        if (!eid) {
            return res.status(400).json({
                status: false,
                message: 'Employee ID is required'
            });
        }

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(eid)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid employee ID'
            });
        }

        const employee = await Employee.findByIdAndDelete(eid);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};