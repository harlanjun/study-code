const RSAUtils = require('./rsa');

// RSA 加解密演示（对应 Java 的 main 方法）
console.log('========== RSA 加解密演示 ==========\n');

// 密钥配置
const publickey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC53OhHk6UoPskGgHd/2eMCC0N59BiPdJL/ryJEeWLJH15/VNj2f0teeHG0T7vPEiXwylL4If1xUjm486HgBQy8aL0el6s8UwgWUs1M/ZcV3rHnb9fAum7YEEbsl4zYnu5fn1iLKpqwKG30ydfrsRr3J+7owNYlmF5TyS4g6sAvtwIDAQAB';
const privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALnc6EeTpSg+yQaAd3/Z4wILQ3n0GI90kv+vIkR5YskfXn9U2PZ/S154cbRPu88SJfDKUvgh/XFSObjzoeAFDLxovR6XqzxTCBZSzUz9lxXesedv18C6btgQRuyXjNie7l+fWIsqmrAobfTJ1+uxGvcn7ujA1iWYXlPJLiDqwC+3AgMBAAECgYADhPxdBp21AmNaHSqmICEdU8tGTun8JW/3KYDTnRzSxCZM8PVezZBGzK8ShAQBas2PHrWtfy9GaxEuwGZLUK0qB+JcbhMy1OdQ0kVDZTd7ldkoNOpJJYT3lPRS8nZTH3y8I91gGqmb9ZUPl2FqQbKNhc3mieTitiCX/B2toZ8LiQJBAO6WOqGU7je7khMvnzWd3zGFNvSuyt8SnZkH937+8zRdqmP5S6XvEREDpHQC5VlERTgq3IGW+K6LZ6ad0m/9n7UCQQDHbZTdNAeJN/HfDpX1lnGbExlCVHlM//98AolAuU03b5KomM7g8GR3ikCRCOCR2Bf5X7jzPwzvvkVPZahbrX07AkEArXZL6m59Q8f7zDczaaf+PeK8sejjVowSSNCiAJMb/1aaK1V0yo+luNkNF8uDNAOOz+dZql45L63rDhhwhzu+gQJALCs+BDwIy0BjxoZhejIm2TTCrGkvMHmmaR3arkYcLwH8FnE5qKI1bjBlmnm/2y1kKewkd2NohxS6HxqhziQ/jwJATM9nMIWAaHI7PZsuu4fHNgNNnj+u3onPRgqyGGkaUh+R16DTGy9kCyqfH45NmhJi4GYx82l+PNkfCA7C2eQZ9g==';

// 原始数据（注意：RSA 加密有长度限制，1024位密钥最多加密117字节）
// 对于较长的数据，需要分块加密或使用对称加密+非对称加密的混合方案
const sourceData = {
  // organizationId: '796',
  name: '测试用户',
  phoneNumber: '13800132001',
  currentTime: Date.now().toString(),
  uid: '7060181743740694528'
};
const sourceStr = JSON.stringify(sourceData);

console.log('1. 原始数据：');
console.log(sourceStr);
console.log('\n');

// ========== 加密演示 ==========
console.log('2. 开始加密...');
const encryptedBase64 = RSAUtils.RSAEncode(publickey, sourceStr);

if (encryptedBase64) {
  console.log('加密成功！');
  // URL 编码（对应 Java 中的 URLEncoder.encode）
  const urlEncoded = encodeURIComponent(encryptedBase64);
  console.log('URL 编码结果：', urlEncoded);
  console.log('\n');
  
  const url = 'http://localhost:8088/mobile/comeinwy/index?&from=comeinApp&realms=capital&userInfo=' + urlEncoded;
  console.log(url);
  
  // ========== 测试已有的加密字符串 ==========
  // console.log('\n5. 测试已有的加密字符串：');
  // const existingEncryptedStr = 'MU%2FEdTlEs1%2FNtzPuUK%2FTx%2Fm1qncN3io2gGTKAZPldSDTyGVl5TBxTibV9S26wYppCshC6s%2FKMbuhc1jLNfwjufJ6bqQpscqFObZ6puxiVD%2F4H7%2Bxd3pyNmBoPJwIayNGUwwDgknGfr5odbbDCn9iHkZl9bGjlrofaetjGHkaVWI%3D';
  // console.log('加密字符串：', existingEncryptedStr);
  // const decodedExistingStr = decodeURIComponent(existingEncryptedStr);
  // const decryptedExisting = RSAUtils.RSADecode(privateKey, decodedExistingStr);
  // console.log('解密后的结果：' + decryptedExisting);
  // console.log('解密结果：', decryptedExisting);
} else {
  console.log('❌ 加密失败！');
}
