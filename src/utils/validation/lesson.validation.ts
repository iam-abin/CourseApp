import { body } from 'express-validator';
import { validateRequest } from '../../middlewares';

export const createLessonRequestBodyValidator = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .trim()
        .escape(),
    body('content')
        .notEmpty()
        .withMessage('Content is required')
        .trim()
        .escape(),
    body('courseId')
        .isNumeric()
        .withMessage('Course ID must be a number')
        .notEmpty()
        .withMessage('Course ID is required')
        .toInt(), // convert to integer
    validateRequest, // now errors contain an object if the above validation fails
];

export const updateLessonRequestBodyValidator = [
    body('title')
        .optional() // Make this field optional for updates
        .notEmpty()
        .withMessage('Title cannot be empty')
        .trim()
        .escape(),
    body('content')
        .optional()
        .notEmpty()
        .withMessage('Content cannot be empty')
        .trim()
        .escape(),
    body('courseId')
        .optional()
        .isNumeric()
        .withMessage('Course ID must be a number')
        .toInt(), // convert to integer
    validateRequest,
];
