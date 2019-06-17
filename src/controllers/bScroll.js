module.exports={
    BetterScroll(){
        // 滚动实例化
        let bScroll = new BScroll('#index-scroll',{ 
            // 1为非实时触发scroll事件，2为实时触发，3不仅实时触发还在···中触发
            probeType:2
        })
        // 默认起始位置
        bScroll.scrollTo(0,-50)

        // 绑定滑动事件
        bScroll.on('scroll',function(){
            let y=this.y;
            let maxY=this.maxScrollY-y;
            console.log(this.maxScrollY,y,maxY);

            // 上拉刷新事件
            if(y>0){

            }
            // 下拉刷新事件
            if(maxY<0){

            }

        })

        // 滑动松手结束事件
        bScroll.on('scrollEnd',function(){

        })


    }
}