import{_ as y,o as d,c as a,F as k,r as g,a as e,t as h,b,d as s,w as i,v as r,e as v}from"./index-caf07fb3.js";function x(){function o(){return((1+Math.random())*65536|0).toString(16).substring(1)}return o()+o()+"-"+o()+"-"+o()+"-"+o()+"-"+o()+o()+o()}const V={data(){return{message:"",tab:1,evr:!0,evrV:{max:100,dis:50},custMax:"",books:[{guid:x(),name:"剪商",price:99,oldprice:99,total:void 0,percent:void 0}],options:[{guid:x(),max:300,dis:50,checked:!1},{guid:x(),max:600,dis:50,checked:!1},{guid:x(),max:600,dis:60,checked:!1}]}},computed:{booksTotal(){return this.books.length?this.books.reduce((o,t)=>o+t.price,0):0},maxValue(){let o=this.options.filter(n=>n.checked===!0),t,m,_;return o.length?(this.tab==1?t=this.custMax?this.custMax:Math.max.apply(Math,o.map(n=>n.max)):t=this.booksTotal,m=o.reduce((n,u)=>t<u.max?0:n+u.dis,0)):(t=this.booksTotal,m=0),_=this.evr?Math.floor(t/this.evrV.max)*this.evrV.dis:0,{max:t,sum:m,evrsum:_,total:t-m-_}}},methods:{calc(o){console.log(this.maxValue);let t=this.maxValue.total/this.maxValue.max*o.price;o.total=t.toFixed(2),o.percent=(t/o.oldprice).toFixed(2)*100,console.log(o)},calcAll(){this.books.map(o=>{let t=this.maxValue.total/this.maxValue.max*o.price;o.total=t.toFixed(2),o.percent=(t/o.oldprice).toFixed(2)*100})},addbook(){this.books.push({guid:x(),name:"",price:0,oldprice:0,total:void 0,percent:void 0})},removebook(o){this.books=this.books.filter(t=>t.guid!=o)}}},f=e("div",null," 本工具仅供参考，主要用于对比不同平台活动价格差异。（不同平台之间算法可能存在略微差异，误差在几毛钱之间） ",-1),U=e("hr",null,null,-1),M=e("br",null,null,-1),C=["onUpdate:modelValue"],F=["onUpdate:modelValue"],T=["onUpdate:modelValue"],w=["onClick"],B=e("br",null,null,-1),N=e("br",null,null,-1),S=e("br",null,null,-1),A={key:0},D=e("br",null,null,-1),z={style:{display:"flex","margin-bottom":"5px"}},E={style:{display:"flex","align-items":"center"}},L={style:{display:"flex","align-items":"center"}},j={key:1},q=e("p",null,"（不填自动按满减最大值计算，比如600-50，默认为刚好凑满600的价格）",-1),G=e("br",null,null,-1),H=e("hr",null,null,-1),I=e("div",null,"折扣选择",-1),J=e("br",null,null,-1),K={style:{display:"flex","align-items":"center"}},O={style:{width:"300px","text-align":"right"}},P=["onUpdate:modelValue"],Q={style:{width:"300px","text-align":"right"}},R=["onUpdate:modelValue"],W=["onUpdate:modelValue"];function X(o,t,m,_,n,u){return d(),a("div",null,[f,U,M,(d(!0),a(k,null,g(n.books,(l,p)=>(d(),a("div",{key:l.guid,style:{"margin-bottom":"5px"}},[e("label",null,[s("名称 "),i(e("input",{type:"text","onUpdate:modelValue":c=>l.name=c},null,8,C),[[r,l.name]])]),e("label",null,[s("现价 "),i(e("input",{type:"number","onUpdate:modelValue":c=>l.price=c},null,8,F),[[r,l.price]])]),e("label",null,[s("原价 "),i(e("input",{type:"number","onUpdate:modelValue":c=>l.oldprice=c},null,8,T),[[r,l.oldprice]])]),s("    "),e("label",null,"预计到手价格: "+h(l.total)+"元, 折扣率: "+h(l.percent)+"%",1),s("   "),p>0?(d(),a("button",{key:0,onClick:c=>u.removebook(l.guid),style:{"background-color":"rgb(235, 135, 135)",color:"#fff"}}," × ",8,w)):b("",!0)]))),128)),B,e("button",{onClick:t[0]||(t[0]=(...l)=>u.addbook&&u.addbook(...l))},"添加书籍"),N,S,n.tab==2?(d(),a("div",A," 合计："+h(n.books.length)+"本，总价："+h(u.booksTotal)+" 元，折后总价："+h(u.maxValue.total)+" 元 ",1)):b("",!0),D,e("div",z,[e("label",E,[s("自定义凑单总金额 "),e("input",{type:"radio",name:"a",checked:"",onChange:t[1]||(t[1]=l=>n.tab=1)},null,32)]),s("    "),e("label",L,[s("使用已选书籍总价 "),e("input",{type:"radio",name:"a",onChange:t[2]||(t[2]=l=>n.tab=2)},null,32)])]),n.tab==1?(d(),a("div",j,[e("label",null,[s("总共凑单金额 "),i(e("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=l=>n.custMax=l)},null,512),[[r,n.custMax]])]),q])):b("",!0),e("button",{onClick:t[4]||(t[4]=l=>u.calcAll()),style:{width:"100px",height:"30px","font-size":"14px"}}," 计算 "),G,H,e("div",null,[I,J,e("div",null,[e("label",K,[i(e("input",{type:"checkbox","onUpdate:modelValue":t[5]||(t[5]=l=>n.evr=l)},null,512),[[v,n.evr]]),e("div",O,[s(" 每满 "),i(e("input",{type:"number","onUpdate:modelValue":t[6]||(t[6]=l=>n.evrV.max=l)},null,512),[[r,n.evrV.max]]),s(" 减 "),i(e("input",{type:"number","onUpdate:modelValue":t[7]||(t[7]=l=>n.evrV.dis=l)},null,512),[[r,n.evrV.dis]])])])]),e("div",null,[(d(!0),a(k,null,g(n.options,l=>(d(),a("label",{style:{display:"flex","align-items":"center"},key:l.guid},[i(e("input",{type:"checkbox","onUpdate:modelValue":p=>l.checked=p},null,8,P),[[v,l.checked]]),e("div",Q,[s(" 满 "),i(e("input",{type:"number","onUpdate:modelValue":p=>l.max=p},null,8,R),[[r,l.max]]),s(" 减 "),i(e("input",{type:"number","onUpdate:modelValue":p=>l.dis=p},null,8,W),[[r,l.dis]])])]))),128))])])])}const Z=y(V,[["render",X]]);export{Z as default};
