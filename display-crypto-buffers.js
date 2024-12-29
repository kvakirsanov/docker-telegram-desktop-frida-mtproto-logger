var moduleName = "";

var baseAddress = Module.findBaseAddress(moduleName);
console.log("[+] Base address:", baseAddress);

// --------------------------------------------------------------------------------------------------
// https://github.com/telegramdesktop/tdesktop/blob/4505a2bf2dbb73185b4bb8b18b2aab721765bb7e/Telegram/SourceFiles/mtproto/mtproto_auth_key.cpp#L161
var aesIgeDecryptRaw_addr = baseAddress.add("0x678c620"); // 0x678c620 - aesIgeDecryptRaw addr in 5.9.0

// https://github.com/telegramdesktop/tdesktop/blob/4505a2bf2dbb73185b4bb8b18b2aab721765bb7e/Telegram/SourceFiles/mtproto/mtproto_auth_key.cpp#L178
var CRYPTO_ctr128_encrypt_addr = baseAddress.add("0x678c850"); // 0x678c850 - CRYPTO_ctr128_encrypt addr in 5.9.0

console.log("[+] aesIgeDecryptRaw address:", aesIgeDecryptRaw_addr);
console.log("[+] CRYPTO_ctr128_encrypt_addr address:", CRYPTO_ctr128_encrypt_addr);

var maxBytes = 1024 * 32;

function preview(data, len)
{
   return hexdump(data, { length: len });
}

// --------------------------------------------------------------------------------------------------
Interceptor.attach(aesIgeDecryptRaw_addr, {
  onEnter: function (args) {
//    console.log("[+] " + aesIgeDecryptRaw_addr + " called");
    console.log("[+] " + aesIgeDecryptRaw_addr + " called");
    for(var i=0; i < 6; i++)
      console.log("arg[" + i + "] : " + args[i]);

//    console.log("KEY:          " + hexdump(args[3], 32).trim());
//    console.log("IV:           " + hexdump(args[4], 32).trim());

    this.buf = args[1];
    this.numBytes = args[2].toInt32();
  },
  onLeave: function (result) {
    if(this.numBytes > maxBytes)
      console.log("RECV <=        " + preview(this.buf, this.maxBytes).trim() + " [STRIPPED " + (this.numBytes - maxBytes) + " bytes]");
    else
      console.log("RECV <=        " + preview(this.buf, this.numBytes).trim());

    console.log("[+] " + aesIgeDecryptRaw_addr + " returned:", result.toInt32());
  }
});

// --------------------------------------------------------------------------------------------------
Interceptor.attach(CRYPTO_ctr128_encrypt_addr, {
  onEnter: function (args) {
//    console.log("[+] " + CRYPTO_ctr128_encrypt_addr + " called");
    this.buf = args[0];
    this.numBytes = args[2].toInt32();

    if(this.numBytes > maxBytes)
      console.log("SEND =>        " + preview(this.buf, this.maxBytes).trim() + " [STRIPPED " + (this.numBytes - maxBytes) + " bytes]");
    else
      console.log("SEND =>        " + preview(this.buf, this.numBytes).trim());
  },
  onLeave: function (result) {
//    console.log("[+] " + CRYPTO_ctr128_encrypt_addr + " returned:", result.toInt32());
  }
});
/**/