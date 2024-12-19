import UsersModel from "../models/UsersModel.js"
import bcrypt from "bcrypt"
import { TokenEncode } from "../utilities/tokenUtility.js"

export const registration = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      NIDNumber,
      phoneNumber,
      password,
      bloodGroup,
    } = req.body

    let hashedPassword = await bcrypt.hash(password, 10)
    const user = new UsersModel({
      firstName,
      lastName,
      NIDNumber,
      phoneNumber,
      password: hashedPassword,
      bloodGroup,
    })
    await user.save()
    res.status(201).json({ user, message: "User registered successfully" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    let { phoneNumber, password } = req.body
    let user = await UsersModel.findOne({ phoneNumber })

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User doesn,t exist ." })
    }

    let comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Credentials fails" })
    }
    let token = TokenEncode(user.phoneNumber, user._id)
    return res.status(201).json({
      success: true,
      user: user.firstName + " " + user.lastName,
      token,
      message: "User is loggedIn successfully .",
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}


export const verifyProfile = async (req, res) => {
  try {
    let userId = req.headers.user_id;
    console.log("userId", userId)
    let user = await UsersModel.findById({ _id: userId })
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "User not found / wrong credentials.",
        })
    }
    return res
      .status(200)
      .json({ success: true, user, message: "user is verified successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}


export const usersProfile = async (req, res) => {
  try {
    let users = await UsersModel.find({})
    return res.status(200).json({ success: true,total:users.length, users  })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })

  }
}

export const updateProfile =  async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const updates = req.body;
    const user = await UsersModel.findByIdAndUpdate(userId, updates, { new: true });
    return res.status(201).json({success:true,user,message:"User profile update successfully ."});
  } catch (err) {
        return res.status(500).json({ success: false, message: err.message })

  }
}
export const deleteProfile = async (req, res) => {
  try {
    let id = req.headers.user_id;
    await UsersModel.findByIdAndDelete(id)
    res.clearCookie("token")
    return res.status(200).json({ message: "User deleted successfully" })
  } catch (err) {
            return res
              .status(500)
              .json({ success: false, message: err.message })

  }
}

