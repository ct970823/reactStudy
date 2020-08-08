/*
* 返回的对应路由路径
* user.header 判断是否完善信息
* user.type 判断用户类型
* */
export function getRedirectTo(type,header) {
    let path = ''
    if(type==='laoban'){
        path = '/laoban'
    }else{
        path = '/dashen'
    }
    if(!header){
        path +='info'
    }
    return path
}