import statusCode from "http-status-codes";

import bids from '../data/bids-data.js';
import bags from '../data/bags-data.js'
import users from '../data/users-data.js'

export function getBids(req,res){
    const searchId = req.params.bagId;
    const filteredBids = bids.filter(bid => bid.bagId === parseInt(searchId));
    res.status(statusCode.OK).json(filteredBids);
}

export function placeBid(req, res) {
    const newBagId = parseInt(req.params.bagId);
    const newBidderId = parseInt(req.body.bidderId);
    const newBidAmount = req.body.bidAmount;

    const searchedBag = bags.find(bag => bag.id === newBagId);
    const searchUser = users.find(user => user.id === newBidderId)

    if (!searchedBag) {
        return res.status(404).json({ error: "Bag not found" });
    }

    if (!searchUser){
        return res.status(403).json({ error: "User not found" });
    }

    if (searchUser.isAdmin){
        return res.status(403).json({ error: "You cannot bid as an admin!" });
    }

    if (isNaN(newBidAmount)){
        return res.status(406).json({error: "Bid amount is not a valid number!"})
    }

    if (newBidAmount < searchedBag.startPrice){
        return res.status(406).json({error: "Bid amount must be bigger than start price!"})
    }

    if (searchedBag.currentPrice !== undefined){
        if (newBidAmount < searchedBag.currentPrice){
            return res.status(statusCode.BAD_REQUEST).json({error: "Your can only bidder higher than the others!"})
        }
    }

    const endDate = new Date(searchedBag.endDate)
    const now = new Date();

    if (endDate < now) {
        res.status(statusCode.BAD_REQUEST).json({ error: "This auction has already ended!" });
    }

    const newBid = {
        bidId: bids.length === 0 ? 1: bids.length + 1,
        bagId: newBagId,
        bidderId: newBidderId,
        bidderUsername: searchUser.username,
        bidAmount: newBidAmount
    };

    bids.push(newBid);
    searchedBag.lastBidderId = searchUser.id;
    searchedBag.currentPrice = newBidAmount;

    res.status(statusCode.CREATED).json({
        message: "New bid placed",
        bid: newBid
    });
}
