const defaultBreakPoints = {
    xs:768,
    sm:992,
    md:1200,
    lg:Infinity,
}

const defaultTag = 'div';

const defaultConfig = {
    breakpoints:defaultBreakPoints,
    tag:defaultTag,
}

function setMq(name,evt){
    if(evt.matches){
        this.mq = name;
    }
}

export default{
    install(Vue,{breakpoints=defaultBreakPoints,tag=defaultTag}=defaultConfig){


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
            computed:{
                nameIndexMap(){
                    return this.mediaList.reduce((obj,item,index)=>{
                        obj[item.name] = index;
                        return obj;
                    },{});
                },
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
            components:{
                mqLayout:{
                    functional:true,
                    name:"mq-layout",
                    render(h,{props,slots}){

                        const defaultSlot = slots().default;

                        if(!defaultSlot){
                            return;
                        }

                        let mqList = Array.isArray(props.visible)?Array.from(props.visible):[props.visible];

                        if(props.plus || props.minus){
                            const indexArr = mqList.map((item)=>{
                                return mqvm.nameIndexMap[item];
                            })

                            if(props.plus){
                                let maxIndex = Math.max(...indexArr);
                                for(let i=maxIndex+1;i<mediaList.length;i++){
                                    mqList.push(mediaList[i].name);
                                }

                            }

                            if(props.minus){
                                let minIndex = Math.min(...indexArr);
                                for(let i=0;i<minIndex;i++){
                                    mqList.push(mediaList[i].name);
                                }
                            }
                            
                        }

                        if(mqList.includes(mqvm.mq)){
                            let childLength = defaultSlot.length;
                            if(childLength>1 || !props.slim){
                                return h(props.tag,defaultSlot);
                            }else{
                                return defaultSlot[0];
                            }
                        }

                    },
                    props:{
                        visible:{
                            type:[Array,String],
                            required:true,
                        },
                        plus:{
                            type:Boolean,
                            default:false,
                        },
                        minus:{
                            type:Boolean,
                            default:false,
                        },
                        slim:{
                            type:Boolean,
                            default:false,
                        },
                        tag:{
                            type:String,
                            default:tag,
                        }
                    },

                }
            },
            filters:{
                mq(mediaQuery,config={}){

                },
            },


        });

    }
}