import express from "express"
import { deleteProfile, login, registration, updateProfile, usersProfile, verifyProfile } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
const authRouter = express.Router()


// Routes
// 1. User Registration API
authRouter.post("/registration", registration)
// 2. User Login API
authRouter.post("/login",login)
// 3. User Profile Read API (Single)
authRouter.get("/profile",authMiddleware,verifyProfile)
// 4. All Users Profile Read API
authRouter.get("/users", authMiddleware, usersProfile);
// 5. Single User Profile Update API
authRouter.put("/profile", authMiddleware, updateProfile);
// 6. Delete Single User API
authRouter.delete("/profile", authMiddleware, deleteProfile);




export default authRouter
