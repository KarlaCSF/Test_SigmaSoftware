import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig";

export interface IUser {
  id: number;
  firstName: string;
  email: string;
  permissions: { name:string, id: string}[]
}

const create = async (
  dataToCreate: Omit<IUser, "id">,
): Promise<IUser | ApiException> => {
  try {
    const { data } = await Api().post("/user", dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.response.data || "Error consulting API");
  }
};

const getAll = async () => {
  try {
    const { data } = await Api().get("/user");
    return data;
  } catch (error: any) {
    return new ApiException(error.response.data || "Error consulting API");
  }
}

const getById = async (id: number): Promise<IUser | ApiException> => {
  try {
    const { data } = await Api().get(`/user/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.response.data || "Error consulting API");
  }
};

const updateById = async (
  id: number,
  dataToUpdate: Partial<IUser>,
): Promise<IUser | ApiException> => {
  try {
    const { data } = await Api().put(`/user/${id}`, {user: dataToUpdate } );
    return data;
  } catch (error: any) {
    console.log({error})
    return new ApiException(error.response.data || "Error consulting API");
  }
};

export const UserService = {
  create,
  getAll,
  getById,
  updateById,
};
