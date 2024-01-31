import { useNavigate } from "react-router-dom"
import { Button } from "../../shared/components/Button"
import { IUser } from "../../shared/services/api/user/UserService"
import { useContext } from "react"
import { UserContext } from "../../shared/contexts/UserContext"

export const UserHome: React.FC<Partial<IUser>> = (props) => {
  const navigate = useNavigate()

  const userContext = useContext(UserContext)

  const handleClick = () => {
    userContext.changeUserId(props.id ?? 0)
    navigate(`/form`)
  }
  
  return (
    <div>
      <span>{props.firstName}</span>

      <Button type="button" onClick={handleClick}>
        See profile
      </Button>

    </div>
  )
}