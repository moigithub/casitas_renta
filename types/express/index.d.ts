import { IUser } from '../../api/models/user.model'

declare module 'express' {
  interface Request {
    user?: User
  }
}

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser
//     }
//   }
// }
