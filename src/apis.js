import request from './utils/request'
//目录分类
export const CATEGORY =params=>request('get','/community/category',params)
//目录分类
export const getRedBlackList =params=>request('get','/community/redBlackList',params)
//城市分类
export const getCityCategory =params=>request('get','/api/cityCategory',params)
//删除
export const districtDdelete =params=>request('post','/bDistrict/delete',params)
//保存
export const save =params=>request('post','/api/save',params)

export const getcustomer =params=>request('get','/api/kkk',params)

