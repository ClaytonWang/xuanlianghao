var e,t,i,r,a,s,l,n;import{m as o,a as d,o as u,c,w as p,n as h,b as g,d as v,e as y,f as m,F as f,r as _,i as b,g as w,h as S,j as x,t as $,k,l as C,p as N,q as I,S as M,s as T,u as B,v as j,x as L}from"./index-685619cf.js";import{_ as R}from"./uv-text.7ab5a449.js";import{r as U}from"./uni-app.es.a8106d8f.js";import{_ as W}from"./_plugin-vue_export-helper.1b428a4d.js";import{_ as D}from"./HomeNav.e1c2005f.js";import A from"./components-Suite-Suite.f37059d1.js";import{_ as z}from"./PrettyNumberItem.9eb6a950.js";import"./uv-icon.eee2cbbc.js";import"./uv-link.9fcfa607.js";import"./uv-image.cc80feb6.js";import"./uv-transition.0f4b918f.js";const P=W({name:"uv-swiper-indicator",mixins:[o,d,{props:{length:{type:[String,Number],default:0},current:{type:[String,Number],default:0},indicatorActiveColor:{type:String,default:""},indicatorInactiveColor:{type:String,default:""},indicatorMode:{type:String,default:""},...null==(t=null==(e=uni.$uv)?void 0:e.props)?void 0:t.swiperIndicator}}],data:()=>({lineWidth:22}),computed:{lineStyle(){let e={};return e.width=this.$uv.addUnit(this.lineWidth),e.transform=`translateX(${this.$uv.addUnit(this.current*this.lineWidth)})`,e.backgroundColor=this.indicatorActiveColor,e},dotStyle(){return e=>{let t={};return t.backgroundColor=e===this.current?this.indicatorActiveColor:this.indicatorInactiveColor,t}}}},[["render",function(e,t,i,r,a,s){const l=b;return u(),c(l,{class:"uv-swiper-indicator"},{default:p((()=>["line"===e.indicatorMode?(u(),c(l,{key:0,class:h(["uv-swiper-indicator__wrapper",[`uv-swiper-indicator__wrapper--${e.indicatorMode}`]]),style:g({width:e.$uv.addUnit(a.lineWidth*e.length),backgroundColor:e.indicatorInactiveColor})},{default:p((()=>[v(l,{class:"uv-swiper-indicator__wrapper--line__bar",style:g([s.lineStyle])},null,8,["style"])])),_:1},8,["class","style"])):y("",!0),"dot"===e.indicatorMode?(u(),c(l,{key:1,class:"uv-swiper-indicator__wrapper"},{default:p((()=>[(u(!0),m(f,null,_(e.length,((t,i)=>(u(),c(l,{class:h(["uv-swiper-indicator__wrapper__dot",[i===e.current&&"uv-swiper-indicator__wrapper__dot--active"]]),key:i,style:g([s.dotStyle(i)])},null,8,["class","style"])))),128))])),_:1})):y("",!0)])),_:1})}],["__scopeId","data-v-143e0992"]]);const G=W({name:"uv-swiper",mixins:[o,d,{props:{list:{type:Array,default:()=>[]},indicator:{type:Boolean,default:!1},indicatorActiveColor:{type:String,default:"#fff"},indicatorInactiveColor:{type:String,default:"rgba(255, 255, 255, 0.35)"},indicatorStyle:{type:[String,Object],default:""},indicatorMode:{type:String,default:"line"},autoplay:{type:Boolean,default:!0},current:{type:[String,Number],default:0},currentItemId:{type:String,default:""},interval:{type:[String,Number],default:3e3},duration:{type:[String,Number],default:300},circular:{type:Boolean,default:!1},vertical:{type:Boolean,default:!1},previousMargin:{type:[String,Number],default:0},nextMargin:{type:[String,Number],default:0},acceleration:{type:Boolean,default:!1},displayMultipleItems:{type:Number,default:1},easingFunction:{type:String,default:"default"},keyName:{type:String,default:"url"},imgMode:{type:String,default:"aspectFill"},height:{type:[String,Number],default:130},bgColor:{type:String,default:"#f3f4f6"},radius:{type:[String,Number],default:4},loading:{type:Boolean,default:!1},showTitle:{type:Boolean,default:!1},titleStyle:{type:Object,default:()=>{}},...null==(r=null==(i=uni.$uv)?void 0:i.props)?void 0:r.swiper}}],emits:["click","change"],data:()=>({currentIndex:0}),watch:{current(e,t){e!==t&&(this.currentIndex=e)}},computed:{itemStyle(){return e=>{const t={};return this.nextMargin&&this.previousMargin&&(t.borderRadius=this.$uv.addUnit(this.radius),e!==this.currentIndex&&(t.transform="scale(0.92)")),t}}},methods:{getItemType(e){return"string"==typeof e?this.$uv.test.video(this.getSource(e))?"video":"image":"object"==typeof e&&this.keyName?e.type?"image"===e.type?"image":"video"===e.type?"video":"image":this.$uv.test.video(this.getSource(e))?"video":"image":void 0},getSource(e){return"string"==typeof e?e:"object"==typeof e&&this.keyName?e[this.keyName]:(this.$uv.error("请按格式传递列表参数"),"")},change(e){const{current:t}=e.detail;this.pauseVideo(this.currentIndex),this.currentIndex=t,this.$emit("change",e.detail)},pauseVideo(e){const t=this.getSource(this.list[e]);if(this.$uv.test.video(t)){w(`video-${e}`,this).pause()}},getPoster:e=>"object"==typeof e&&e.poster?e.poster:"",clickHandler(e){this.$emit("click",e)}}},[["render",function(e,t,i,r,a,s){const l=U(S("uv-loading-icon"),R),n=b,o=C,d=N,h=I,w=M,B=T,j=U(S("uv-swiper-indicator"),P);return u(),c(n,{class:"uv-swiper",style:g({backgroundColor:e.bgColor,height:e.$uv.addUnit(e.height),borderRadius:e.$uv.addUnit(e.radius)})},{default:p((()=>[e.loading?(u(),c(n,{key:0,class:"uv-swiper__loading"},{default:p((()=>[v(l,{mode:"circle"})])),_:1})):(u(),c(B,{key:1,class:"uv-swiper__wrapper",style:g({height:e.$uv.addUnit(e.height),flex:1}),onChange:s.change,circular:e.circular,vertical:e.vertical,interval:e.interval,duration:e.duration,autoplay:e.autoplay,current:e.current,currentItemId:e.currentItemId,previousMargin:e.$uv.addUnit(e.previousMargin),nextMargin:e.$uv.addUnit(e.nextMargin),acceleration:e.acceleration,displayMultipleItems:e.displayMultipleItems,easingFunction:e.easingFunction},{default:p((()=>[(u(!0),m(f,null,_(e.list,((t,i)=>(u(),c(w,{class:"uv-swiper__wrapper__item",key:i},{default:p((()=>[v(n,{class:"uv-swiper__wrapper__item__wrapper",style:g([s.itemStyle(i)])},{default:p((()=>["image"===s.getItemType(t)?(u(),c(o,{key:0,class:"uv-swiper__wrapper__item__wrapper__image",src:s.getSource(t),mode:e.imgMode,onClick:e=>s.clickHandler(i),style:g({height:e.$uv.addUnit(e.height),borderRadius:e.$uv.addUnit(e.radius)})},null,8,["src","mode","onClick","style"])):y("",!0),"video"===s.getItemType(t)?(u(),c(d,{key:1,class:"uv-swiper__wrapper__item__wrapper__video",id:`video-${i}`,"enable-progress-gesture":!1,src:s.getSource(t),poster:s.getPoster(t),title:e.showTitle&&e.$uv.test.object(t)&&t.title?t.title:"",style:g({height:e.$uv.addUnit(e.height)}),controls:"",onClick:e=>s.clickHandler(i)},null,8,["id","src","poster","title","style","onClick"])):y("",!0),e.showTitle&&e.$uv.test.object(t)&&t.title?(u(),c(h,{key:2,class:"uv-swiper__wrapper__item__wrapper__title uv-line-1",style:g([e.$uv.addStyle(e.titleStyle)])},{default:p((()=>[x($(t.title),1)])),_:2},1032,["style"])):y("",!0)])),_:2},1032,["style"])])),_:2},1024)))),128))])),_:1},8,["style","onChange","circular","vertical","interval","duration","autoplay","current","currentItemId","previousMargin","nextMargin","acceleration","displayMultipleItems","easingFunction"])),v(n,{class:"uv-swiper__indicator",style:g([e.$uv.addStyle(e.indicatorStyle)])},{default:p((()=>[k(e.$slots,"indicator",{},(()=>[e.loading||!e.indicator||e.showTitle?y("",!0):(u(),c(j,{key:0,indicatorActiveColor:e.indicatorActiveColor,indicatorInactiveColor:e.indicatorInactiveColor,length:e.list.length,current:a.currentIndex,indicatorMode:e.indicatorMode},null,8,["indicatorActiveColor","indicatorInactiveColor","length","current","indicatorMode"]))]),!0)])),_:3},8,["style"])])),_:3},8,["style"])}],["__scopeId","data-v-33a77b85"]]),H={props:{isDot:{type:Boolean,default:!1},value:{type:[Number,String],default:""},show:{type:Boolean,default:!0},max:{type:[Number,String],default:999},type:{type:[String,void 0,null],default:"error"},showZero:{type:Boolean,default:!1},bgColor:{type:[String,null],default:null},color:{type:[String,null],default:null},shape:{type:[String,void 0,null],default:"circle"},numberType:{type:[String,void 0,null],default:"overflow"},offset:{type:Array,default:()=>[]},inverted:{type:Boolean,default:!1},absolute:{type:Boolean,default:!1},...null==(s=null==(a=uni.$uv)?void 0:a.props)?void 0:s.badge}};const F=W({name:"uv-badge",mixins:[o,d,H],computed:{boxStyle:()=>({}),badgeStyle(){const e={};if(this.color&&(e.color=this.color),this.bgColor&&!this.inverted&&(e.backgroundColor=this.bgColor),this.absolute&&(e.position="absolute",this.offset.length)){const t=this.offset[0],i=this.offset[1]||t;e.top=this.$uv.addUnit(t),e.right=this.$uv.addUnit(i)}return e},showValue(){switch(this.numberType){case"overflow":return Number(this.value)>Number(this.max)?this.max+"+":this.value;case"ellipsis":return Number(this.value)>Number(this.max)?"...":this.value;case"limit":return Number(this.value)>999?Number(this.value)>=9999?Math.floor(this.value/1e4*100)/100+"w":Math.floor(this.value/1e3*100)/100+"k":this.value;default:return Number(this.value)}},propsType(){return this.type||"error"}}},[["render",function(e,t,i,r,a,s){const l=I;return e.show&&(0!==Number(e.value)||e.showZero||e.isDot)?(u(),c(l,{key:0,class:h([[e.isDot?"uv-badge--dot":"uv-badge--not-dot",e.inverted&&"uv-badge--inverted","horn"===e.shape&&"uv-badge--horn",`uv-badge--${s.propsType}${e.inverted?"--inverted":""}`],"uv-badge"]),style:g([e.$uv.addStyle(e.customStyle),s.badgeStyle])},{default:p((()=>[x($(e.isDot?"":s.showValue),1)])),_:1},8,["class","style"])):y("",!0)}],["__scopeId","data-v-8c3e535e"]]);const O=W({name:"uv-tabs",emits:["click","change"],mixins:[o,d,{props:{duration:{type:Number,default:300},list:{type:Array,default:()=>[]},lineColor:{type:String,default:"#3c9cff"},activeStyle:{type:[String,Object],default:()=>({color:"#303133"})},inactiveStyle:{type:[String,Object],default:()=>({color:"#606266"})},lineWidth:{type:[String,Number],default:20},lineHeight:{type:[String,Number],default:3},lineBgSize:{type:String,default:"cover"},itemStyle:{type:[String,Object],default:()=>({height:"44px"})},scrollable:{type:Boolean,default:!0},current:{type:[Number,String],default:0},keyName:{type:String,default:"name"},...null==(n=null==(l=uni.$uv)?void 0:l.props)?void 0:n.tabs}}],data:()=>({firstTime:!0,scrollLeft:0,scrollViewWidth:0,lineOffsetLeft:0,tabsRect:{left:0},innerCurrent:0,moving:!1}),watch:{current:{immediate:!0,handler(e,t){e!==this.innerCurrent&&(this.innerCurrent=e,this.$nextTick((()=>{this.resize()})))}},list(){this.$nextTick((()=>{this.resize()}))}},computed:{textStyle(){return e=>{const t={},i=e===this.innerCurrent?this.$uv.addStyle(this.activeStyle):this.$uv.addStyle(this.inactiveStyle);return this.list[e].disabled&&(t.color="#c8c9cc"),this.$uv.deepMerge(i,t)}},propsBadge:()=>H},async mounted(){this.init()},methods:{setLineLeft(){const e=this.list[this.innerCurrent];if(!e)return;let t=this.list.slice(0,this.innerCurrent).reduce(((e,t)=>e+t.rect.width),0);const i=this.$uv.getPx(this.lineWidth);this.lineOffsetLeft=t+(e.rect.width-i)/2,this.firstTime&&setTimeout((()=>{this.firstTime=!1}),10)},animation(e,t=0){},clickHandler(e,t){this.$emit("click",{...e,index:t}),e.disabled||(this.innerCurrent=t,this.$nextTick((()=>{this.resize()})),this.$emit("change",{...e,index:t}))},init(){this.$uv.sleep().then((()=>{this.resize()}))},setScrollLeft(){const e=this.list[this.innerCurrent],t=this.list.slice(0,this.innerCurrent).reduce(((e,t)=>e+t.rect.width),0),i=this.$uv.sys().windowWidth;let r=t-(this.tabsRect.width-e.rect.width)/2-(i-this.tabsRect.right)/2+this.tabsRect.left/2;r=Math.min(r,this.scrollViewWidth-this.tabsRect.width),this.scrollLeft=Math.max(0,r)},resize(){0!==this.list.length&&Promise.all([this.getTabsRect(),this.getAllItemRect()]).then((([e,t=[]])=>{this.tabsRect=e,this.scrollViewWidth=0,t.map(((e,t)=>{this.scrollViewWidth+=e.width,this.list[t].rect=e})),this.setLineLeft(),this.setScrollLeft()}))},getTabsRect(){return new Promise((e=>{this.queryRect("uv-tabs__wrapper__scroll-view").then((t=>e(t)))}))},getAllItemRect(){return new Promise((e=>{const t=this.list.map(((e,t)=>this.queryRect(`uv-tabs__wrapper__nav__item-${t}`,!0)));Promise.all(t).then((t=>e(t)))}))},queryRect(e,t){return new Promise((t=>{this.$uvGetRect(`.${e}`).then((e=>{t(e)}))}))}}},[["render",function(e,t,i,r,a,s){const l=I,n=U(S("uv-badge"),F),o=b,d=B;return u(),c(o,{class:"uv-tabs",style:g([e.$uv.addStyle(e.customStyle)])},{default:p((()=>[v(o,{class:"uv-tabs__wrapper"},{default:p((()=>[k(e.$slots,"left",{},void 0,!0),v(o,{class:"uv-tabs__wrapper__scroll-view-wrapper"},{default:p((()=>[v(d,{"scroll-x":e.scrollable,"scroll-left":a.scrollLeft,"scroll-with-animation":"",class:"uv-tabs__wrapper__scroll-view","show-scrollbar":!1,ref:"uv-tabs__wrapper__scroll-view"},{default:p((()=>[v(o,{class:"uv-tabs__wrapper__nav",ref:"uv-tabs__wrapper__nav",style:g({flex:e.scrollable?"":1})},{default:p((()=>[(u(!0),m(f,null,_(e.list,((t,i)=>(u(),c(o,{class:h(["uv-tabs__wrapper__nav__item",[`uv-tabs__wrapper__nav__item-${i}`,t.disabled&&"uv-tabs__wrapper__nav__item--disabled"]]),key:i,onClick:e=>s.clickHandler(t,i),ref_for:!0,ref:`uv-tabs__wrapper__nav__item-${i}`,style:g([{flex:e.scrollable?"":1},e.$uv.addStyle(e.itemStyle)])},{default:p((()=>[v(l,{class:h([[t.disabled&&"uv-tabs__wrapper__nav__item__text--disabled"],"uv-tabs__wrapper__nav__item__text"]),style:g([s.textStyle(i)])},{default:p((()=>[x($(t[e.keyName]),1)])),_:2},1032,["class","style"]),v(n,{show:!(!t.badge||!(t.badge.show||t.badge.isDot||t.badge.value)),isDot:t.badge&&t.badge.isDot||s.propsBadge.isDot,value:t.badge&&t.badge.value||s.propsBadge.value,max:t.badge&&t.badge.max||s.propsBadge.max,type:t.badge&&t.badge.type||s.propsBadge.type,showZero:t.badge&&t.badge.showZero||s.propsBadge.showZero,bgColor:t.badge&&t.badge.bgColor||s.propsBadge.bgColor,color:t.badge&&t.badge.color||s.propsBadge.color,shape:t.badge&&t.badge.shape||s.propsBadge.shape,numberType:t.badge&&t.badge.numberType||s.propsBadge.numberType,inverted:t.badge&&t.badge.inverted||s.propsBadge.inverted,customStyle:"margin-left: 4px;"},null,8,["show","isDot","value","max","type","showZero","bgColor","color","shape","numberType","inverted"])])),_:2},1032,["onClick","style","class"])))),128)),v(o,{class:"uv-tabs__wrapper__nav__line",ref:"uv-tabs__wrapper__nav__line",style:g([{width:e.$uv.addUnit(e.lineWidth),transform:`translate(${a.lineOffsetLeft}px)`,transitionDuration:`${a.firstTime?0:e.duration}ms`,height:e.$uv.addUnit(e.lineHeight),background:e.lineColor,backgroundSize:e.lineBgSize}])},null,8,["style"])])),_:1},8,["style"])])),_:1},8,["scroll-x","scroll-left"])])),_:1}),k(e.$slots,"right",{},void 0,!0)])),_:3})])),_:3},8,["style"])}],["__scopeId","data-v-2fa32570"]]);const V=W({data:()=>({loading:!0,currTab:"phone",imgsList:["/static/img/swiper/3.jpg","http://hsz-phone.oss-cn-shanghai.aliyuncs.com/banner/20230213/2af8a801cde75ee45edd03a594d95f5d.png","http://hsz-phone.oss-cn-shanghai.aliyuncs.com/banner/20230213/1fa6f9febfc09c4b455ff0b80e0cfd04.png"],navList:[{name:"手机靓号",id:"phone"},{name:"超值套餐",id:"suite"}],active:{color:"red",fontWeight:"bold",transform:"scale(1.05)"},inactive:{color:"#606266",transform:"scale(1)"},suites:[{id:1,title:"大王卡29元",desc:"月租29元含30G专属流量，套外语音0.1元/分钟，短信0.1元/条.",time:"29分钟",flow:"30GB",img:"https://static.xuanxuanhao.com/tcsl/20230412/QOW7NW.jpg"},{id:2,title:"移动19元大流量",desc:"月租19元，50G通用流量、30G专属流量、首月免月租.",time:"19分钟",flow:"80GB",img:"https://static.xuanxuanhao.com/tcsl/20230705/MDTKEK.jpg"},{id:3,title:"天王卡59元",desc:"月租59元，含30G专属流量+10G国内流量+300分钟语音，首冲50得100话费.",time:"300分钟",flow:"40GB",img:"https://static.xuanxuanhao.com/tcsl/20230412/GDH9DF.jpg"}]}),async onLoad(){const e=await this.$http(this.$api.search,{filter:{rule:"",price:"3"}});this.loading=!1;const{data:t,code:i}=e.data;0==i&&j.dispatch("getPrettyNums",t.splice(0,10))},onShow(){console.log(j.state.myFavorite.length),L({index:1,text:j.state.myFavorite.length.toString()})},computed:{prettyNums(){return this.$store.state.prettyNums}},methods:{click(e){this.currTab=e.id}}},[["render",function(e,t,i,r,a,s){const l=U(S("uv-swiper"),G),n=U(S("HomeNav"),D),o=U(S("uv-tabs"),O),d=U(S("Suite"),A),h=b,g=U(S("uv-loading-icon"),R),w=U(S("PrettyNumberItem"),z);return u(),c(h,{class:"content"},{default:p((()=>[v(l,{list:a.imgsList,previousMargin:"50",nextMargin:"50",circular:"",autoplay:!0,radius:"5",height:"200px",bgColor:"#ffffff"},null,8,["list"]),v(n),v(o,{list:a.navList,onClick:s.click,class:"tab",activeStyle:a.active,inactiveStyle:a.inactive,itemStyle:"padding-left: 15px; padding-right: 15px; height: 34px;"},null,8,["list","onClick","activeStyle","inactiveStyle"]),"suite"===a.currTab?(u(),c(h,{key:0,class:"conent-suite-box"},{default:p((()=>[(u(!0),m(f,null,_(a.suites,(e=>(u(),c(h,{key:e.id},{default:p((()=>[v(d,{item:e},null,8,["item"])])),_:2},1024)))),128))])),_:1})):y("",!0),"phone"===a.currTab?(u(),c(h,{key:1,class:"content-number-box"},{default:p((()=>[a.loading?(u(),c(g,{key:0,text:"加载中",textSize:"30rpx"})):y("",!0),a.loading?y("",!0):(u(!0),m(f,{key:1},_(s.prettyNums,(e=>(u(),c(h,{key:e.id},{default:p((()=>[v(w,{item:e},null,8,["item"])])),_:2},1024)))),128))])),_:1})):y("",!0)])),_:1})}],["__scopeId","data-v-c9b2acc1"]]);export{V as default};
