#!/usr/bin/env node

const request = require('request')
const ethwallet = process.env.ETH_WALLET;

var wei = Number(1000000000000000000)
var mh = Number(1000000)
var usd = 'ethusd'


function getBalanceETH( wallet ) {
  request('https://api.etherscan.io/api?module=account&action=balance&address=' + wallet + '&tag=latest', (err, res, body) => {
   if (err) { console.error(err) } else {
	  var obj = JSON.parse(body) 
	  var x = Number(obj.result)
	  console.log('BANK: ' + x / wei)
	}
 })	
}

function getAskPriceGemini ( pair ) 
{
	request('https://api.gemini.com/v1/pubticker/' + pair, (err, res, body) => {
	if (err) {
	console.err(err)
	} else {
	var obj = JSON.parse(body)
	var x = Number(obj.ask)
	console.log('SELL: ' + x )
	}
	})
}
	
function getHashRateEthpool( wallet )
{
    request('http://api.ethpool.org/miner/' + wallet + '/currentStats', (err, res, body) => {
    if (err) {
	console.err(err)
	} else {
	var obj = JSON.parse(body)
	var x = Number(obj.data.averageHashrate)
	console.log('EARN: ' + x / mh )
	}
	})
}

getHashRateEthpool(ethwallet)
getBalanceETH(ethwallet) 
getAskPriceGemini(usd)

