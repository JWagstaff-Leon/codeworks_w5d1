import { BurgerDB } from "../db/BurgerDB.js";
import { BadRequest } from "../utils/Errors.js";

class BurgersService
{
    getBurgers(query = {})
    {
        let gotBurgers = BurgerDB.burgers;
        for(let key in query)
        {
            gotBurgers = gotBurgers.filter(burger => burger[key].toString() == query[key])
        }
        return gotBurgers;
    }

    getBurgerByName(burgerName)
    {
        const gotBurger = BurgerDB.burgers.find(burger => burger.name === burgerName);
        if(!gotBurger)
        {
            throw new BadRequest(`Burger with name ${burgerName} not found.`);
        }
        return gotBurger;
    }

    postBurger(newBurgerData)
    {
        const newBurger = 
        {
            name: newBurgerData.name,
            toppings: newBurgerData.toppings,
            cheese: newBurgerData.cheese,
            pattyType: newBurgerData.pattyType
        }

        BurgerDB.burgers.push(newBurger);
        return newBurger;
    }

    putBurger(editedBurger, burgerToEdit)
    {
        const originalBurger = this.getBurgerByName(burgerToEdit);
        for(let key in originalBurger)
        {
            originalBurger[key] = editedBurger[key] || originalBurger[key];
        }
        return originalBurger;
    }

    deleteBurger(burgerName)
    {
        const deletedBurger = BurgerDB.burgers.find(burger => burger.name === burgerName);
        if(!deletedBurger)
        {
            throw new BadRequest(`Burger with name ${burgerName} not found.`);
        }

        BurgerDB.burgers = BurgerDB.burgers.filter(burger => burger.name !== burgerName);
        return deletedBurger;
    }
}

export const burgersService = new BurgersService();