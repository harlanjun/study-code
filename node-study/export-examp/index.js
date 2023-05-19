exports.num = 1
exports.func = () => {}
exports.arr = [1,2,3]
module.exports = 'export'

setTimeout(() => {
  console.log('setTimeout', exports, exports.num)
}, 200)