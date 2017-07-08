# PerlinNoise
PerlinNoise in Nodejs written and Copyrighted by Zhy<br/>
<br/>
#Easy to use:<br/>
var perlin=require("./PerlinNoise.js");<br/>
<br/>
var pesist=1/2;<br/>
var seed=123456;<br/>
<br/>
let generator=new perlin(persist,seed);<br/>
<br/>
var Zrange=256;//z=>(-256,256)<br/>
var width=512;<br/>
let perlins=generator.ZhyPerlin2D(Zrange,width);<br/>
<br/>
console.log(perlins);//full points<br/>
