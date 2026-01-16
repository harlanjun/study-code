package cn.comein.common.srs.utils;

import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.asymmetric.KeyType;
import cn.hutool.crypto.asymmetric.RSA;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

/**
 * 对称加解密工具
 * @author zhouxiaoyong
 * @since 2021/5/26
 */
@Slf4j
public class RSAUtils {

    private static final String RSA_ALGORITHM = "rsa";
    public static String RSAEncode(String publicKey, String sourceStr) {
        try {
            RSA rsa = new RSA(null, publicKey);
            byte[] encrypt = rsa.encrypt(StrUtil.bytes(sourceStr, CharsetUtil.CHARSET_UTF_8), KeyType.PublicKey);
            String encryptStr = Base64.encodeBase64String(encrypt);
            return encryptStr;
//            byte[] decode = Base64.decodeBase64(publicKey.getBytes());
//            X509EncodedKeySpec spec = new X509EncodedKeySpec(decode);
//            KeyFactory kf = KeyFactory.getInstance(RSA_ALGORITHM);
//            PublicKey pk = kf.generatePublic(spec);
//
//            Cipher cipher2 = Cipher.getInstance("RSA/ECB/PKCS1Padding");
//            cipher2.init(Cipher.ENCRYPT_MODE, pk);
//            String encodeStr = Base64.encodeBase64String(cipher2.doFinal(sourceStr.getBytes()));
//            return URLEncoder.encode(encodeStr, "UTF-8");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            log.error("rsa encode error!", e);
        }
        return null;
    }

    public static void RSADecode(String privateKey, String str) {
        try {
            byte[] decode = Base64.decodeBase64(privateKey);
            PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(decode);
            KeyFactory kf = KeyFactory.getInstance(RSA_ALGORITHM);
            PrivateKey priKey =  kf.generatePrivate(pkcs8EncodedKeySpec);
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.DECRYPT_MODE, priKey);
            String result = new String(cipher.doFinal(Base64.decodeBase64(str)));
            log.info("解密后的结果：" + result);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            log.error("rsa decode error!", e);
        }
    }

//    public static void main(String[] args) throws Exception{
//        String publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvUEuiDj2F2L+J736GDvf\n" +
//                "UdcFgvH/0wAY8qGX6nIXEf0iCz/dLuigdyPX8qnV1qhH8GZEpDbpsxVZLr4tXMgc\n" +
//                "2mrgXZysm0WHsVcvLCzbizlPNs2U1E5tfJR33zCrZHfqFPok0p0GwV3gdNtSyFKF\n" +
//                "lPJWWGryVrWN/8D4HI5gPiN82jT+KyhdkozMd7JeiQuqsAbOoWXDDiCGIhQEU67g\n" +
//                "TXiw24GkWP40L/KSY4gLeQjAUp34D05dDsGy6LFu7MxM0rs7RLir/0LRPcSRHz1s\n" +
//                "pElZgN6GjL+SMYiIerjxbIx8VzmGPfEefufxPXIqp/rTCoz5Imr2gzvxmoMZCLmA\n" +
//                "6QIDAQAB";
////        String str = RSAEncode(publicKey, "{\"openid\":\"hule111111111111111111111115555555555555511111111111111\",\"timestamp\":}");
////        System.out.println("加密处理后的结果：" + str);
////        String result = URLDecoder.decode(str, "utf-8");
////        System.out.println(result);
//
//
//        String privateKey = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9QS6IOPYXYv4n\n" +
//                "vfoYO99R1wWC8f/TABjyoZfqchcR/SILP90u6KB3I9fyqdXWqEfwZkSkNumzFVku\n" +
//                "vi1cyBzaauBdnKybRYexVy8sLNuLOU82zZTUTm18lHffMKtkd+oU+iTSnQbBXeB0\n" +
//                "21LIUoWU8lZYavJWtY3/wPgcjmA+I3zaNP4rKF2SjMx3sl6JC6qwBs6hZcMOIIYi\n" +
//                "FARTruBNeLDbgaRY/jQv8pJjiAt5CMBSnfgPTl0OwbLosW7szEzSuztEuKv/QtE9\n" +
//                "xJEfPWykSVmA3oaMv5IxiIh6uPFsjHxXOYY98R5+5/E9ciqn+tMKjPkiavaDO/Ga\n" +
//                "gxkIuYDpAgMBAAECggEAH1f6QulcKIdmnGJkVzsjQ0SfTw6RVfrAJv8IT/XRSFNq\n" +
//                "Hf7XvPseCF1RWIk0Nzbroy7s012c2uIAQTOSA7nIvYvR2O8nzxd237IWx/Qt8CLv\n" +
//                "sZ3etkK+81ELgVVoLV2G0S6UhqUnB0Nq9y+TyEWShhaUolQkCqRK/j6RWPljiybA\n" +
//                "j6nU9rrPhSZUdiGLjuvW/LVUJ6dVS2i6K6EFhfd58tbDt+hZPhJ5f6AeN4/la6V7\n" +
//                "BJfgiO4mQyTKx6q3li5MRB6B6ZFpr5XvaUOwJ1i/TamKRw9URI38ezSQVEOu+oWb\n" +
//                "veVxKYDeXUxOhTIneR98L79c4LRrXWzbWyGsefHZeQKBgQDdcnn1OQJLYJzAQyj6\n" +
//                "XL+AzjSMXNVCSTdnhCaGc3JWjdOs/OfhYLAyQqHhwFA4/hf+0YllY5zlk/XNoGhv\n" +
//                "bixWhZoAFrprmu5zWGkNUyTpJwZqJmrJdtFqkXKTEoOG9z22fWszFFbxg1pB0gWC\n" +
//                "s/cNz/7BWIXIZyQUl+jRA2LPbwKBgQDayMzl7m1vjGqPtWjBg7h4vXHR4cyf1nU6\n" +
//                "oN8Tw4hYQhqx6qzKsjbnUeTcCv4nxvWxdtKx4RNFuvjaF4WJZy7ttMts5Y23wnIb\n" +
//                "x8FHECSfEzMuXED/dXJaKkYVpyKcvP6fRrJ3+y9JwNsxP1mtZRwIa0tccHl8Xvos\n" +
//                "iqsVai8JJwKBgBk5Vez5zmoZmiFIRR2nfOTGGDQ4ys3fGyF+awj7k3WKeCcHM753\n" +
//                "TfqbnmbhigHD56XN5lGXNCLuZJxEfkDbEs/ULgN+k0N4hVq8IlMzOkwYduGWeKl0\n" +
//                "EEyMPrnD7RlthikIRjKuSWz/IkPHEXue1jBLleAeHjcCkJiL6SgNs66fAoGAYC8f\n" +
//                "RYbIvd2xi3RplYnfM9W1kFwApdSWvSu0Zu/zpTmKmuVdCc/Hq3KpdsOucLZblaVz\n" +
//                "g5g77NACT38/yeR/ESoGtN1GrJ7jo6ryIdfLAdRjD+KnAKgVmeYz4ZkU8mt0VXmz\n" +
//                "RGQ9qeMLel8rgbuN03W4L++SuUbYHXTpOgTwoMkCgYEA1sueJ3pSt27mjvggbr4y\n" +
//                "fDm31uhEAUneq6sdFPMnQPomAKIrl0fbeldEvjq6kEpP8QZXF/5FHz4Ymshn3TRk\n" +
//                "WtrW9vvw/lw5XC2fT6p6uTjgb5bNxxD8m7tCvenh7E2iwADL8YwpAsbMBC/AfZPM\n" +
//                "8XLHic2Y/8w6ROCzh01vJlA=";
//
////        RSADecode(privateKey, result);
//
//
//
//        RSA rsa = new RSA(privateKey, publicKey);
//        byte[] encrypt = rsa.encrypt(StrUtil.bytes("{\"openid\":\"h23测试测试吉林省的房间里睡大觉粉丝福利开始减肥水电费水电费吉林省对接方式邓伦粉丝两地分居水电费水电费水电费圣诞节范德萨发斯蒂芬斯蒂芬斯蒂芬423423423423423423423423444444444444444444444442222222222222222222222222222222222222222222222222222222222222222222222222ule111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111555555555555551111111111111113222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222\",\"timestamp\":}", CharsetUtil.CHARSET_UTF_8), KeyType.PublicKey);
//        String encryptStr = Base64.encodeBase64String(encrypt);
//        log.info(encryptStr);
//        byte[] decrypt = rsa.decrypt(encryptStr, KeyType.PrivateKey);
//        String decryptStr = StrUtil.str(decrypt, CharsetUtil.CHARSET_UTF_8);
//        log.info(decryptStr);
//
//
//
//    }
    public static void main(String[] args) throws Exception {
        String str = "{\"organizationId\":\"796\",\"name\":\"莫磊测试机构用户\",\"areaCode\":\"+86\",\"phoneNumber\":\"13971141337\",\"email\":\"molei@comein.cn\",\"sex\":1,\"occupation\":\"研发\",\"companyName\":\"深圳进门\",\"currentTime\":\"1766721360189\"}";
        final String publickey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC53OhHk6UoPskGgHd/2eMCC0N59BiPdJL/ryJEeWLJH15/VNj2f0teeHG0T7vPEiXwylL4If1xUjm486HgBQy8aL0el6s8UwgWUs1M/ZcV3rHnb9fAum7YEEbsl4zYnu5fn1iLKpqwKG30ydfrsRr3J+7owNYlmF5TyS4g6sAvtwIDAQAB";
        final String privateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALnc6EeTpSg+yQaAd3/Z4wILQ3n0GI90kv+vIkR5YskfXn9U2PZ/S154cbRPu88SJfDKUvgh/XFSObjzoeAFDLxovR6XqzxTCBZSzUz9lxXesedv18C6btgQRuyXjNie7l+fWIsqmrAobfTJ1+uxGvcn7ujA1iWYXlPJLiDqwC+3AgMBAAECgYADhPxdBp21AmNaHSqmICEdU8tGTun8JW/3KYDTnRzSxCZM8PVezZBGzK8ShAQBas2PHrWtfy9GaxEuwGZLUK0qB+JcbhMy1OdQ0kVDZTd7ldkoNOpJJYT3lPRS8nZTH3y8I91gGqmb9ZUPl2FqQbKNhc3mieTitiCX/B2toZ8LiQJBAO6WOqGU7je7khMvnzWd3zGFNvSuyt8SnZkH937+8zRdqmP5S6XvEREDpHQC5VlERTgq3IGW+K6LZ6ad0m/9n7UCQQDHbZTdNAeJN/HfDpX1lnGbExlCVHlM//98AolAuU03b5KomM7g8GR3ikCRCOCR2Bf5X7jzPwzvvkVPZahbrX07AkEArXZL6m59Q8f7zDczaaf+PeK8sejjVowSSNCiAJMb/1aaK1V0yo+luNkNF8uDNAOOz+dZql45L63rDhhwhzu+gQJALCs+BDwIy0BjxoZhejIm2TTCrGkvMHmmaR3arkYcLwH8FnE5qKI1bjBlmnm/2y1kKewkd2NohxS6HxqhziQ/jwJATM9nMIWAaHI7PZsuu4fHNgNNnj+u3onPRgqyGGkaUh+R16DTGy9kCyqfH45NmhJi4GYx82l+PNkfCA7C2eQZ9g==";
        RSA rsa = new RSA(privateKey, publickey);
        String entryStr = "MU%2FEdTlEs1%2FNtzPuUK%2FTx%2Fm1qncN3io2gGTKAZPldSDTyGVl5TBxTibV9S26wYppCshC6s%2FKMbuhc1jLNfwjufJ6bqQpscqFObZ6puxiVD%2F4H7%2Bxd3pyNmBoPJwIayNGUwwDgknGfr5odbbDCn9iHkZl9bGjlrofaetjGHkaVWI%3D";
        System.out.println("encrypt str:" + entryStr);
        System.out.println("decrypt:" + rsa.decryptStr(URLDecoder.decode(entryStr, "utf-8"), KeyType.PrivateKey));
    }
}