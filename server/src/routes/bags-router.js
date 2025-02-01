import express from "express";
import * as bagsController from "../controllers/bags-controller.js"
import { isLogin } from '../middlewares/is-login.js';
import { checkRole } from '../middlewares/check-role.js';
import * as bidsController from "../controllers/bids-controller.js";

const bagsRouter = express.Router();

//controlling the bags
bagsRouter.get('/', bagsController.getBags);
bagsRouter.get('/:bagId', bagsController.searchBag);
bagsRouter.post('/', isLogin, checkRole("admin"), bagsController.addBag);
bagsRouter.put('/:bagId', isLogin, checkRole("admin"), bagsController.updateBag);
bagsRouter.delete('/:bagId', isLogin, checkRole("admin"), bagsController.deleteBag);

//controlling the bids
bagsRouter.get('/:bagId/bids',bidsController.getBids);
bagsRouter.post('/:bagId/bids', isLogin, checkRole("user"), bidsController.placeBid);

export default bagsRouter