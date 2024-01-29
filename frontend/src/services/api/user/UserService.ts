import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig";

export interface User {
  id: number;
  name: string;
  email: string;
}

const create = async (
  dataToCreate: Omit<User, "id">,
): Promise<User | ApiException> => {
  try {
    const { data } = await Api().post("/user", dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Error consulting API");
  }
};

const getById = async (id: number): Promise<User | ApiException> => {
  try {
    const { data } = await Api().get(`/user/$(id)`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Error consulting API");
  }
};

const updateById = async (
  id: number,
  dataToUpdate: User,
): Promise<User | ApiException> => {
  try {
    const { data } = await Api().put(`/user/$(id)`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || "Error consulting API");
  }
};

export const UserService = {
  create,
  getById,
  updateById,
};
