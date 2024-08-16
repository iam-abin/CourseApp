import { body } from "express-validator";
import { validateRequest } from "../../middlewares";

export const createCourseRequestBodyValidator = [
    body("courseName")
        .notEmpty()
        .withMessage("Course name is requires")
        .trim()
        .escape(),
    body("description")
        .notEmpty()
        .withMessage("Description is requires")
        .trim()
        .escape(),
    body("duration")
        .notEmpty()
        .withMessage("Duration is requires")
        .trim()
        .escape(),
    body("fees")
        .isNumeric()
        .withMessage("Fees must be a number")
        .trim()
        .escape(), // used to sanitize input by escaping characters that could be used in cross-site scripting (XSS) attacks or other injection vulnerabilities.
    validateRequest, //now errors contain an object if the above validation fails
];


export const updateCourseRequestBodyValidator = [
    body("courseName")
        .optional() // Make this field optional for updates
        .notEmpty()
        .withMessage("Course name is requires")
        .trim()
        .escape(),
    body("description")
        .optional()
        .notEmpty()
        .withMessage("Description cannot be empty")
        .trim()
        .escape(),

    body("duration")
        .optional()
        .notEmpty()
        .withMessage("Duration cannot be empty")
        .trim()
        .escape(),

    body("fees")
        .optional()
        .isNumeric()
        .withMessage("Fees must be a number")
        .trim()
        .escape(), // used to sanitize input by escaping characters that could be used in cross-site scripting (XSS) attacks or other injection vulnerabilities.
    validateRequest, //now errors contain an object if the above validation fails
];