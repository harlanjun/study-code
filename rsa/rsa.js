const crypto = require('crypto');
const forge = require('node-forge');

/**
 * RSA 加解密工具类
 * 对应 Java 中的 RSAUtils 类
 */
class RSAUtils {
  /**
   * RSA 加密（对应 Java 的 RSAEncode 方法）
   * 支持分块加密，自动处理超过密钥大小限制的数据
   * @param {string} publicKey Base64 编码的公钥（不带 PEM 头）
   * @param {string} sourceStr 要加密的源字符串
   * @returns {string} Base64 编码的加密结果
   */
  static RSAEncode(publicKey, sourceStr) {
    try {
      // 将 Base64 公钥转换为 PEM 格式
      const pemPublicKey = RSAUtils.toPemPublicKey(publicKey);
      
      // 获取密钥大小（1024位 = 128字节）
      const keySize = 128; // 1024位密钥
      const maxBlockSize = keySize - 11; // PKCS1Padding 需要 11 字节填充，所以最多 117 字节
      
      // 将字符串转换为 Buffer
      const buffer = Buffer.from(sourceStr, 'utf8');
      
      // 如果数据长度小于等于最大块大小，直接加密
      if (buffer.length <= maxBlockSize) {
        const encrypted = crypto.publicEncrypt(
          {
            key: pemPublicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING, // 对应 Java 的 PKCS1Padding
          },
          buffer
        );
        return encrypted.toString('base64');
      }
      
      // 分块加密
      const encryptedBlocks = [];
      for (let i = 0; i < buffer.length; i += maxBlockSize) {
        const chunk = buffer.slice(i, i + maxBlockSize);
        const encrypted = crypto.publicEncrypt(
          {
            key: pemPublicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
          },
          chunk
        );
        encryptedBlocks.push(encrypted);
      }
      
      // 将所有加密块合并并转换为 Base64
      const combined = Buffer.concat(encryptedBlocks);
      return combined.toString('base64');
    } catch (error) {
      console.error('rsa encode error!', error);
      return null;
    }
  }

  /**
   * RSA 解密（对应 Java 的 RSADecode 方法）
   * 支持分块解密，自动处理分块加密的数据
   * @param {string} privateKey Base64 编码的私钥（不带 PEM 头，PKCS#8 格式）
   * @param {string} str Base64 编码的加密字符串
   * @returns {string} 解密后的明文
   */
  static RSADecode(privateKey, str) {
    try {
      // 将 Base64 私钥转换为 PEM 格式（PKCS#8）
      const pemPrivateKey = RSAUtils.toPemPrivateKey(privateKey);
      
      // 解码 Base64 密文
      const encryptedBuffer = Buffer.from(str, 'base64');
      
      // 密钥大小（1024位 = 128字节）
      const keySize = 128;
      
      // 如果密文长度小于等于密钥大小，直接解密
      if (encryptedBuffer.length <= keySize) {
        return RSAUtils._decryptSingleBlock(pemPrivateKey, encryptedBuffer);
      }
      
      // 分块解密
      const decryptedBlocks = [];
      for (let i = 0; i < encryptedBuffer.length; i += keySize) {
        const chunk = encryptedBuffer.slice(i, i + keySize);
        const decrypted = RSAUtils._decryptSingleBlock(pemPrivateKey, chunk);
        if (decrypted === null) {
          return null;
        }
        decryptedBlocks.push(Buffer.from(decrypted, 'utf8'));
      }
      
      // 合并所有解密块
      const combined = Buffer.concat(decryptedBlocks);
      return combined.toString('utf8');
    } catch (error) {
      console.error('rsa decode error!', error);
      return null;
    }
  }

  /**
   * 解密单个块（内部方法）
   * @param {string} pemPrivateKey PEM 格式的私钥
   * @param {Buffer} encryptedBuffer 加密的数据块
   * @returns {string|null} 解密后的字符串
   */
  static _decryptSingleBlock(pemPrivateKey, encryptedBuffer) {
    try {
      // 尝试使用 node-forge 进行解密（支持 PKCS1Padding）
      try {
        const privateKeyForge = forge.pki.privateKeyFromPem(pemPrivateKey);
        const encryptedBinary = forge.util.createBuffer(encryptedBuffer.toString('binary'));
        const decryptedBytes = privateKeyForge.decrypt(encryptedBinary.getBytes(), 'RSAES-PKCS1-V1_5');
        // node-forge 返回的是字节数组，需要转换为 UTF-8 字符串
        const result = forge.util.decodeUtf8(decryptedBytes);
        return result;
      } catch (forgeError) {
        // 如果 forge 失败，尝试使用 crypto（某些 Node.js 版本可能支持）
        try {
          const decrypted = crypto.privateDecrypt(
            {
              key: pemPrivateKey,
              padding: crypto.constants.RSA_PKCS1_PADDING, // 对应 Java 的 PKCS1Padding
            },
            encryptedBuffer
          );
          const result = decrypted.toString('utf8');
          return result;
        } catch (cryptoError) {
          throw forgeError; // 抛出原始错误
        }
      }
    } catch (error) {
      console.error('rsa decode single block error!', error);
      return null;
    }
  }

  /**
   * 将 Base64 公钥转换为 PEM 格式
   * @param {string} base64Key Base64 编码的公钥
   * @returns {string} PEM 格式的公钥
   */
  static toPemPublicKey(base64Key) {
    // 移除所有空白字符
    const cleanKey = base64Key.replace(/\s/g, '');
    // 每 64 字符换行
    const formattedKey = RSAUtils.formatBase64ToPem(cleanKey);
    return `-----BEGIN PUBLIC KEY-----\n${formattedKey}\n-----END PUBLIC KEY-----`;
  }

  /**
   * 将 Base64 私钥转换为 PEM 格式（PKCS#8）
   * @param {string} base64Key Base64 编码的私钥
   * @returns {string} PEM 格式的私钥
   */
  static toPemPrivateKey(base64Key) {
    // 移除所有空白字符
    const cleanKey = base64Key.replace(/\s/g, '');
    // 每 64 字符换行
    const formattedKey = RSAUtils.formatBase64ToPem(cleanKey);
    return `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
  }

  /**
   * 将 Base64 字符串格式化为 PEM 格式（每 64 字符换行）
   * @param {string} base64String Base64 字符串
   * @returns {string} 格式化后的字符串
   */
  static formatBase64ToPem(base64String) {
    const chunks = [];
    for (let i = 0; i < base64String.length; i += 64) {
      chunks.push(base64String.substring(i, i + 64));
    }
    return chunks.join('\n');
  }
}

module.exports = RSAUtils;
