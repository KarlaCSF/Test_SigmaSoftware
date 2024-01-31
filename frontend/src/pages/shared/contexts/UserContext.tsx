import { createContext, useState } from "react"
import { IUser } from "../services/api/user/UserService"

const defaultValue: IUser = {
  id: 0, 
  firstName: '',
  email: ''
}

interface IUserIdProviderProps {
  children: React.ReactNode
}

export const UserContext = createContext({ userId: 0, changeUserId: (a: number) => {}})

export const UserContextProvider: React.FC<IUserIdProviderProps > = ({ children }) => {
  const [userId, setUserId] = useState(0)

  const changeUserId = ( userId:number ) => {
    setUserId(userId)
  }

  return (
    <UserContext.Provider value={ {userId, changeUserId} }>
      {children}
    </UserContext.Provider>
  )
}