import axios from "axios";
import { LoginType, RegisterType } from "./type";

export const APP_URL = `http://localhost:8080/`;

export const loginUser = async (data: LoginType) => {
  const url = `${APP_URL}api/v1/user/login`;
  let response = await axios.get(url, { params: data });
  return response;
};

export const registerUser = async (data: RegisterType) => {
  const url = `${APP_URL}api/v1/user/register`;
  let response = await axios.post(
    url,
    { body: data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export const getNotes = async () => {
  const url = `${APP_URL}api/v1/note/get-notes`;
  let response = await axios.get(url);
  return response;
};

export const createNote = async (data: RegisterType) => {
  const url = `${APP_URL}api/v1/note/create-note`;
  let response = await axios.post(
    url,
    { body: data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
