import { useEffect, useState } from "react"
import { InputForm } from "./components/InputForm"
import { ButtonForm } from "./components/ButtonForm"
import { UserService, User } from "../../services/api/user/UserService"
import { ApiException } from "../../services/api/ApiException"

export const Form = () => {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  
  useEffect(() => {
    UserService.getById(1)
    .then((result) => {
      if (result instanceof ApiException) {
        alert(result.message)
      } else {
        setFirstName(result.firstName)
        setEmail(result.email)
      }
    })
  }, [])
  
  const handleContinue = () => {
    UserService.updateById(1, { firstName, email })
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

        <ButtonForm type="button" onClick={handleContinue}>
          Continue         
        </ButtonForm>
      </form>
    </div>
  )
}