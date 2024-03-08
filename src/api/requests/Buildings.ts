import { authApi } from '../axios';

const post = authApi.post;
const get = authApi.get;
const destroy = authApi.delete;
const update = authApi.put;

export const Buildings = {
  getAll: () => get('/building/list/').then((resp) => resp.data),
  getOne: (pk) => get(`/building/detail/${pk}/`).then((resp) => resp.data),
  create: ({ ...params }) => post('/building/create/', params),
  updateBuilding: (pk, { ...params }) =>
    update(`/building/update/${pk}`, params),
  deleteBuilding: (pk) =>
    destroy(`/building/delete/${pk}`).then((resp) => resp.data),
};
