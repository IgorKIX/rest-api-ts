export default {
    port: 4000,
    dbUri: 'mongodb://mongo_db:27017/rest_api',
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    publicKey: "-----BEGIN PUBLIC KEY-----\n" +
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmtJHd0PSPnuulFfPnFdp\n" +
        "XmgAOt1AwnUgdiqAkdsS1m6zvznTdtzBrDLtA9tgzG6ISRKlqJ1ZxdT/2cA0OUMn\n" +
        "Od+1XT4EAdk+aK4SquYh/g0cblv4yRnHmt/hk8b5KuIQDbDzB7d5s7mKr6qEt1wr\n" +
        "Xe5ACZer8JhvyCUhJE3JE+JxRDuFzDvTnEQjWT+RLZj6C9M339HTyJ3OqMW0Pxsr\n" +
        "QyXEe51eCo+zcI5ybg3zv8xaBpTS8PN11yBgrstS7xL3kpmc1ae51poHOcp8ohWp\n" +
        "Q3xY7BVDkJligGMNmPzkFZKlnF6mqusR8eepz/KDmTdMir9/Wptigx4vWXvFLz4T\n" +
        "YwIDAQAB\n" +
        "-----END PUBLIC KEY-----",
    privateKey: "-----BEGIN PRIVATE KEY-----\n" +
        "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCa0kd3Q9I+e66U\n" +
        "V8+cV2leaAA63UDCdSB2KoCR2xLWbrO/OdN23MGsMu0D22DMbohJEqWonVnF1P/Z\n" +
        "wDQ5Qyc537VdPgQB2T5orhKq5iH+DRxuW/jJGcea3+GTxvkq4hANsPMHt3mzuYqv\n" +
        "qoS3XCtd7kAJl6vwmG/IJSEkTckT4nFEO4XMO9OcRCNZP5EtmPoL0zff0dPInc6o\n" +
        "xbQ/GytDJcR7nV4Kj7NwjnJuDfO/zFoGlNLw83XXIGCuy1LvEveSmZzVp7nWmgc5\n" +
        "ynyiFalDfFjsFUOQmWKAYw2Y/OQVkqWcXqaq6xHx56nP8oOZN0yKv39am2KDHi9Z\n" +
        "e8UvPhNjAgMBAAECggEBAJadMsEnzYTTtcbClko2D1+0NWUOkU2bvHS4bFN4mB7b\n" +
        "mynRC5N6tz7aXBGAfe7jKNpNtbMPQKJg0HX5sdRzK9n1c+69whA6U6hqj+aJ80+/\n" +
        "WYVTG/gniDN20XB+BTBes9dd6U/8gf0B55V1gZ8Pn3DFsq6iSrbI1RYUaOV0dsVL\n" +
        "5h9zogWjsD04ETcr1R9rY1cWcOiEDHAPBBnJX0348EvF6CXQAOUcqrfs9Xcitc/b\n" +
        "nqckNwe773z0WkuVOCZiX428/vBvRRkCbL5EEeCZf2U6fWudpHS6WzysX8Pwguoy\n" +
        "R3+LZlCzsbJKttLQKOQjXRlf86A8Cr4/fMlxHEtguYECgYEAyKVXbWQHS6NWHHVn\n" +
        "W8PPjNeEUG+6ohsOkft5eBf4+PrEilpr0dsq8xtALVMKRSOlocz/JLbjncLbC3iR\n" +
        "bDNSnfLX+gGWpSz2vmIuO4oIjicqgck6oL9o46iXgeV/TeR2BD4c6Zw440RVeQQA\n" +
        "RRcWTB/3KG6afMzyG/AECTfiIbMCgYEAxYiTLEUKUI63Mzz20fcPM5lLSlCjjKHe\n" +
        "f6IMjDyfXloWJCB8ensuJM9XHTWDxEAM5i5cyHBee6Spditzd0EEcSMilDT4qVci\n" +
        "GNUZ/0Gap1ByZuRMn05oVyz0DOV88ucIWrECOZRp7eUkKqvT8BSCjXbCkc03KADQ\n" +
        "2hXxEeRSj5ECgYA9nTBswiPPYVgHIzJbJpUsnd3eyYCZWQ+vWnbhnxLweikyhzPG\n" +
        "3LOitcKOaIql0p2BQy8yegsJnhWfvyWBAX2kTTdvaV92V4lpy0KBPBEGfhZ6hm2/\n" +
        "gSfXiSUFWZEvPTHUebJtNnDtsUVCBS2ECePp+oLuYpCENHdAhwLmRcfmKwKBgFul\n" +
        "X9LcPUrey/SDxmfn3i+sYZgbDaZDu30v6+5seexGk5szT01sNR5y7BHrMDUvGkz5\n" +
        "GacNK2jmHpFq22lqyurKyFJGuU+n03P9+s/I2j3iPxGpvjrzH8nCW4BYQL5ZnjCl\n" +
        "i0i3qOXst/jsO6pZebC0dtU6huqSZlOodm48pmlhAoGAMILVHbafvMmcbz1v0Pux\n" +
        "ftpn37MS5/8i4DIx1Qm/RwWG9N7Fy1dY8pVCwx2rz5CPmlmyHJ3Ha+4u9/Vm79i7\n" +
        "GYMuuT5tm9gN+CI0R9zRG/0bC+Ecs4VJbcIcFaIGFx7+ovsrgyAwyNJ+IrjlT7iT\n" +
        "7oFi/H2mNlSDiPgLy9bunXw=\n" +
        "-----END PRIVATE KEY-----\n"
}