/*
通过mutation间接更新state的多个方法的对象
 */
import { storeUserInfo, storeCurrentSong, setPlayList, set_current_index, set_fullScreen, } from './mutation-types'

import { getSongid, getSongDetail } from "@/api/index";


export default {
    selectPlay({ commit, state }, { list, index }) {
        commit(setPlayList, list)
        commit(set_current_index, index)
            // commit(selectPlay, true)
            // console.log(state.playlist)
            // console.log(state.currentIndex)
            // console.log(state.playlist[state.currentIndex])
    },

}