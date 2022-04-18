import { burgersService } from "../services/BurgersService";
import BaseController from "../utils/BaseController";

export class BurgersController extends BaseController
{
    constructor()
    {
        super("api/burgers");

        this.router
            .get("", this.getBurgers)
            .get("/:name", this.getBurgerByName)
            .post("", this.postBurger)
            .put("/:name", this.putBurger)
            .delete("/:name", this.deleteBurger);
    }
    
    async getBurgers(req, res, next)
    {
        try
        {
            const gotBurgers = await burgersService.getBurgers(req.query);
            res.send(gotBurgers);
        }
        catch(error)
        {
            next(error);
        }
    }

    async getBurgerByName(req, res, next)
    {
        try
        {
            const gotBurger = await burgersService.getBurgerByName(req.params.name);
            res.send(gotBurger);
        }
        catch(error)
        {
            next(error);
        }
    }
    
    async postBurger(req, res, next)
    {
        try
        {
            const newBurger = await burgersService.postBurger(req.body);
            res.send(newBurger);
        }
        catch(error)
        {
            next(error);
        }
    }
    
    async putBurger(req, res, next)
    {
        try
        {
            const putBurger = await burgersService.putBurger(req.body, req.params.name);
            res.send(putBurger);
        }
        catch(error)
        {
            next(error);
        }
    }
    
    async deleteBurger(req, res, next)
    {
        try
        {
            const deletedBurger = await burgersService.deleteBurger(req.params.name);
            res.send(deletedBurger);
        }
        catch(error)
        {
            next(error);
        }
    }
}