// from https://ipinfo.io/bogon

module.exports = isBogon

isBogon.isBogon = isBogon
isBogon.isPrivate = isPrivate

function isBogon (ip) {
  const n = toNumber(ip)

  return isPrivateN(n) ||
    (n >>> 24) === 0 || // 0.0.0.0/8 "This" network
    (n >>> 8) === 12582912 || // 192.0.0.0/24  IETF protocol assignments
    (n >>> 8) === 12582914 || // 192.0.2.0/24  TEST-NET-1
    (n >>> 17) === 25353 || // 198.18.0.0/15 Network interconnect device benchmark testing
    (n >>> 8) === 12989284 || // 198.51.100.0/24 TEST-NET-2
    (n >>> 8) === 13303921 || // 203.0.113.0/24  TEST-NET-3
    (n >>> 28) === 14 || // 224.0.0.0/4 Multicast
    (n >>> 28) === 15 || // 240.0.0.0/4 Reserved for future use
    (n === 4294967295) // 255.255.255.255/32
}

function isPrivateN (n) {
  return (n >>> 24) === 10 || // 10.0.0.0/8  Private-use networks
    (n >>> 22) === 401 || // 100.64.0.0/10 Carrier-grade NAT
    (n >>> 24) === 127 || // 127.0.0.0/8 Loopback + Name collision occurrence (127.0.53.53)
    (n >>> 16) === 43518 || // 169.254.0.0/16  Link local
    (n >>> 20) === 2753 || // 172.16.0.0/12 Private-use networks
    (n >>> 16) === 49320 // 192.168.0.0/16  Private-use networks
}

function isPrivate (ip) {
  return isPrivateN(toNumber(ip))
}

function toNumber (ip) {
  const [a, b, c, d] = ip.split('.').map(n => parseInt(n, 10))
  return 0x1000000 * a + 0x10000 * b + 0x100 * c + d
}
