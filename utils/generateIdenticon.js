const Identicon = require("identicon.js");

function generateIdenticon(username, size = 64) {
  const hash = require("crypto")
    .createHash("md5")
    .update(username)
    .digest("hex");
  const data = new Identicon(hash, size).toString();

  return `data:image/png;base64,${data}`;
}

module.exports = generateIdenticon;
