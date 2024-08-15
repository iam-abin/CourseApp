import { body } from "express-validator";
import { validateRequest } from "../../../middlewares";

export const signupRequestBodyValidator = [
    body("name").notEmpty().withMessage("Name is requires").trim().escape(),
    body("email").isEmail().withMessage("Email must be valid").trim().escape(),
    body("password")
        .isLength({ min: 4 })
        .withMessage("Password must be between 4 and 20 characters")
        .trim()
        .escape(), // used to sanitize input by escaping characters that could be used in cross-site scripting (XSS) attacks or other injection vulnerabilities.
    validateRequest, //now errors contain an object if the above validation fails
];
