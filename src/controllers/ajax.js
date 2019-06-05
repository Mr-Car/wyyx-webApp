module.exports={
    ajax(url) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: "get",
                url: url,
                dataType: "json",
                success (res) {
                    resolve(res);
                }
            });
        })
    }
}