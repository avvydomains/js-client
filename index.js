const circomlibjs = require('circomlibjs')


/*
  converts a number into a bitstring
  algorithm mirrors that of github.com/iden3/circomlib
*/
const num2Bits = (inputNum, numBits) => {
  var lc1 = 0;
  var e2 = 1;
  var out = [];
  for (var i = 0; i < numBits; i += 1) {
    out[i] = (inputNum >> i) & 1;
    lc1 += out[i] * e2;
    e2 = e2 + e2;
  }
  return out;
}

/*
  converts a bitstring into a number
  algorithm mirrors that of github.com/iden3/circomlib
*/
const bits2Num = (inputBits) => {
  var lc1 = BigInt(0);
  var e2 = BigInt(1);
  for (var i = 0; i < inputBits.length; i += 1) {
    lc1 += BigInt(inputBits[i]) * e2;
    e2 = e2 + e2;
  }
  return lc1;
}

/*
  converts a string to an array of numbers (ascii codes)
  zero-pads the string to `len` length
*/
const string2AsciiArray = (text, len) => {
  if (len === undefined) throw "string2AsciiArray requires a padding length"
  if (text.length > len) throw "Out of bounds"
  const signal = text.split('').map(t => t.charCodeAt(0))
  while (signal.length < len) {
    signal.push(0)
  }
  return signal
}

/*
  prepares an ascii array for input into 
  the posiedon algorithm
*/
const _singlePreimageSignal = (chars) => {
  const inputBitsArr = chars.map(c => num2Bits(c, 8))
  const preimageStr = inputBitsArr.reduce((sum, curr) => {
    return sum + curr.join('')
  }, '')
  const preimageNum = bits2Num(preimageStr)
  return preimageNum

  const split = []
  let s;
  for (var i = 0; i < signal.length; i += 1) {
    if (i % 31 === 0) {
      s = []
      split.push(s)
    }
    s.push(signal[i])
  }
  return split.map(s => {
    return BigInt('0x' + s.reduce((sum, curr) => {
      return sum + curr.toString(16)
    }, ''))
  })
}

/*
  splits an ascii array into chunks of
  length 31 & prepares each chunk 
  for insertion into the poseidon algorithm
*/
const asciiArray2PreimageSignal = (_chars) => {
  const chars = []
  let c
  for (var i = 0; i < _chars.length; i += 1) {
    if (i % 31 === 0) {
      c = []
      chars.push(c)
    }
    c.push(_chars[i])
  }
  return chars.map(_singlePreimageSignal)
}

/* runs a preimageSignal through the poseidon hash */
const preimageSignal2HashSignal = async (num) => {
  const poseidon = await circomlibjs.buildPoseidon()
  const arr = poseidon(num)
  const hashed = poseidon.F.toObject(arr)
  return hashed
}

/* computes keccak256 of a string */
const keccak256 = (str) => {
  return ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(str)
  )
}

const nameHashIteration = async (prevHash, label) => {
  const ascii = string2AsciiArray(label, 62)
  const preimage = asciiArray2PreimageSignal(ascii)
  const hash = await preimageSignal2HashSignal([prevHash].concat(preimage))
  return hash
}

const nameHash = async (domain) => {
  let labels = domain.split('.')
  labels.reverse()
  let hash = 0
  for (let i = 0; i < labels.length; i += 1) {
    hash = await nameHashIteration(hash, labels[i])
  }
  return hash
}


module.exports = {
  num2Bits,
  bits2Num,
  string2AsciiArray,
  asciiArray2PreimageSignal,
  preimageSignal2HashSignal,
  keccak256,
  nameHash,
  nameHashIteration,
}
