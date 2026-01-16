// 使用 Express.js 框架示例
const express = require('express');
const TIM = require('tencentcloud-sdk-im');
const app = express();
const generateUserSig = (userId, expireTime = 3600 * 24 * 180) => {
  // 生成 UserSig，UserSig 是用户登录 IM 的票据，有效期为 expireTime 秒
  const userSig = tim.generateUserSig(userId, expireTime);
  return userSig;
};
app.get('/api/generateUserSig', (req, res) => {
  const userId = req.query.userId;
  const userSig = generateUserSig(userId);
  res.json({ userSig });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
