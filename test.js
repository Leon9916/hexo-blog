/**
 * 腾讯面试题
 * 两个超过整数存储范围的最大整数之和
 * @description
 * @author Leon9916
 * @param {String} a
 * @param {String} b
 */
function sum(a, b) {
    const len = Math.max(a.length, b.length); // 获取字符串中的最大长度
    a = a.padStart(len, '0') // padStart：往字符串前面添加'0',直到字符串长度为len
    b = b.padStart(len, '0') // 同上，因为要保持字符串长度一致，参考小学数学加法
    let carry = 0; // 进位数
    let result = ''; // 返回结果
    for (let i = len - 1; i >= 0; i--) { // 反向循环
        const sum = +a[i] + +b[i] + carry
        result = (sum % 10) + result; // 取余，并加上上次的result
        carry = Math.floor(sum / 10); // 向下取整，0.9取0,1.9取1
        // if(sum > 9) {
        //     carry = 1
        // } else {
        //     carry = 0
        // } // 向下取整，0.9取0,1.9取1，同上，只是上面的简洁一点
    }
    // 循环结束需要判断最后一次是否还存在进位，例子99+99，两位数加上两位数，结果是三位数198，这时如果按照上图的方法就会返回98
    if(carry) {
        result = carry + result
    }
    return result
}