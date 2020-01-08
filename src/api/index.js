import service from './base'
import {get, post } from './base'


//登录
// export const loginRequest = p => post('login/cellphone', p)
export function loginRequest(data) {
    return service({
        url: 'login/cellphone',
        method: 'POST',
        data
    })
}
//轮播图
export function banner() {
    return service({
        url: '/banner?type=2',
        method: 'GET',
    })
}

//每日推荐
// export const recommend = () => get('/recommend/songs')
export function recommend() {
    return service({
        url: '/recommend/songs',
        method: 'GET',
    })
}

//音乐ID播放 
export function getSongid(songid) {
    return service({
        url: `/song/url?id=${songid}`,
        method: 'GET',
    })
}

//音乐ID详情
export function getSongDetail(songid) {
    return service({
        url: `/song/detail?ids=${songid}`,
        method: 'GET',
    })
}

//热搜列表(详细)
export function getSearchDetail() {
    return service({
        url: `/search/hot/detail`,
        method: 'GET',
    })
}

//搜索/search/suggest
export function getSearchRes(key) {
    console.log(key)
    return service({
        url: `/search/?keywords=${key}`,
    })
}

//每日推荐歌单/recommend/resource
export function getrecommend() {
    return service({
        url: `/recommend/resource`,
    })
}

//歌单详情playlist/detail?id=376493212
export function getsonglist(id) {
    return service({
        url: `playlist/detail?id=${id}`
    })
}

//推荐歌单  /personalized
export function personalized() {
    return service({
        url: "/personalized"
    })
}

//热门歌手 /artist/list
export function singer() {
    return service({
        url: "/artist/list"
    })
}

//歌手热门歌曲  /artist/top/song?id=6452
export function singersong(id) {
    return service({
        url: `/artist/top/song?id=${id}`
    })
}

//用户歌单 /user/playlist?uid=406956214
export function getusersongs(id) {
    return service({
        url: `/user/playlist?uid=${id}`
    })
}

// 所有榜单内容摘要  /toplist/detail
export function getrank(id) {
    return service({
        url: `/toplist/detail`
    })
}

//获取用户详情 /user/detail?uid=
export function getuserdetail(id) {
    return service({
        url: `/user/detail?uid=${id}`
    })
}

//获取电台banner  /dj/banner
export function getdjBanner() {
    return service({
        url: `/dj/banner`
    })
}