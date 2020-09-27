/*
* 请求api
* */
import ajax from "./ajax";
import jsonp from 'jsonp'
import {message} from "antd";
const BASE = ''
//登录
export const login = (username,password) => ajax(BASE + '/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user,'POST')
//获取一级/二级分类列表
export const reqCategory = (parentId) => ajax(BASE + '/manage/category/list',{parentId})
//添加分类
export const reqAddCategory = (parentId,categoryName) => ajax(BASE + '/manage/category/add',{parentId,categoryName},'POST')
// 修改分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update',{categoryId,categoryName},'POST')
// 获取一个分类
export const reqCategoryById = (categoryId) => ajax(BASE + '/manage/category/info',{categoryId})
//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax(BASE + '/manage/product/list',{pageNum,pageSize})
/*
* 搜索商品分页列表
* searchType:搜索类型 productName/productDesc
* */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search',{pageNum,pageSize,[searchType]:searchName})
//删除上传的图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete',{name},'POST')
//添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id?'update':'add'),product,'POST')
// 更新商品状态（上/下架）
export const reqUpdateProductStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus', {productId,status},'POST')
//获取角色列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')
//添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', {roleName},'POST')
//设置角色权限
export const reqUpdateRole = (role) => ajax(BASE + '/manage/role/update', role,'POST')

// jsonp请求的天气信息
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=WwSNoU6BSG7iwTwhqvgG2InvvL1jW9fp`
        jsonp(url,{},(err,data)=>{
            //成功
            if(!err && data.success === 'success'){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve(dayPictureUrl,weather)
            }
            //  失败
            message.error('获取天气信息失败')
        })
    })
}
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
*/