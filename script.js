const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$('#year').textContent=new Date().getFullYear();
const menuBtn=$('.menu-btn'),nav=$('.nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
$$('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));
$$('.filter').forEach(btn=>btn.addEventListener('click',()=>{$$('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.work-card').forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.category!==f));}));
const currencies=$$('.currency');currencies.forEach(btn=>btn.addEventListener('click',()=>{currencies.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const c=btn.dataset.currency;$$('.price').forEach(p=>{const v=Number(p.dataset[c.toLowerCase()]);p.textContent=c==='USD'?`$${v.toLocaleString('en-US')}`:`₹${v.toLocaleString('en-IN')}`})}));
const modal=$('#inquiryModal'),serviceSelect=$('#serviceSelect');
function openModal(service=''){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';if(service){const option=[...serviceSelect.options].find(o=>o.value===service);if(option)serviceSelect.value=service}setTimeout(()=>$('.modal-panel input')?.focus(),60)}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
$$('[data-open-inquiry]').forEach(b=>b.addEventListener('click',()=>openModal()));$$('[data-service]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.service)));$$('[data-close-modal]').forEach(x=>x.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});
$('#inquiryForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const email='uvikachakraborty2004@gmail.com';const subject=encodeURIComponent(`New project inquiry — ${f.get('service')}`);const body=encodeURIComponent(`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nCompany: ${f.get('company')||'—'}\nCountry: ${f.get('country')}\nService: ${f.get('service')}\nBudget: ${f.get('budget')}\nTimeline: ${f.get('timeline')}\n\nProject:\n${f.get('message')}\n\nPayment: domestic INR / international USD`);$('#formStatus').textContent='Opening your email app…';window.location.href=`mailto:${email}?subject=${subject}&body=${body}`});
const revealTargets=$$('.work-card,.service-row,.price-card,.process-card,.about-copy,.quote-tile,.world-card,.cta-paper,.intro-main');revealTargets.forEach(el=>el.classList.add('reveal'));const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.08});revealTargets.forEach(el=>observer.observe(el));


// Pastel spark cursor — playful, lightweight and disabled on touch devices.
const cursor = document.querySelector('.cursor-spark');
if (cursor && window.matchMedia('(pointer:fine)').matches) {
  let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;
  window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  const tick = () => {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  };
  tick();
  const interactive = 'a, button, input, select, textarea, [role="button"]';
  document.querySelectorAll(interactive).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
  });
}

// Signature floral cursor + subtle pastel particle trail
(function(){
  if (!window.matchMedia("(pointer:fine)").matches) return;
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  let x = window.innerWidth/2, y = window.innerHeight/2, lastSpark = 0;
  window.addEventListener("mousemove", e => {
    x=e.clientX; y=e.clientY;
    cursor.style.left=x+"px"; cursor.style.top=y+"px";
    cursor.style.opacity="1";
    const now=performance.now();
    if(now-lastSpark>95){
      const s=document.createElement("span");
      s.className="cursor-spark";
      s.style.left=x+"px"; s.style.top=y+"px";
      s.style.setProperty("--sx", `${(Math.random()*24-12)}px`);
      s.style.setProperty("--sy", `${(Math.random()*24-12)}px`);
      document.body.appendChild(s);
      setTimeout(()=>s.remove(),700);
      lastSpark=now;
    }
  });
  const interactive="a,button,input,textarea,select,.project-card,.service-card,.price-card";
  document.addEventListener("mouseover",e=>{
    if(e.target.closest(interactive)) cursor.classList.add("hover");
  });
  document.addEventListener("mouseout",e=>{
    if(e.target.closest(interactive)) cursor.classList.remove("hover");
  });
  window.addEventListener("mouseout",e=>{ if(!e.relatedTarget) cursor.style.opacity="0"; });
})();
