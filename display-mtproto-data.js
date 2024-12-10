
var moduleName = "";
var offset = "0x678c850"; // CRYPTO_ctr128_encrypt addr in 5.9.0

var baseAddress = Module.findBaseAddress(moduleName);

console.log("[+] Base address:", baseAddress);

var functionAddress = baseAddress.add(offset);
console.log("[+] Function address:", functionAddress);

Interceptor.attach(functionAddress, {

  onEnter: function (args) {

    console.log("[+] " + functionAddress + " called");

    this.a0 = args[0];
    var numBytes = args[2].toInt32();

    console.log(hexdump(this.a0, { length: numBytes, ansi: true }));
  },

  onLeave: function (result) {
    console.log("[+] " + functionAddress + " returned:", result.toInt32());
  }
});