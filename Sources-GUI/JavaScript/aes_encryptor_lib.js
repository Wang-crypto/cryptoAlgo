// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const fs = require('fs');
const path = require('path')

function encrypt(text, key, iv) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

module.exports = {
auto: function(text) {
    try {
        const key_in = fs.readFileSync(path.resolve('key.txt'), 'utf8');
        const iv_in = fs.readFileSync(path.resolve('IV.txt'), 'utf8');
    } catch(e) {
        console.log('Errors were encountered.');
        return true;
    }
    const key_in = fs.readFileSync(path.resolve('key.txt'), 'utf8');
    const iv_in = fs.readFileSync(path.resolve('IV.txt'), 'utf8');
    const key = Buffer.from(key_in, 'hex');
    const iv = Buffer.from(iv_in, 'hex');
    console.log('Key: ', key);
    console.log('IV :', iv);
    console.log('█                        Encrypting...                           █');
    try {
        return encrypt(text, key, iv);
    } catch(e) {
        console.log(e);
        console.log('Error while encrypting message. Ensure that the AES keyfiles are valid and the encrypted message is not corrupted.');
    }
}
}