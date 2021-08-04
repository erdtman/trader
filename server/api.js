/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

const moment = require('moment-timezone');
moment.tz.setDefault("Europe/Stockholm");
const axios = require('axios');
const express = require('express');
const router = express.Router();
const models = require('./model.js');
const { family } = require('./family.js');

async function get(id) {
  const result = await axios.get(`https://www.avanza.se/_cqbe/guide/stock/${id}/top`);

  if(!result.data || !result.data.quote || !result.data.quote.last ) {
    throw new Error("missing data in respoinse from avanza");
  }

  return result.data.quote.last;
}

function round(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

async function evalSet(set) {
  const stocks = await Promise.all(set.stocks.map(async stock => {
    const lastPrice = await get(stock.id);
    const change = (lastPrice - stock.buyPrice) / stock.buyPrice * 100;

    return {
      buyPrice: stock.buyPrice,
      lastPrice: lastPrice,
      change: round(change),
      name: stock.name
    };
  }));
  const sum = stocks.reduce((acc,stock) => acc + stock.change, 0)
  const averageChange = sum / stocks.length;
  return {
    stocks: stocks,
    averageChange: round(averageChange),
    name: set.name
  }

}


router.get('/info', async (req, res) => {
  try {
    const f2 = await Promise.all(family.map(evalSet));
    const f3 = f2.sort((a,b) => b.averageChange - a.averageChange)


    res.json({
      "list": f2,
      "state": "GO_GO_GO"});
  } catch (error) {
    console.log(error);
    return res.json({"state": "TRY_AGAIN_LATER"});
  }
});



module.exports = router;
