const multerConfig = require('./multer.config');

const uploadMiddleware = multerConfig.fields([
  {name: 'follow_ig_hima'},
  {name: 'follow_ig_difest'},
  {name: 'subscribe_yt'},
  {name: 'bukti_pembayaran'},
  {name: 'follow_tiktok'},
]);

module.exports = uploadMiddleware;