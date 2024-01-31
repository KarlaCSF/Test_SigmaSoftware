import { useContext, useEffect, useState } from "react"
import { InputForm } from "./components/InputForm"
import { Button } from "../shared/components/Button"
import { UserService } from "../shared/services/api/user/UserService"
import { ApiException } from "../shared/services/api/ApiException"
import { UserContext } from "../shared/contexts/UserContext"

export const Form = () => {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  const { userId } = useContext(UserContext)

  useEffect(() => {
    UserService.getById(userId)
    .then((result) => {
      if (result instanceof ApiException) {
        alert(result.message)
      } else {
        setFirstName(result.firstName)
        setEmail(result.email)
      }
    })
  }, [userId])
  
  const handleContinue = () => {
    UserService.updateById(userId, { firstName, email })
    .then((result) => {
      if (result instanceof ApiException) {
        alert(result.message)
      } else {
        alert("Edited sucessfuly.")
      }
    })
  }

  return (
    <div>
      <form>
        <InputForm 
          label="Name"
          value={ firstName }
          onChange={newValue => setFirstName(newValue)}
        />

        <InputForm 
          label="Email"
          value={ email }
          onChange={newValue => setEmail(newValue)}
        />

        <Button type="button" onClick={handleContinue}>
          Continue         
        </Button>
      </form>
    </div>
  )
}