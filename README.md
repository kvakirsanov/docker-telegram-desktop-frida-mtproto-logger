# Telegram Desktop + Frida MTProto Logger

## Description & Purpose

This project runs Telegram Desktop inside a Docker container and intercepts cryptographic buffers using Frida. It captures raw binary data prior to encryption (on sending) and after decryption (on receiving), facilitating deep analysis and debugging of the MTProto cryptographic protocol. Specifically, the following functions are hooked:

- **aesIgeDecryptRaw**
- **CRYPTO_ctr128_encrypt**

Upon invocation, the script logs both unencrypted and encrypted data, providing insights into how Telegram Desktop handles cryptographic operations in real-time.

## Usage

1. Configure the `.config` file with appropriate environment variables (e.g., `TAG`, paths, etc.).  
2. Build the Docker image:
   ```bash
   ./build.sh
   ```
3. Run the container:
   ```bash
   ./run.sh
   ```
   This script prepares required directories, launches Telegram in Docker, and automatically injects the Frida script.

## Additional Details

- **Dockerfile.template** installs Telegram Desktop and Frida.  
- **frida-inject.sh** provides Frida with the necessary parameters.  
- **display-crypto-buffers.js** is the Frida script that intercepts cryptographic functions and prints out the raw data.  
- **scripts/telegram.sh** starts `frida-server`, runs Telegram, and monitors the application window.  
- **scripts/xdg-open-hook.sh** handles URLs and files from inside the container, redirecting them to the host system.