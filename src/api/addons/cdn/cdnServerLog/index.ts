import { http, jumpExport } from '@/utils/http/axios';

// 获取服务器日志列表
export function List(params) {
  return http.request({
    url: '/cdn/cdnServerLog/list',
    method: 'get',
    params,
  });
}