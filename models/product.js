const fs=require('fs');
const path= require('path');
const p =path.join(
    path.dirname(process.mainModule.filename),
'data',
'products.json'
);
const fileproduct=cb=>{
    
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            return cb ([])
        }else{
            cb(JSON.parse(fileContent));
        }
            
    });
}


module.exports = class product{
    constructor(t){
        this.title = t;
    };

    save(){
        fileproduct(products=>{
            products.push(this)
        fs.writeFile(p,JSON.stringify(products),(err)=>{
            console.log(err);
        });
        });
    };

    //utility function this method directly on class not on instantial object 
    //hold function 
    // instead of data
    static fetchAll(cb){
        fileproduct(cb);
      
    }
};