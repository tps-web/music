/*
直接更新state的多个方法的对象
 */
import { storeUserInfo, storeCurrentSong, setPlayList, set_current_index, set_fullScreen, set_music, set_showTime, insertSong, set_record, set_userplaylist } from './mutation-types'

function findIndex(list, song) {
    // console.log(song)
    return list.findIndex((item) => {
        return item.id === song.id
    })
}


export default {
    [storeUserInfo](state, userInfo) {
        // console.log(userInfo)
        if (userInfo) {
            state.userInfo = userInfo
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        } else {
            state.userInfo = userInfo
            localStorage.removeItem('userInfo')
        }

    },
    [storeCurrentSong](state, song) {
        // console.log(song)
        state.currentPlay = song
        localStorage.setItem('currentPlay', JSON.stringify(song))
    },
    //设置播放列表 
    [setPlayList](state, list) {
        state.playlist = list
    },
    //设置当前播放
    [set_current_index](state, index) {
        state.currentIndex = index
    },
    //设置全屏 
    [set_fullScreen](state, flag) {
        state.fullScreen = flag
    },

    [set_music](state, music) {
        console.log(music)
        state.music = music
    },
    [set_showTime](state, time) {
        // console.log(time)
        state.showTime = time
    },
    [insertSong](state, song) {
        let fpIndex = findIndex(state.playlist, song)
            // console.log(fpIndex)
        if (fpIndex == -1) {
            state.playlist.unshift(song)
            state.currentIndex = 0
        } else {
            state.currentIndex = fpIndex
        }
    },
    [set_record](state, song) {
        let fIndex = findIndex(state.record, song)
            // console.log(fIndex)
        if (fIndex == -1) {
            state.record.push(song)
        }
    },
    [set_userplaylist](state, playlist) {
        state.userplaylist = playlist
    }
}