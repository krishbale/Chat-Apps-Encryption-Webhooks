import { diskStorage } from 'multer';

export const storagefile = diskStorage({
  destination: `./uploads/`,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
