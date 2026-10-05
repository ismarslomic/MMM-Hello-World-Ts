const config = {
  address: '127.0.0.1',
  port: 8080,
  ipWhitelist: ['127.0.0.1', '::1', '::ffff:127.0.0.1'],
  language: 'en',
  locale: 'en-US',
  logLevel: ['INFO', 'LOG', 'WARN', 'ERROR'],
  modules: [
    {
      module: 'MMM-Hello-World-Ts',
      position: 'top_left',
      config: { text: 'Hello world Ismar!' },
    },
    {
      module: 'MMM-Hello-World-Ts',
      position: 'top_right',
      config: { text: 'Hello second instance!' },
    },
  ],
}

if (typeof module !== 'undefined') {
  module.exports = config
}
