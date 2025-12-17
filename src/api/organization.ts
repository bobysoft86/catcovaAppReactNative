import api from "./client";


const baseUrl = "/organization";


export async function getOrganizationGameList(id: number) {
  const res = await api.get(`${baseUrl}/gameList/${id}`);
  return res.data;
}
