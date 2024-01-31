import { useEffect } from "react";
import { UserService } from "../../services/api/user/UserService";
import { ApiException } from "../../services/api/ApiException";
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/form')
  }

  return (
    <div>
      <p>Home</p>
      <button onClick={handleClick}>Continue</button>
    </div>
  )
};
