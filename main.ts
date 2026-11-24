const fs=require('fs'),I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
function run(p,g){
const s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),o=new Uint8Array(65536),T=e=>[o.subarray(0,z),e];
let q=0,w=0,pc=0,n=0,j=0,z=0,a,b;
for(;;){
if(n>=1e6)return T(10);
if(pc<0||pc>=p.length)return T(9);
const k=p[pc];
if(!(k<8||k>15&&k<35&&k!=31||k>47&&k<53||k==64||k==65||k>79&&k<84))return T(5);
let l=k==1?1:k==2?4:k>47&&k<52?2:0;
if(pc+1+l>p.length)return T(9);
n++;
switch(k){
case 0:return T(0);
case 1:if(q>255)return T(3);s[q++]=(p[pc+1]<<24)>>24;pc+=2;break;
case 2:if(q>255)return T(3);s[q++]=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;pc+=5;break;
case 3:if(q<1)return T(2);q--;pc++;break;
case 4:if(q<1)return T(2);if(q>255)return T(3);s[q]=s[q-1];q++;pc++;break;
case 5:if(q<2)return T(2);a=s[q-1];s[q-1]=s[q-2];s[q-2]=a;pc++;break;
case 6:if(q<2)return T(2);if(q>255)return T(3);s[q]=s[q-2];q++;pc++;break;
case 7:if(q<3)return T(2);a=s[q-3];s[q-3]=s[q-2];s[q-2]=s[q-1];s[q-1]=a;pc++;break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:
if(q<2)return T(2);b=s[q-1];a=s[q-2];q--;
if(k==16)s[q-1]=(a+b)|0;
else if(k==17)s[q-1]=(a-b)|0;
else if(k==18)s[q-1]=Math.imul(a,b);
else if(k==19){if(!b)return T(4);s[q-1]=(a-a%b)/b|0}
else if(k==20){if(!b)return T(4);s[q-1]=a%b}
else if(k==21||k==22){if(!b)return T(4);a>>>=0;b>>>=0;s[q-1]=k==21?Math.floor(a/b)|0:a%b}
else if(k==24)s[q-1]=a&b;
else if(k==25)s[q-1]=a|b;
else if(k==26)s[q-1]=a^b;
else if(k==28)s[q-1]=a<<(b&31);
else if(k==29)s[q-1]=a>>(b&31);
else if(k==30)s[q-1]=(a>>>(b&31))|0;
else if(k==32)s[q-1]=a==b?1:0;
else if(k==33)s[q-1]=a<b?1:0;
else s[q-1]=(a>>>0)<(b>>>0)?1:0;
pc++;break;
case 23:if(q<1)return T(2);s[q-1]=(-s[q-1])|0;pc++;break;
case 27:if(q<1)return T(2);s[q-1]=~s[q-1];pc++;break;
case 48:pc=pc+3+((p[pc+1]|p[pc+2]<<8)<<16>>16);break;
case 49:if(q<1)return T(2);a=s[--q];pc=a==0?pc+3+((p[pc+1]|p[pc+2]<<8)<<16>>16):pc+3;break;
case 50:if(q<1)return T(2);a=s[--q];pc=a!=0?pc+3+((p[pc+1]|p[pc+2]<<8)<<16>>16):pc+3;break;
case 51:if(w>63)return T(7);c[w++]=pc+3;pc=p[pc+1]|p[pc+2]<<8;break;
case 52:if(!w)return T(8);pc=c[--w];break;
case 64:if(q<1)return T(2);a=s[q-1];if(a<0||a>255)return T(6);s[q-1]=m[a];pc++;break;
case 65:if(q<2)return T(2);a=s[q-1];b=s[q-2];if(a<0||a>255)return T(6);m[a]=b;q-=2;pc++;break;
case 80:if(q<1)return T(2);a=s[--q];{const v=String(a);if(z+v.length>65536)return T(11);for(let i=0;i<v.length;i++)o[z++]=v.charCodeAt(i)}pc++;break;
case 81:if(q<1)return T(2);a=s[--q];if(z>65535)return T(11);o[z++]=a&255;pc++;break;
case 82:if(q>255)return T(3);s[q++]=j<g.length?g[j++]:-1;pc++;break;
case 83:if(q<1)return T(2);return T(s[--q]&255);
}}
}
for(const id of fs.readdirSync(I).sort()){const d=I+'/'+id;if(!fs.statSync(d).isDirectory())continue;const r=run(fs.readFileSync(d+'/program.bin'),fs.readFileSync(d+'/input.bin'));fs.mkdirSync(O+'/'+id,{recursive:true});fs.writeFileSync(O+'/'+id+'/stdout.bin',r[0]);fs.writeFileSync(O+'/'+id+'/exit.txt',r[1]+'\n')}
