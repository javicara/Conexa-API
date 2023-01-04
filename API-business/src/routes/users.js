const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();
const UserController = require("../controllers/userController");
const { Authenticate } = require("../middleware/authMiddleware");
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The user name
 *        email:
 *          type: string
 *          description: the user email adress
 *        password:
 *          type: string
 *          description: the password of the user
 *      required:
 *        - email
 *        - password
 *      example:
 *        name: JuanCarlos
 *        password: password
 *        email: juancarlos@gmail.com
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *
 */
/**
 * @swagger
 * tags:
 *  name: Buisness
 *  description: The business managing API
 */

/**
 * @swagger
 *  /api/users:
 *  get:
 *    security:
 *     - bearerAuth: []
 *    summary: Returns the list of all the users
 *    tags: [User]
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *        description: Number of the page
 *      - in: query
 *        name: limit
 *        schema:
 *         type: integer
 *         default: 5
 *        description: Number of users per page
 *      - in: query
 *        name: email
 *        schema:
 *         type: string
 *        description: email to filter no case sensitive
 *    responses:
 *      200:
 *        description: The list of the users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      401:
 *       description: Unauthorized
 *      500:
 *       description: Internal server error
 */

router.get("/users", Authenticate.validate, UserController.getAllUsers);

module.exports = router;
