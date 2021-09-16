import HmacSha256 from 'crypto-js/hmac-sha256';

export const Crypto = {
  encryption: (data, key1) => {
    var base64_1 = btoa(unescape(encodeURIComponent(JSON.stringify(data)))); // base64 1
    // var base64_2 = btoa(base64_1 + key2);
    // var hmac = HmacSha256(base64_2, key1).toString()
    // var base64_3 = btoa(key1 + hmac + base64_2)
    return base64_1;
  },

  decryption: (data, key1) => {
    var base64_de_1 = atob(data);
    return base64_de_1;
    // var first_16_length = base64_de_1.substr(0, 16)
    // if (first_16_length != key1) {
    //     console.log('error1');//error key 1
    // } else {
    //     var secound_64_length = base64_de_1.substr(16, 64)
    //     var last_value = base64_de_1.substr(80)
    //     var include_key2 = atob(base64_de_1.substr(80))
    //     var data_key2 = include_key2.substr(-16)
    //     if (data_key2 !== key2) {
    //         console.log('error2');//error key 2
    //     } else {
    //         var hmac = HmacSha256(last_value, key1).toString()
    //         if (secound_64_length === hmac) {
    //             var last3_data = atob(last_value)
    //             var last2_data = last3_data.substr(0, last3_data.length - 16)
    //             var last_data = atob(last2_data)
    //             var return_data = JSON.parse(last_data as string)
    //             return return_data
    //         } else {
    //             console.log('error3');//decrypt error
    //         }
    //     }
    // }
  }
};
