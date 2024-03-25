import { authApi } from '../axios';

const post = authApi.post;
const get = authApi.get;
const destroy = authApi.delete;
const update = authApi.put;

export const Restrooms = {
  getAll: () => get('/restroom/list/').then((resp) => resp.data),
  getOne: (pk) => get(`/restroom/detail/${pk}/`).then((resp) => resp.data),
  create: (params) => post('/restroom/create/', params),
  updateRestroom: (pk, { ...params }) =>
    update(`/restroom/update/${pk}`, params),
  deleteRestroom: (pk) =>
    destroy(`/restroom/delete/${pk}`).then((resp) => resp.data),
};
