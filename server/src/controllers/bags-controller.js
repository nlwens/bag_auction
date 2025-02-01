import statusCode from "http-status-codes";

import bags from '../data/bags-data.js';

export function getBags(req,res){
    let filteredBags = bags;
    const color = req.query.color;
    const brand = req.query.brand;
    const size = req.query.size;

    if (color) {
        filteredBags = filteredBags.filter(bag => bag.color === color);
    }

    if (brand) {
        filteredBags = filteredBags.filter(bag => bag.brand === brand);
    }

    if (size) {
        filteredBags = filteredBags.filter(bag => bag.size === size);
    }

    if (!bags || bags.length === 0) {
        return res.status(statusCode.OK).json([]);
    } else {
        res.status(statusCode.OK).json(filteredBags);
    }

}

export function searchBag (req, res) {
    const searchId = req.params.bagId;
    const searchedBag = bags.find(bag => bag.id === parseInt(searchId));

    if (searchedBag) {
        res.status(statusCode.OK).send(searchedBag);
    } else {
        return res.status(404).json({ error: "Bag not found" });
    }
}

export function addBag(req, res){
    const {name, brand, country, color, endDate, startPrice, size, src} = req.body

    if (!name || !brand || !country || !color || !endDate || !startPrice || !src) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (startPrice < 0) {
        return res.status(406).json({ error: "Start price must be a positive number" });
    }

    const endDateObj = new Date(endDate);
    const today = new Date(); // 当前日期

    if (isNaN(endDateObj.getTime())) {
        return res.status(400).json({ error: "Invalid endDate format" });
    } else if (endDateObj <= today) {
        return res.status(406).json({ error: "End date must be a future date" });
    }

    const id = bags.length > 0 ? bags[bags.length - 1].id + 1 : 1;
    const newBag =     {
        "id": id,
        "name": name,
        "brand": brand,
        "country": country,
        "color": color,
        "endDate": endDate,
        "startPrice": startPrice,
        "size": size,
        "src": src
    }
    bags.push(newBag)
    res.status(statusCode.CREATED).send("New bag added!");
}

export function updateBag(req, res) {
    const  bagId  = req.params.bagId;
    const { name, brand, country, color, endDate, startPrice, src } = req.body;

    const bag = bags.find(bag => bag.id === parseInt(bagId));

    if (!bag) {
        return res.status(404).json({ error: "Bag not found" });
    }

    if (name) bag.name = name;
    if (brand) bag.brand = brand;
    if (country) bag.country = country;
    if (color) bag.color = color;

    if (endDate) {
        const newEndDate = new Date(endDate);
        const today = new Date();
        if (newEndDate <= today) {
            return res.status(406).json({ error: "End date must be a future date" });
        }
        bag.endDate = endDate;
    }

    if (startPrice) {
        if (startPrice < 0) {
            return res.status(406).json({ error: "Start price must be a positive number" });
        }
        bag.startPrice = startPrice;
    }

    if (src) bag.src = src;

    res.status(200).json({ message: `Bag with ID ${bagId} has been updated`, bag });
}


export function deleteBag(req, res, next){
    const bagId  = req.params.bagId;
    const bagIndex = bags.findIndex(bag => bag.id === parseInt(bagId));

    if (bagIndex === -1) {
        return res.status(404).json({ error: "Bag not found" });
    }

    bags.splice(bagIndex, 1);

    res.status(200).send(`Bag with ID ${bagId} has been deleted`);
}