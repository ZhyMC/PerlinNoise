//var BN=require("bignumber.js");

function calc_(x)
{return calc2D(x,x);
}
function calc(x,len,after){//1/x
	
	x=x.toFixed(15);
let ret=new BN(0);
	let tf=after%2==0?true:false;
	for(let i=after;i<=len;i++){
if(tf)
		ret=ret.plus((new BN(x)).pow(i));
	else
		ret=ret.minus((new BN(x)).pow(i));
		tf=!tf;
		
	}

let str=ret.toFixed(200);
let nega=parseInt(str.substring(185,186))%2==0;
let s=str.substring(186,200);

	return parseFloat((nega?"":"-")+"0."+s);
}
/*function calc2D_(x,y,len,after){//1/Math.sqrt(xy)
	return Math.random();
	let xy=0;
	if(x*y<0)
	 xy=-Math.sqrt(-x*y);		
		else
	 xy=Math.sqrt(x*y);
	
	xy=xy.toFixed(15);
let ret=new BN(0);
	let tf=after%2==0?true:false;
	for(let i=after;i<=len;i++){
if(tf)
		ret=ret.plus((new BN(xy)).pow(i));
	else
		ret=ret.minus((new BN(xy)).pow(i));
		tf=!tf;
		
	}

let str=ret.toFixed(200);
let nega=parseInt(str.substring(185,186))%2==0;
let s=str.substring(186,200);

	return parseFloat((nega?"":"-")+"0."+s);
}*/


function calc2D(x,y){
	//return Math.random();
let n =(x + y * 57)*10;
n = ((n<<13) ^ n);
let N= (n * (n * n * 15731.0 + 789221.0) + 1376312589.0);
return ( 1.0 - ( N& 0x7fffffff) / 1073741824.0);
}
function Noise2D(x,y){
	return calc2D(Math.sin(x),Math.sin(y),100,70);
}
function Noise(x){

	return calc_(Math.sin(x),100,70);
	
}

function LinearInsert(x1,y1,x2,y2,x){
	
		let e=x1;
			let f=y1;
			let g=x2;
			let h=y2;
			let k=(f-h)/(e-g);
			let b=f-e*k;
	return k*x+b; console.log(z);
}
function Perlin(pers,seed){
	
	this.persist=pers;
this.seed=seed;
	
	
//=================

	this.PerlinSingle=function(x,S,width){
let fr=Math.pow(2,S);//1 2 4 8 16 32
let len=width/(fr);
	
	
	if(len%1!==0)throw new Error(1,"Make sure width/fr belongs to 'Z'");
		
	let xS=[];
	for(let i=0;i<=fr;i++)
	{

		xS.push([i*len,Math.pow(this.persist,S)*Noise((fr)*(i*len+x))]);		
	}
	let toAdded=[];
	for(let i=0;i<xS.length-1;i++){
			now=xS[i];
	next=(i)>fr?[(i+1)*len,xS[fr][1]]:xS[i+1];

		for(let j=now[0]+1;j<next[0];j++)
		toAdded.push([j,LinearInsert(now[0],now[1],next[0],next[1],j)]);
		
	
		}
	xS=xS.concat(toAdded);
	
	xS.sort((a,b)=>{
	return a[0]-b[0];
	});


			//process.exit();
		return xS;
	
}	
this.PerlinSingle2D=function(x,y,S,width){Math.random()
let fr=Math.pow(2,S);//1 2 4 8 16 32
let len=width/(fr);
										
	if(len%1!==0)throw new Error(1,"Make sure width/fr belongs to 'Z'");
	
	let xS=new Array(width);for(let n=0;n<width;n++)xS[n]=new Array(width);

	for(let i=0;i<fr;i++)
	for(let j=0;j<fr;j++)
	{
		xS[i*len][j*len]=Math.pow(this.persist,S)*Noise2D((fr)*(i*len+x),(fr)*(j*len+x));	
	//	console.log(xS[i*len][j*len],i*len,j*len);
	}
	
	
	for(let i=0;i<fr;i++)//1,2
		for(let j=0;j<fr;j++)//1,2
		{
			// O O
			// O O
	
			let right=i+1;if(i>=fr-1)right=fr-1;
			let top=j+1;if(j>=fr-1)top=fr-1;
	
			
			now=xS[i*len][j*len];
		
			next1=xS[right*len][top*len];
			next2=xS[right*len][j*len];
			next3=xS[i*len][top*len];
			
			/*
			next3 next1
			now   next2
			*/
		
			let ZZ1=[];let ZZ2=[];
			
			for(let Q=j*len+1;Q<=(j+1)*len;Q++){
			 ZZ1.push(LinearInsert(j*len,now,(j+1)*len,next3,Q));//now -> next3
				
			}
			
			for(let W=j*len+1;W<=(j+1)*len;W++){//next2 -> next1
			 ZZ2.push(LinearInsert(j*len,next2,(j+1)*len,next1,W));		
				
				
			}
			
			for(let k=0;k<len;k++){
				for(let l=0;l<len;l++)
				{
				//	if(k==0 && l==0)break;
			//		console.log(k,l)
				
					let val=LinearInsert(i*len,ZZ1[k],(i+1)*len,ZZ2[k],i*len+l+1);
		//			console.log(val);
		//	 console.log(i*len+l,j*len+k,val);
			xS[i*len+l][j*len+k]=val;
					
				//console.log(val,i*len+l,i*len+k)
				}
				
			}
			
			//	process.exit();
			
		}
	
		
		return xS;
	
}
this.ZhyPerlin=function(range,width,nega){
	let x=this.seed;
	if(nega)
		range/=2;
	let C=range;
let pl=[];
	for(let i=0;i<=width;i++)
	
		pl.push([i,0]);		
		let times=parseInt(Math.log(width)/Math.log(2));
	for(let i=0;i<=times;i++){
		let ps=this.PerlinSingle(x,i,width);
	
		for(let i=0;i<=width;i++)
			pl[i][1]+=ps[i][1];
	}
	for(let i=0;i<=width;i++)
	pl[i][1]=range*(pl[i][1])+(nega?range:0);

return pl;
}
this.ZhyPerlin2D=function(range,width,nega){
	let x=this.seed;
	let y=Math.sqrt(seed);
	
	if(nega)
		range/=2;
	let C=range;
let pl=new Array(width);for(let n=0;n<width;n++)pl[n]=new Array(width);
	
	for(let i=0;i<width;i++)
		for(let j=0;j<width;j++)
		pl[i][j]=0;		
	
	let times=parseInt(Math.log(width)/Math.log(2));
	for(let i=1;i<=times;i++){
		let ps=this.PerlinSingle2D(x,y,i,width);
		//console.log(ps);
		
		for(let ii=0;ii<width;ii++)
			for(let jj=0;jj<width;jj++)
			pl[ii][jj]+=ps[ii][jj];
	}
	for(let i=0;i<width;i++)
		for(let j=0;j<width;j++)	
	pl[i][j]=range*(pl[i][j])+(nega?range:0);
return pl;
}

}

//=========================test==============================
function isGUI(){return typeof document != "undefined";}
var gui;var gl;
if(isGUI()){
//gui=document.getElementById("pic").getContext("2d");
//gl=getWebGLContext(document.getElementById("pic"));
}
function drawRect(x,y,width,height,color)
{

let since=gui.fillStyle;
gui.fillStyle=color;
gui.fillRect(x,y,width,height);
gui.fillStyle=since;
}

function test2D_in3D(){
	

	
}
function test2D(){
	persist=1;
let perlins=ZhyPerlin2D(Math.random(),Math.random(),256,1024,true); //2D
for(let i=0;i<1024;i++)
		for(let j=0;j<1024;j++){
			let z=parseInt(perlins[i][j]);
	if(isGUI())
	drawRect(i,j,1,1,"rgb("+z+","+z+","+z+")");
		}}
function test1D(){
	persist=1/2;
let perlins=ZhyPerlin(Math.random(),512,1024);
	for(let i=0;i<1024;i++)
	{	let z=256+perlins[i][1];
	
	if(isGUI())
	drawRect(i,z,1,1,"red");
	}
}
module.exports=Perlin;

