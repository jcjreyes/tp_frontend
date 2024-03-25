import { authApi } from '../axios';

const post = authApi.post;
const get = authApi.get;
const destroy = authApi.delete;
const update = authApi.put;

export const Reviews = {
  getAll: () => get('/review/list/').then((resp) => resp.data),
  getOne: (pk) => get(`/review/detail/${pk}/`).then((resp) => resp.data),
  create: (params) => post('/review/create/', params),
  updateReview: (pk, { ...params }) => update(`/review/update/${pk}`, params),
  deleteReview: (pk) =>
    destroy(`/review/delete/${pk}`).then((resp) => resp.data),
};
