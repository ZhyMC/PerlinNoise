# PerlinNoise
PerlinNoise in Nodejs written and Copyrighted by Zhy

#Easy to use:
var perlin=require("./PerlinNoise.js");
var pesist=1/2;
var seed=123456;

let generator=new perlin(persist,seed);

var Zrange=256;//z=>(-256,256)
var width=512;
let perlins=generator.ZhyPerlin2D(Zrange,width);

console.log(perlins);//full points
