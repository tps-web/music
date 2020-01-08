export default class Song {
    constructor({ id, singer, name, album, image }) {
        this.id = id
        this.singer = singer //歌手
        this.name = name //歌名
        this.album = album //专辑
        this.image = image
    }
}

export function createSong(music) {
    // console.log(music)
    return new Song({
        id: music.id,
        singer: singerName(music.artists),
        name: music.name,
        album: music.album.name,
        image: music.album.picUrl ? music.album.picUrl : 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
    })
}

function singerName(arr) {
    let name = []
    name = arr.map((item) => {
        // console.log(arr)
        return item.name
    })
    return name.join('/')
}

export function createSonger(music) {
    // console.log(music)
    return new Song({
        id: music.id,
        singer: singerName(music.ar),
        name: music.name,
        image: music.al.picUrl ? music.al.picUrl : 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
    })
}