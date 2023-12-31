import DishesModels from "../model/dishes.models";
import { msgOk } from "../utils/okHandler";
import { errorResp } from "../utils/errorRes";

const dishesModels = new DishesModels()
class DishesUsecase {
    tableName = "dishes";
    constructor() {}
    async getAll(req, res) {
        try {
            console.time("time fetching all data")
            const filterReq = {};
            const query = req.query;
            if (query.limit) filterReq.limit = Number(query.limit);
            if (query.page) filterReq.page = Number(query.page);
            if (query.search) filterReq.search = query.search;

            const dishes = await dishesModels.find(
                {
                    limit: filterReq.limit,
                    page: filterReq.page
                },
                {
                    title: filterReq.search
                }
            );
            console.timeEnd("time fetching all data")
            return msgOk(res, 200, "get all dishes", dishes)

        } catch (e) {
            console.log(e)
        }
    }

    async getById(req, res) {
        const { id } = req.params
        console.log(id)
        try {
            const data = await dishesModels.getById(id)
            if (data) return msgOk(res, 200, "dish has found", data)
        } catch (e) {
            console.log(e)
            if (e.code === '22P02') return errorResp(res, 400, "id not found")
        }
    }

    async createDish(req, res) {
        try {
            const {title, description, category, price, imageUrl} = req.body
            const dish = await dishesModels.createDish(title.toLowerCase(), description, category, price, imageUrl)

            // handle error input
            if (dish.message) return errorResp(res, 400, dish.message)

            return msgOk(res, 201, "dish has been created", dish)
        } catch (e) {
            console.log(e.code)
            if (e.code === "23505") return errorResp(res, 400, "dish already exist")
        }
    }

    async updateDish(req, res) {
        try {
            const { id } = req.params
            const { title, description, category, price, imageUrl } = req.body
            let data = await dishesModels.getById(id)
            if (data) {
                await dishesModels.updateDish(id, title, description, category, price, imageUrl)
                return msgOk(res, 202, "dish has been updated", {
                    title,
                    description,
                    category,
                    price,
                    imageUrl
                })
            }
        } catch (e) {
            console.log(e.code)
            if (e.code === '22P02') return errorResp(res, 400, "id not found")
        }
    }
    
    async deleteDish(req, res) {
        try {
            const { id } = req.params
            console.log(id)
            const data = await dishesModels.getById(id)
            if (data) {
                await dishesModels.deleteDish(id)
                return msgOk(res, 202, "dish has been deleted", [])
            } else {
                return errorResp(res, 400, "dish cannot be deleted because id cannot found")
            }
        } catch (e) {
            console.log(e.code)
            if (e.code === '22P02') return errorResp(res, 400, "id not found")
        }
    }
}

const dishesController = new DishesUsecase()
export default dishesController;