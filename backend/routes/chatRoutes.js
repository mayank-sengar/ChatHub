import express from 'express'
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

import { accessChat ,fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup} from '../controllers/chatControllers.js';

router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);

export default router;