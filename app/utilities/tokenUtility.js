import jwt from "jsonwebtoken"
import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js"

export const TokenEncode = (phoneNumber, user_id) => {
  const KEY = JWT_KEY
  const EXPIRE = { expiresIn: JWT_EXPIRE_TIME }
  const PAYLOAD = { phoneNumber: phoneNumber, user_id: user_id }
  return jwt.sign(PAYLOAD, KEY, EXPIRE)
}

export const TokenDecode = (token) => {
  try {
    return jwt.verify(token, JWT_KEY)
  } catch (e) {
    return null
  }
}
