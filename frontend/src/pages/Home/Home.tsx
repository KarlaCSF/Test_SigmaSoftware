import { useEffect, useState } from "react";
import { IUser, UserService } from "../shared/services/api/user/UserService";
import { ApiException } from "../shared/services/api/ApiException";
import { UserHome } from "./components/UserHome";

export const Home = () => {
  const [usersList, setUsersList] = useState<IUser[]>([])

  useEffect (() => {
    UserService.getAll()
    .then((result) => {
      if (result instanceof ApiException)
        alert(result.message)
      else {
        setUsersList(result)
      }
    })
  }, [])

  return (
    <div className="Users">
      <h1>Users</h1>
      <div>
        {usersList?.length && usersList.map((listItem) => {
          return (
            <UserHome 
              firstName={listItem.firstName} 
              id={listItem.id}/>
          )
        })}
      </div>
      
    </div>
  )
};
