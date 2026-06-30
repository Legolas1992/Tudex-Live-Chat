// E2EE Cryptographic Engine for Tapchat (Hybrid RSA-OAEP + AES-GCM)

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Generate RSA-OAEP 2048 keypair
export async function generateE2eeKeypair() {
  return await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// Export Public Key to Base64 String (SPKI format)
export async function exportPublicKey(key) {
  const exported = await window.crypto.subtle.exportKey("spki", key);
  return arrayBufferToBase64(exported);
}

// Export Private Key to Base64 String (PKCS#8 format)
export async function exportPrivateKey(key) {
  const exported = await window.crypto.subtle.exportKey("pkcs8", key);
  return arrayBufferToBase64(exported);
}

// Import Public Key from Base64 String (SPKI format)
export async function importPublicKey(spkiBase64) {
  const buffer = base64ToArrayBuffer(spkiBase64);
  return await window.crypto.subtle.importKey(
    "spki",
    buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["encrypt"]
  );
}

// Import Private Key from Base64 String (PKCS#8 format)
export async function importPrivateKey(pkcs8Base64) {
  const buffer = base64ToArrayBuffer(pkcs8Base64);
  return await window.crypto.subtle.importKey(
    "pkcs8",
    buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["decrypt"]
  );
}

// Hybrid Encryption: RSA-OAEP + AES-GCM
export async function encryptMessage(text, recipientPublicKeySpki) {
  try {
    const pubKey = await importPublicKey(recipientPublicKeySpki);
    
    // 1. Generate ephemeral AES-GCM key
    const aesKey = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]
    );

    // 2. Encrypt message text with AES-GCM
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const encodedText = encoder.encode(text);
    const ciphertextBuffer = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      aesKey,
      encodedText
    );

    // 3. Encrypt AES key with recipient RSA public key
    const rawAesKey = await window.crypto.subtle.exportKey("raw", aesKey);
    const encryptedAesKeyBuffer = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      pubKey,
      rawAesKey
    );

    // 4. Return serialized hybrid package
    return JSON.stringify({
      e2ee: true,
      iv: arrayBufferToBase64(iv),
      ciphertext: arrayBufferToBase64(ciphertextBuffer),
      encryptedAesKey: arrayBufferToBase64(encryptedAesKeyBuffer)
    });
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("No se pudo cifrar el mensaje");
  }
}

// Hybrid Decryption: RSA-OAEP + AES-GCM
export async function decryptMessage(encryptedPayloadJson, privateKey) {
  try {
    const payload = JSON.parse(encryptedPayloadJson);
    if (!payload.e2ee || !payload.iv || !payload.ciphertext || !payload.encryptedAesKey) {
      return encryptedPayloadJson; // Fallback to raw text if it is not E2EE
    }

    const iv = new Uint8Array(base64ToArrayBuffer(payload.iv));
    const ciphertext = base64ToArrayBuffer(payload.ciphertext);
    const encryptedAesKey = base64ToArrayBuffer(payload.encryptedAesKey);

    // 1. Decrypt AES key using RSA private key
    const decryptedAesKeyRaw = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP"
      },
      privateKey,
      encryptedAesKey
    );

    // 2. Import AES-GCM key
    const aesKey = await window.crypto.subtle.importKey(
      "raw",
      decryptedAesKeyRaw,
      {
        name: "AES-GCM"
      },
      true,
      ["decrypt"]
    );

    // 3. Decrypt ciphertext with AES-GCM key
    const decryptedTextBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      aesKey,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedTextBuffer);
  } catch (error) {
    console.warn("Decryption failed (message might be plaintext or keys mismatch):", error.message);
    return "[Mensaje Cifrado - Llave no coincidente]";
  }
}
