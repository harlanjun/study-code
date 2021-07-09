/**
 * number为零，return
 * 取出正负位
 * 分小数位，整数位集合计算
 * 组装得到最终结果
 */
//  const CHARS = '0123456789abcdef';
const CHARS = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~'
const DECIMAL_LENG = 12;
function tenTransform(number, chars = CHARS) {
    if(number === 0 ) {
        return 0
    }
    const numberArr = Math.abs(number).toString().split('.');
    const integerArr = integerTransform(+numberArr[0], chars);
    const decimalArr = decimalTransform(+numberArr[1], chars);
    const value = integerArr.join('') + '.' + decimalArr.join('')
    return number > 0 ? value : '-' + value;

}

function integerTransform(digit, chars) {
    let result = [];
    do {
        let mod = digit % chars.length;
        digit = (digit - mod) / chars.length;
        result.unshift(chars[mod]);
    } while (digit);
    return result;
}

function decimalTransform(digit, chars) {
    let result = [];
    let count = 0;
    digit = +('0.'+ digit);
    do {
        count++
        let mod = (digit * chars.length).toString().split('.');
        let modInteger= mod[0];
        let modDecimal = mod[1];
        digit = +('0.'+ modDecimal);
        result.push(chars[modInteger]);
    } while (digit && count < DECIMAL_LENG);
    return result;
}

// const result = tenTransform(1.1)
// console.log(result);git remote add 
