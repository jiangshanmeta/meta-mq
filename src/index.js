import mqLayout from './mq-layout'

const defaultBreakPoints = {
    xs:768,
    sm:992,
    md:1200,
    lg:Infinity,
}

function setMq(name,evt){
    if(evt.matches){
        console.log(name)
        this.mq = name;
    }
}

export default{
    install(Vue,{breakpoints=defaultBreakPoints}={breakpoints:defaultBreakPoints}){
        Vue.component('mq-layout',mqLayout);

        const mediaList = Object.keys(breakpoints).map(function(name){
            return {
                name,
                bp:breakpoints[name]
            }
        }).sort(function(a,b){
            return a.bp - b.bp;
        });

        const mqvm = new Vue({
            data:{
                mq:"",
                mediaList,
            },
            created(){
                const maxIndex = mediaList.length - 1;

                this.mediaList.forEach(function(item,index,arr){
                    let sql;

                    if(index === 0){
                        sql = `(max-width: ${item.bp-1}px)`;
                    }else if(index === maxIndex){
                        sql = `(min-width: ${arr[index-1].bp}px)`;
                    }else{
                        sql = `(min-width: ${arr[index-1].bp}px) and (max-width: ${item.bp-1}px)`
                    }

                    const handler = matchMedia(sql);

                    if(handler.matches){
                        this.mq = item.name;
                    }

                    handler.addListener(setMq.bind(this,item.name))


                },this);

            },
        });

        Vue.mixin({
            beforeCreate(){
                Object.defineProperty(this,'$mq',{
                    get(){
                        return mqvm.mq;
                    },
                })
            },
            filters:{
                mq(mediaQuery,config={}){

                },
            },


        });

    }
}