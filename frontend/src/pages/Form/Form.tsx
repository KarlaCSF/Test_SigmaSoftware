import { useContext, useEffect, useState } from "react"
import { InputForm } from "./components/InputForm"
import { Button } from "../shared/components/Button"
import { IUser, UserService } from "../shared/services/api/user/UserService"
import { ApiException } from "../shared/services/api/ApiException"
import { UserContext } from "../shared/contexts/UserContext"
import { useNavigate } from "react-router-dom"

export const Form = () => {
  const [user, setUser] = useState({} as IUser)
  const { userId } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
      navigate('/home')
      return
    }

    UserService.getById(userId)
    .then((result) => {
      if (result instanceof ApiException) {
        alert(result.message)
      } else {
        setUser(result)
      }
    })
  }, [])
  
  const handleContinue = () => {
    UserService.updateById(userId, { ...user })
    .then((result) => {
      if (result instanceof ApiException) {
        alert(result.message)
      } else {
        alert("Edited sucessfuly.")
      }
    })
  }
  
  const hasSomePermission = (permissionsExpec: string[]) => {
    const userPermissions = user.permissions?.map((permission) => permission.name) ?? []
 
    return permissionsExpec.some((perm) => userPermissions.includes(perm))
 }

  const mappedPermissions = {
    editName: hasSomePermission(['user:profile:firstName:edit', 'user:profile:edit']),
    editEmail: hasSomePermission(['user:profile:email:edit', 'user:profile:edit']),
    viewName: hasSomePermission(['user:profile:firstName:view', 'user:profile:view', 'user:profile:edit', 'user:profile:firstName:edit']),
    viewEmail: hasSomePermission(['user:profile:email:view', 'user:profile:view', 'user:profile:edit', 'user:profile:email:edit'])
  }

  return (
    <div>
      <form>
        <InputForm 
          label="Name"
          canEdit={mappedPermissions.editName}
          canView={mappedPermissions.viewName}
          value={ user.firstName }
          onChange={newValue => setUser({...user, firstName: newValue})}
        />

        <InputForm 
          label="Email"
          canView={mappedPermissions.viewEmail}
          canEdit={mappedPermissions.editEmail}
          value={ user.email }
          onChange={newValue => setUser({...user, email: newValue})}
        />

        <Button type="button" onClick={handleContinue}>
          Continue         
        </Button>
      </form>
    </div>
  )
}