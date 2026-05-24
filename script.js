// Header scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Cursor glow
  const glow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  // Cards hover gradient
  document.querySelectorAll('.pcard').forEach(c => {
    c.addEventListener('mousemove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top)  + 'px');
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if (en.isIntersecting){
        setTimeout(()=> en.target.classList.add('in'), i * 60);
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Animate counters
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting){
        const el = en.target;
        const target = +el.dataset.count;
        const original = el.textContent;
        const prefix = original.match(/^[+]?/)?.[0] || '';
        const suffix = original.replace(/[\d+]/g,'').replace(prefix,'');
        let cur = 0;
        const step = Math.max(1, Math.floor(target/40));
        const id = setInterval(() => {
          cur += step;
          if (cur >= target){ cur = target; clearInterval(id); }
          el.innerHTML = (prefix.includes('+') ? '+' : '') + cur + (suffix.includes('%')?'%':'') + (suffix.includes('<span') ? '<span class="plus">+</span>':'');
          // simpler:
          el.textContent = (prefix || '') + cur + (original.includes('%') ? '%' : '');
        }, 30);
        cio.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cio.observe(c));

  // FAB social menu
  const fabWrap = document.getElementById('fabWrap');
  const fabMain = document.getElementById('fabMain');
  if (fabMain){
    fabMain.addEventListener('click', (e) => {
      e.stopPropagation();
      fabWrap.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!fabWrap.contains(e.target)) fabWrap.classList.remove('open');
    });
  }
  const particles = document.getElementById('particles');
  if (particles){
    for (let i=0; i<14; i++){
      const p = document.createElement('div');
      p.className = 'particle' + (Math.random() > .6 ? ' orange' : '');
      p.style.left = Math.random()*100 + '%';
      p.style.top  = Math.random()*100 + '%';
      p.style.animationDelay = (Math.random() * 8) + 's';
      p.style.animationDuration = (6 + Math.random() * 6) + 's';
      particles.appendChild(p);
    }
  }
