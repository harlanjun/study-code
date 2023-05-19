function player(action) {
    const resultArr = ['shitou', 'jiandao', 'bu'];
    if (!resultArr.includes(action)) throw new Error('输入异常')
    const randomResult = resultArr[Math.floor(Math.random() * 3)]
    if ( randomResult === action) {
        return 0
    } else if (
        (action === 'shitou' && randomResult === 'jiandao') ||
        (action === 'jiandao' && randomResult === 'bu') ||
        (action === 'bu' && randomResult === 'shitou') 
    ) {
        return 1
    }
    return -1
}

module.exports = player