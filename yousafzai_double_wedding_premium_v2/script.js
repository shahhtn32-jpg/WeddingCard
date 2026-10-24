const envelope=document.getElementById("envelope"), screen=document.getElementById("envelopeScreen"), main=document.getElementById("invitation");
function openInvite(){if(envelope.classList.contains("open"))return;envelope.classList.add("open");setTimeout(()=>screen.style.opacity="0",800);setTimeout(()=>{screen.style.display="none";main.classList.remove("hidden");startPetals();setupScratch();},1400)}
document.getElementById("openButton").addEventListener("click",e=>{e.stopPropagation();openInvite()});envelope.addEventListener("click",openInvite);envelope.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openInvite()}});
const revealItems=document.querySelectorAll(".section,.event-card,.detail-box");const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("seen");e.target.animate([{opacity:.35,transform:"translateY(16px)"},{opacity:1,transform:"translateY(0)"}],{duration:650,easing:"ease-out"});observer.unobserve(e.target)}}),{threshold:.12});revealItems.forEach(el=>observer.observe(el));
function startPetals(){const layer=document.getElementById("petals");setInterval(()=>{if(document.hidden)return;const p=document.createElement("span");p.className="petal";p.textContent=Math.random()>.5?"✿":"❦";p.style.left=Math.random()*100+"%";p.style.fontSize=(12+Math.random()*12)+"px";p.style.setProperty("--drift",(Math.random()*100-50)+"px");p.style.animationDuration=(8+Math.random()*7)+"s";layer.appendChild(p);setTimeout(()=>p.remove(),16000)},1000)}
function setupScratch(){const canvas=document.getElementById("scratchCanvas"),ctx=canvas.getContext("2d"),stage=canvas.parentElement;function cover(){const r=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);canvas.width=r.width*dpr;canvas.height=r.height*dpr;canvas.style.width=r.width+"px";canvas.style.height=r.height+"px";ctx.setTransform(dpr,0,0,dpr,0,0);let w=r.width,h=r.height;ctx.save();ctx.beginPath();ctx.moveTo(w*.5,h*.91);ctx.bezierCurveTo(w*.42,h*.82,w*.08,h*.58,w*.08,h*.34);ctx.bezierCurveTo(w*.08,h*.08,w*.38,h*.04,w*.5,h*.26);ctx.bezierCurveTo(w*.62,h*.04,w*.92,h*.08,w*.92,h*.34);ctx.bezierCurveTo(w*.92,h*.58,w*.58,h*.82,w*.5,h*.91);ctx.closePath();let g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,"#b7873d");g.addColorStop(.45,"#f1d89c");g.addColorStop(.7,"#c79b50");g.addColorStop(1,"#e9c779");ctx.fillStyle=g;ctx.fill();ctx.clip();for(let i=0;i<150;i++){ctx.fillStyle=i%2?"#fff4d5aa":"#fff8e5";ctx.beginPath();ctx.arc(Math.random()*w,Math.random()*h,Math.random()*1.5+.3,0,Math.PI*2);ctx.fill()}ctx.restore();ctx.globalCompositeOperation="destination-out"}cover();let down=false,count=0;function point(e){let r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}function erase(e){if(!down)return;let p=point(e);ctx.beginPath();ctx.arc(p.x,p.y,22,0,Math.PI*2);ctx.fill();if(++count%10===0)check()}function check(){let d=ctx.getImageData(0,0,canvas.width,canvas.height).data,clear=0,total=0;for(let i=3;i<d.length;i+=32){total++;if(d[i]<40)clear++}if(clear/total>.43){canvas.style.transition="opacity .7s";canvas.style.opacity="0";document.getElementById("scratchHint").textContent="Date revealed! We look forward to celebrating with you ♥";setTimeout(()=>canvas.remove(),750)}}canvas.addEventListener("pointerdown",e=>{down=true;canvas.setPointerCapture(e.pointerId);erase(e)});canvas.addEventListener("pointermove",erase);["pointerup","pointercancel","lostpointercapture"].forEach(ev=>canvas.addEventListener(ev,()=>down=false));window.addEventListener("resize",()=>{if(canvas.isConnected&&canvas.style.opacity!=="0"){cover();count=0}})}
const target=new Date("2026-11-04T16:00:00").getTime();function tick(){let n=Math.max(0,target-Date.now());const vals={days:Math.floor(n/86400000),hours:Math.floor(n%86400000/3600000),minutes:Math.floor(n%3600000/60000),seconds:Math.floor(n%60000/1000)};for(const [k,v] of Object.entries(vals))document.getElementById(k).textContent=String(v).padStart(2,"0")}tick();setInterval(tick,1000);

// Language toggle for key invitation copy (English / Urdu)
const languageToggle=document.getElementById("languageToggle");
let isUrdu=false;
const translations=[
  [".top-label","اللہ تعالیٰ کے فضل و کرم سے"],
  [".arabic-line","دعوتِ بارات و ولیمہ"],
  [".request","ہم اپنے پیارے صاحبزادوں کی شادی کی خوشی میں آپ کی شرکت اور دعاؤں کے طالب ہیں"],
  [".family-head","سرپرستِ خاندان"],
  [".intro-note .script-heading","دو بیٹے، خوشیوں کی دو نئی منزلیں"],
  [".intro-copy","اللہ تعالیٰ کے شکر اور اہلِ خانہ کی دعاؤں کے ساتھ، ہم آپ کو ان خوشیوں میں شریک ہونے کی دعوت دیتے ہیں۔ آپ کی شرکت اور دعائیں ہمارے لیے باعثِ مسرت ہوں گی۔"],
  [".scratch-section .script-heading","ایک خوبصورت سرپرائز"],
  [".scratch-section .eyebrow","دل کو رگڑ کر تاریخ دیکھیے"],
  [".scratch-hint","اپنی انگلی سے دل پر آہستہ آہستہ رگڑیں ✨"],
  [".event-section:not(.walima-section) .script-heading","بارات"],
  [".walima-section .script-heading","ولیمہ"],
  [".countdown-section .script-heading","تقریب تک باقی وقت"],
  [".details-section .script-heading","محبت اور احترام کے ساتھ"],
  [".closing-section .script-heading","آپ کی شرکت ہمارے لیے باعثِ برکت ہے"],
  [".closing-section>p:not(.script-heading)","اللہ کرے یہ دن محبت، خوشیوں اور نئی زندگی کے لیے دعاؤں سے بھرپور ہوں۔"],
  ["#whatsappButton","واٹس ایپ پر رابطہ کریں"],
  ["#shareButton","دعوت نامہ شیئر کریں ↗"]
];
const englishCopy=new Map();
translations.forEach(([selector])=>{const el=document.querySelector(selector);if(el)englishCopy.set(selector,el.textContent)});
languageToggle.addEventListener("click",()=>{
  isUrdu=!isUrdu;
  translations.forEach(([selector,urdu])=>{const el=document.querySelector(selector);if(el){el.textContent=isUrdu?urdu:englishCopy.get(selector);el.classList.toggle("urdu-text",isUrdu)}});
  document.querySelectorAll(".urdu-text").forEach(el=>{el.style.fontFamily=isUrdu?'"Noto Nastaliq Urdu", serif':'';el.style.direction=isUrdu?'rtl':'';el.style.lineHeight=isUrdu?'2.1':''});
  languageToggle.textContent=isUrdu?"English":"اردو";
});
// Native share on supported phones; copy invitation URL as a fallback
document.getElementById("shareButton").addEventListener("click",async()=>{
  const shareData={title:"The Yousafzai Wedding Celebration",text:"You are warmly invited to the wedding celebrations of Farhad & Mahnoor and Ali & Nabeela.",url:window.location.href};
  try{if(navigator.share){await navigator.share(shareData)}else if(navigator.clipboard){await navigator.clipboard.writeText(window.location.href);document.getElementById("shareButton").textContent=isUrdu?"لنک کاپی ہوگیا ✓":"Invitation link copied ✓"}else{window.prompt("Copy this invitation link:",window.location.href)}}catch(err){/* User cancelled the share sheet. */ }
});
