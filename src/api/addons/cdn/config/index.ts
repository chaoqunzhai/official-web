import { http } from '@/utils/http/axios';

export function getConfig(params) {
  return http.request({
    url: '/cdn/config/get',
    method: 'get',
    params,
  });
}

export function updateConfig(params) {
  return http.request({
    url: '/cdn/config/update',
    method: 'post',
    params,
  });
}
