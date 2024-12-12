var moduleName = "";

var baseAddress = Module.findBaseAddress(moduleName);
console.log("[+] Base address:", baseAddress);

// --------------------------------------------------------------------------------------------------
var aesIgeDecryptRaw_addr = baseAddress.add("0x678c620"); // 0x678c620 - aesIgeDecryptRaw addr in 5.9.0
console.log("[+] aesIgeDecryptRaw address:", aesIgeDecryptRaw_addr);
Interceptor.attach(aesIgeDecryptRaw_addr, {

  onEnter: function (args) {
    console.log("[+] " + aesIgeDecryptRaw_addr + " called");
    this.a0 = args[0];
    this.a1 = args[1];
    this.numBytes = args[2].toInt32();

  },

  onLeave: function (result) {
    console.log("RECV: " + hexdump(this.a1, { length: this.numBytes, ansi: true }));
    console.log("[+] " + aesIgeDecryptRaw_addr + " returned:", result.toInt32());
  }
});

// --------------------------------------------------------------------------------------------------
var CRYPTO_ctr128_encrypt_addr = baseAddress.add("0x678c850"); // 0x678c850 - CRYPTO_ctr128_encrypt addr in 5.9.0
console.log("[+] CRYPTO_ctr128_encrypt_addr address:", CRYPTO_ctr128_encrypt_addr);

Interceptor.attach(CRYPTO_ctr128_encrypt_addr, {

  onEnter: function (args) {

    console.log("[+] " + CRYPTO_ctr128_encrypt_addr + " called");

    this.a0 = args[0];
    var numBytes = args[2].toInt32();

    console.log("SEND: " + hexdump(this.a0, { length: numBytes, ansi: true }));
  },

  onLeave: function (result) {
    console.log("[+] " + CRYPTO_ctr128_encrypt_addr + " returned:", result.toInt32());
  }
});
/**/