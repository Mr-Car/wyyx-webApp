// ES6规范
// export const name= "车心伟";

//commonJS规范
module.exports={
    name:"车心伟",
    getName:function(){
         return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve("chexinwei6666666666666666666");
             },2000)
         })
    }
};

