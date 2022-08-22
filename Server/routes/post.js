import express from "express";
import {
  getPostsBySearch,
  getPost,
  getPostes,
  createPost,
  updatePost,
  deletePost,
  likepost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPostes);
router.get("/search", getPostsBySearch);

router.get(":id", getPost);
router.post('/', auth,createPost)
router.patch('/:id', auth ,updatePost)
router.delete('/:id',auth ,deletePost)
router.patch('/:id/likePost',auth , likepost)

export default router;