process.stdin.on('data', function(data) {
  const str = data.toString().trim()
  Func(str)
})

function Func(str) {
  const arr = ['shitou', 'jiandao', 'bu']
  const randomInt = Math.floor(Math.random() * 3)
  const randomRes = arr[randomInt];
  if (str === randomRes) {
    return 0
  } else {
    return -2
  }
}
