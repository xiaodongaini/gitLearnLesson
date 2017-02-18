var express = require('express'),
	cheerio = require('cheerio'),
	superagent = require('superagent');

var app = new express();

app.get('/',function(req,res,next){
	superagent.get('https://cnodejs.org/')
		.end(function(err,sres){
			if(err){
				next(err);
			}

			var $ = cheerio.load(sres.text);
			var items = [];
			$('#topic_list .topic_title').each(function(idx,element){
				var $element = $(element);
				items.push({
					title:$element.attr('title'),
					href:$element.attr('href')
				});
			});

			res.send(items);
		});
});

app.listen(3000,function(req,res){
	console.log('app is running at port 3000');
});