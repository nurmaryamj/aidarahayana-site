// Live clock
function startClock(){
  const el = document.getElementById('clock');
  if(!el) return;
  setInterval(()=>{
    const now = new Date();
    el.textContent = now.toLocaleString();
  }, 1000);
}

// Last updated stamp
function setUpdated(){
  const el = document.getElementById('updated');
  if(el){
    el.textContent = document.lastModified;
  }
}

// Cookie consent with Accept + Decline
function initCookies(){
  const consentKey = "aidarahayana_cookie_consent";
  const bar = document.getElementById("cookie-bar");
  if(!bar) return;

  // Check if cookie exists
  if(document.cookie.indexOf(consentKey + "=yes") === -1){
    bar.style.display = "flex";
  }

  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  if(acceptBtn){
    acceptBtn.onclick = ()=>{
      // Set cookie (expires in 30 days)
      document.cookie = consentKey + "=yes; path=/; max-age=" + (30*24*60*60);
      bar.style.display="none";
      alert("Thanks! Your preferences are saved.");
    };
  }

  if(declineBtn){
    declineBtn.onclick = ()=>{
      // Do not set cookie, just hide bar
      bar.style.display="none";
      alert("You declined cookies. Preferences will not be saved.");
    };
  }
}

// Accessibility: Text-only toggle
function initTextOnly(){
  const btn = document.getElementById('textOnlyToggle');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    document.documentElement.classList.toggle('text-only');
    btn.innerText = document.documentElement.classList.contains('text-only') ? 'Disable Text‑Only' : 'Enable Text‑Only';
  });
}

// Simple on-site search (filters links in the Site Map)
function initSearch(){
  const input = document.getElementById('search');
  const list = document.getElementById('sitemap-list');
  if(!input || !list) return;
  input.addEventListener('input', ()=>{
    const q = input.value.toLowerCase();
    [...list.querySelectorAll('li')].forEach(li=>{
      li.style.display = li.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// Page-specific animation triggers (reuse same classes)
function pageAnimate(){
  document.querySelectorAll('.section').forEach((sec,i)=>{
    const classes = ['fade-in','slide-up','pulse','glow-text'];
    sec.classList.add(classes[i % classes.length]);
  });
}

// Anchor smooth scroll
function initAnchors(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', ()=>{
  startClock();
  setUpdated();
  initCookies();
  initTextOnly();
  initSearch();
  pageAnimate();
  initAnchors();
});
