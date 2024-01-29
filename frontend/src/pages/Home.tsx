import { useEffect } from "react";
import { UserService } from "../services/api/user/UserService";
import { ApiException } from "../services/api/ApiException";

export const Home = () => {
  return <p>Home</p>;
  // useEffect(() => {
  //   UserService.getById()
  //     .then((result) => {
  //       if (result instanceof ApiException) {
  //         alert(result.message)
  //       }
  //     })
  // }, [])
};
