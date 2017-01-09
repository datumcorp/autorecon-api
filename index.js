"use strict";

const moment = require('moment')
	, rp = require('request-promise')
	, path = require('path')
	, fs = require('fs')
	;

let sample1 = {
	'.json': path.resolve(process.cwd(),'sample/sample1.1.json'),
	'.csv': path.resolve(process.cwd(),'sample/sample1.1.csv'),
	'.xls': path.resolve(process.cwd(),'sample/sample1.1.xls'),
	'.xlsx': path.resolve(process.cwd(),'sample/sample1.1.xlsx'),
	'.xml': path.resolve(process.cwd(),'sample/sample1.1.xml')
}
let sample2 = {
	'.json': path.resolve(process.cwd(),'sample/sample1.2.json'),
	'.csv': path.resolve(process.cwd(),'sample/sample1.2.csv'),
	'.xls': path.resolve(process.cwd(),'sample/sample1.2.xls'),
	'.xlsx': path.resolve(process.cwd(),'sample/sample1.2.xlsx'),
	'.xml': path.resolve(process.cwd(),'sample/sample1.2.xml')
}

let dataTypeToUse = ".json";

let profileid = 3;
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJyZWNvbiIsIm5iZiI6MTQ4MzY5NDY3OSwiaWF0IjoxNDgzNjk0Njc5LCJleHAiOjE1MTUyMzA2NzksImp0aSI6IjE4M2I4ZDZkZGQzZTY3MDIzNGIzN2Q1ODFjNDEwMjlmMGZjN2RkZDBlM2E3YjM1NmIwY2VjZmZiOTM2MmNiNDEiLCJwcm9maWxlbmFtZSI6IlNJQiIsInByb2ZpbGVpZCI6M30.wRyvADiBtbDNl6dULdtAC0clc6WXYw0Pqt3_sCAi-Ic' ;
let filepath = sample1[dataTypeToUse];

var options = {
    method: 'POST',
    uri: 'http://192.168.10.166:3000/!importer/process/' + profileid,
    formData: {
        file: fs.createReadStream(filepath)
    },
    headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
        'token': token
    }
};

let refid;
rp(options)
    .then(function (body) {
        // POST succeeded...
        console.log("firstUpload",typeof body);
        let json = JSON.parse(body);
        refid = json && json.data ? json.data : null;
        console.log('refid',refid)
        if(refid){
        	return subsequentUpload();
        }else{
        	return true;
        }
    })
    .then((body2)=>{
    	//subsequent upload result
    	console.log('subsequentUpload:',body2)
    })
    .catch(function (err) {
        // POST failed...
        console.log('request error: ',err.toString())
    });
let subsequentUpload = function(){
	let filepath2 = sample2[dataTypeToUse];
	var options2 = {
	    method: 'POST',
	    uri: 'http://192.168.10.166:3000/!importer/process/' + profileid+'?refid='+refid,
	    formData: {
	        file: fs.createReadStream(filepath2)
	    },
	    headers: {
	        /* 'content-type': 'application/x-www-form-urlencoded' */ // Set automatically
	        'token': token
	    }
	};
	return rp(options2);
}
