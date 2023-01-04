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
 *  name: User
 *  description: The User Authentification managing API
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

/**
 * @swagger
 *  /api/users/signup:
 *  post:
 *    summary: Create a new user
 *    tags: [User]
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was successfully created
 *      400:
 *        description: The user was not created
 */
router.post("/users/signup", UserController.signUp);
/**
 * @swagger
 *  /api/users/signin:
 *  post:
 *    summary: Authenticate a user
 *    tags: [User]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#/components/schemas/User'
 *    responses:
 *     200:
 *      description: The user was successfully authenticated
 *     400:
 *      description: The email or password are incorrect
 *     404:
 *      description: The user was not found
 *     500:
 *      description: Internal server error
 *
 */
router.post("/users/signin", UserController.signIn);

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await userSchema.updateOne({ _id: id }, { $set: req.body });
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userSchema.findByIdAndDelete({ _id: id });
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
