import { http } from '@/utils/http/axios';

// 获取监控树列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnRoom/tree',
    method: 'get',
    params,
  });
}

export function GraphList(params) {
  return http.request({
    url: '/cdn/cdnRoom/tree-graph',
    method: 'get',
    params,
  });
}
