export default class User {
    constructor({ id, name, sex, address, avatarUrl }) {
        this.id = id
        this.name = name
        this.sex = sex
        this.address = address
        this.avatarUrl = avatarUrl
    }
}

export function createUser(res) {
    // console.log(res.data.profile)
    return new User({
        id: res.data.profile.userId,
        name: res.data.profile.nickname,
        sex: res.data.profile.gender,
        address: res.data.profile.city,
        avatarUrl: res.data.profile.avatarUrl
    })
}