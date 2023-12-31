import { Router } from "express";
import dishesController from "../controller/dishes.usecase";

const router = Router()
const dishesAPI = '/api/v1/dishes'

router.get(dishesAPI, dishesController.getAll)
router.post(dishesAPI, dishesController.createDish)


router.get(dishesAPI + "/:id", dishesController.getById)
router.patch(dishesAPI + "/:id", dishesController.updateDish)
router.delete(dishesAPI + '/:id', dishesController.deleteDish)


export default router;