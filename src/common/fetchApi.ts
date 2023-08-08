import { url } from "../constants/url";

const getApi = (id: any, token: any) => {
  return fetch(`${url}/stripe/customer/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getApi };
