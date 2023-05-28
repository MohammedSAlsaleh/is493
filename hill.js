// Function to encrypt plaintext using Hill cipher
function encrypt() {
  var plaintext = document.getElementById("plaintext").value.toLowerCase().replace(/[^a-z]/g, "");
  var keyInput = document.getElementById("key").value;
  var key = parseKeyMatrix(keyInput);
  
  if (plaintext.length % 2 !== 0) {
    plaintext += "x"; // Pad plaintext if the length is odd
  }
  
  var ciphertext = "";
  for (var i = 0; i < plaintext.length; i += 2) {
    var char1 = plaintext.charCodeAt(i) - 97; // Convert to 0-based index
    var char2 = plaintext.charCodeAt(i + 1) - 97; // Convert to 0-based index

    var encryptedChar1 = (key[0][0] * char1 + key[0][1] * char2) % 26;
    var encryptedChar2 = (key[1][0] * char1 + key[1][1] * char2) % 26;

    ciphertext += String.fromCharCode(encryptedChar1 + 97); // Convert back to character
    ciphertext += String.fromCharCode(encryptedChar2 + 97); // Convert back to character
  }

  document.getElementById("encryptedText").innerHTML = "Ciphertext: " + ciphertext; 
}

// Function to decrypt ciphertext using Hill cipher
  function decrypt() {
    var ciphertext = document.getElementById("ciphertext").value.toLowerCase().replace(/[^a-z]/g, "");
    var keyInput = document.getElementById("key").value;
    var key = parseKeyMatrix(keyInput);
    var inverseKey = getInverseKey(key);
    
    var decryptedText = "";
    for (var i = 0; i < ciphertext.length; i += 2) {
      var char1 = ciphertext.charCodeAt(i) - 97; // Convert to 0-based index
      var char2 = ciphertext.charCodeAt(i + 1) - 97; // Convert to 0-based index
  
      var decryptedChar1 = (inverseKey[0][0] * char1 + inverseKey[0][1] * char2) % 26;
      var decryptedChar2 = (inverseKey[1][0] * char1 + inverseKey[1][1] * char2) % 26;
  
      decryptedText += String.fromCharCode(decryptedChar1 + 97); // Convert back to character
      decryptedText += String.fromCharCode(decryptedChar2 + 97); // Convert back to character
    }
  
    document.getElementById("decryptedText").innerHTML = "Decrypted Text: " + decryptedText;
  }
  

// Function to parse the key matrix input
function parseKeyMatrix(keyInput) {
  var key = [];
  var values = keyInput.toLowerCase().replace(/[^a-z]/g, "").split("");

  if (values.length !== 4) {
    alert("Invalid key matrix. Please enter a 2x2 matrix with 4 alphabetical characters.");
    return;
  }

  key.push([values[0].charCodeAt(0) - 97, values[1].charCodeAt(0) - 97]);
  key.push([values[2].charCodeAt(0) - 97, values[3].charCodeAt(0) - 97]);

  return key;
}

// Function to calculate the inverse of the key matrix
function getInverseKey(key) {
  // Calculate the determinant of the key matrix
  var determinant = (key[0][0] * key[1][1] - key[0][1] * key[1][0] + 26) % 26;

  // Find the modular multiplicative inverse of the determinant
  var determinantInverse=-1;
  for (var i = 1; i < 26; i++) {
    if ((determinant * i) % 26 == 1) {
      determinantInverse = i;
      break;
    }
  }

  // If no inverse exists, return null
  if (determinantInverse == -1) {
    alert("The key matrix is not invertible. Please enter a valid key matrix.");
    return null;
  }

  // Calculate the adjugate matrix
  var adjugateMatrix = [
    [key[1][1], -key[0][1]],
    [-key[1][0], key[0][0]]
  ];

  // Calculate the inverse key matrix using modular arithmetic
  var inverseKey = [];
  for (var row = 0; row < 2; row++) {
    inverseKey[row] = [];
    for (var col = 0; col < 2; col++) {
      inverseKey[row][col] = ((adjugateMatrix[row][col] * determinantInverse) % 26 + 26) % 26;
    }
  }

  return inverseKey;
}
