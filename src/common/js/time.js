//计算年差
export function getDiffDays(d1, d2) {
    var ss = Math.abs(d2 - d1) / 1000;
    var day = Math.floor(ss / 3600 / 24);
    var how = parseInt(day / 365)
    return how + "年"
}
//时间戳
export function dateformat(time) {
    var unixTimestamp = new Date(time);
    Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
    };
    var commonTime = unixTimestamp.toLocaleString();
    return commonTime
}