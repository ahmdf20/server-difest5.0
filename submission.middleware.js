const multerConfig = require('./multer.submission.config');

const uploadMiddleware = multerConfig.fields([
  {name: 'surat_orsinil'},
  {name: 'desc_karya'},
  {name: 'karya'},
]);

module.exports = uploadMiddleware;