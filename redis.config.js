const redis = require('redis')
const client = redis.createClient({
  password: 'vox3bzrphjpJZNKyGb7rOHVhUYNk29UD',
  socket: {
      host: 'redis-19888.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
      port: 19888
  }
})

client.on('error', (err) => console.error('Redis error:', err));
client.connect()

module.exports = client