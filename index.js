const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const throttle = {};


/**
 * Display given item in console
 * 
 * @param {*} item - Item to be displayed
 */
throttle.print = (item) => {

    console.log(item);
}


/**
 * Set the value in cache
 * 
 * @param {string} key  Name used to set value as placeholder
 * @param {*} val  Value passed to be set under key
 * @param {number} ttl  Time to expire the set value
 */
throttle.setter = function(key, val, ttl) {

    return new Promise((resolve, reject) => {

        myCache.set(key, val, ttl, (err, success)=>{
            if(!err && success){
                resolve({message: "Success: value set succesfully!"});
            }else{
                reject({message: "Fail: Unable to set value!"});
            }
    
        });
    })
    

};



/**
 * Get the value set from cache
 * 
 * @param {string} key Name under which value is set 
 */
throttle.getter = function(key) {
    
    return new Promise((resolve, reject) => {
        myCache.get(key, (err, value) => {
            if(!err){
                if(value == undefined){
                    resolve({message: "Success: Value not found!", data: value});
                }else{
                    resolve({data: value, message: "Success: Value fetched succesfully!"});
                }

            }else{
                reject({data: err, message: "Fail: Error getting value!"});
            }

        });
    });

};


module.exports = throttle;