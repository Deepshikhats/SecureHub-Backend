import User from '../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

export const createUser = async (req: Request<{}, {}, SignupUserCredentials>, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).json({ message: 'User already exists' })
    const newUser = await new User(req.body)
    await newUser.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.log(error, 'error')
  }
}

export const loginUser = async (req: Request<{}, {}, LoginUserCredentials>, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist. Signup first" })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect email/password' })
    } else {
      const accessToken = jwt.sign({ userId: user.email }, 'secret-key', {
        expiresIn: '20s',
      })
      const refreshToken = jwt.sign({ userId: user.email }, 'secret-key', {
        expiresIn: '7days',
      })
      return res.status(201).json({ accessToken, refreshToken, message: 'Login Success' })
    }
  } catch (error) {
    console.log(error, 'error')
  }
}

export const generateAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.rt
    jwt.verify(refreshToken, 'secret-key', (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = jwt.sign({ userId: user.userId }, 'secret-key', {
        expiresIn: '20s',
      })
      return res.status(201).json({ accessToken })
    })
  } catch (error) {
    console.log(error, 'error')
  }
}

export const validateToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1] as string;
    jwt.verify(token, 'secret-key', (err, user) => {
      if (err) return res.status(401).json({ status: false, message: 'unauthorized' })
      return res.status(201).json({ status: true })
    })
  } catch (error) {
    console.log(error, 'error')
  }
}

export const userDetails = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { name, email } = await User.findOne({ email: req.user.userId })
    return res.status(200).json({ name, email })
  } catch (error) {
    console.log({ error })
  }
}
