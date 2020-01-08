export function shortenStr(value, num) {
    if (!value) return ''
    if (value.length > num) {
        return value.slice(0, num) + '...'
    }
    return value
}
// 将整数转换成 时：分：秒的格式
export function realFormatSecond(second) {
    var secondType = typeof second;
    if (secondType === "number" || secondType === "string") {
        second = parseInt(second);
        var hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        var mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return (
            ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
        );
    } else {
        return "00:00";
    }
}