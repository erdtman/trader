/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

const moment = require('moment-timezone');
moment.tz.setDefault("Europe/Stockholm");
const axios = require('axios');
const express = require('express');
const router = express.Router();
const models = require('./model.js');
const { OMXS30, OMXS30test } = require('./omxs30.js')

async function get(id, date) {
  let start, end;

  if(date) {
    start = moment(date, "YYYY-MM-DD").subtract(10, "days").format("YYYY-MM-DD");
    end = date;
  } else {
    start = moment().subtract(5, "days").format("YYYY-MM-DD");
    end = moment().format("YYYY-MM-DD");
  }

  const params = {
      "orderbookId": id,
      "start": `${start}T08:00`,
      "end": `${end}T22:00`,
      "chartType": "OHLC",
      "widthOfPlotContainer": 558,
      "chartResolution": "DAY",
      "navigator": false,
      "percentage": false,
      "volume": false,
      "owners": false,
      "ta": []
  }

  const result = await axios.post('https://www.avanza.se/ab/component/highstockchart/getchart/orderbook', params);

  // Open High Low Close
  const TIME = 0;
  const OPEN = 1;
  const HIGH = 2;
  const LOW = 3;
  const CLOSE = 4;

  const dataPoints = result.data.dataPoints
  .filter(dataPoint => dataPoint[1] != null && dataPoint[4] != null)
  .map((dataPoint) => {
      const change = dataPoint[CLOSE] - dataPoint[OPEN];

      return {
          "time": dataPoint[TIME],
          "change": change / dataPoint[OPEN] * 100,
          "close": dataPoint[CLOSE],
          "high": dataPoint[HIGH],
          "open": dataPoint[OPEN],
          "low": dataPoint[LOW],
      };
    }, {});

    const datapoint = dataPoints[dataPoints.length-1];
    if(!date && !moment().isSame(moment(datapoint.time), "day")){
      throw new Error("No trading today");
    }


    return datapoint;
}


router.get('/info', async (req, res) => {

  try {
    if(!req.query.date) {
      const now = moment();
      const limit = moment().hour(17).minute(30).second(0);
      if(now.isBefore(limit)) {
        return res.json({"state": "TO_EARLY"});
      }
    }

    const result = [];
    for(const stock of OMXS30) {
      const datapoint = await get(stock.id, req.query.date);
      const model = models[stock.name];
      const change = (datapoint.close-datapoint.open) / datapoint.open
      if(datapoint.change > model.fall) {
        result.push({
          "name": stock.name,
          "change": (change * 100).toFixed(2),
          "red": change < 0,
          "green": change > 0,
        });
      } else {
        const luckFactor = model.luck / model.total;
        const sellBefore = model.day;
        const sellAt = (model.sellAt+1) * datapoint.close;
        result.push({
          "name": stock.name,
          "change": (change * 100).toFixed(2),
          "luck": (luckFactor * 100).toFixed(2),
          "expectedEarning": (model.sellAt * 100).toFixed(2),
          "sellBefore": sellBefore,
          "sellAt":sellAt.toFixed(2),
          "buy": true,
          "red": change < 0,
          "green": change > 0,
        });
      }
    }

    res.json({
      "list": result,
      "state": "GO_GO_GO"});
  } catch (error) {
    console.log(error);
    return res.json({"state": "TRY_AGAIN_LATER"});
  }
});



module.exports = router;
