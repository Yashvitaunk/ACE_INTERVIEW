const { Router } = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const authRouter = Router()

/*
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)

/*
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @desc clear token from cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)

/**
 * @route GET /api/auth/me
 * @desc get the current logged in user details 
 * @access public
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = authRouter