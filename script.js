// Textos en inglés. El español está escrito directamente en index.html
const EN = {
  nav_about:'About', nav_skills:'Skills', nav_projects:'Projects', nav_exp:'Experience', nav_contact:'Contact',
  status:'Open to remote opportunities', role:'Junior Front-End Developer',
  lead:'I build clear, responsive web interfaces with Angular, TypeScript and JavaScript. I come from banking and technical support, so I think first about the user and about getting the data right.',
  btn_projects:'View projects', btn_cv:'Download CV',
  about_title:'About me',
  about_p1:'I am a final-year Systems Engineering student. I build web applications with Angular, JavaScript, HTML and CSS, consume REST APIs and work with Scrum.',
  about_p2:'My time at Banco Popular Dominicano, validating records and solving support incidents under service level agreements, gave me attention to detail and experience working with real users. I am looking for a front-end role where I can keep growing as part of a team.',
  skills_title:'Skills', sk1:'Front-end', sk2:'Data and APIs', sk3:'Quality and workflow',
  sk_sql:'SQL Server (in progress)', sk_test:'Unit testing (Vitest)', langs:'Languages: Spanish (native), English (intermediate, improving).',
  proj_title:'Projects', demo:'View demo', code:'View code',
  p1:'Character explorer with search, status and species filters applied on the API side, pagination and unit tests.',
  p2t:'HelpDesk (prototype)',
  p2:'Ticket system with user and agent roles, SLA per priority, filters and a metrics dashboard. Data lives in the browser; the Angular version is in progress. Test accounts: ana and carlos, password demo.',
  t_roles:'Roles', p3t:'Barbershop and salon template',
  p3:'Configurable page with services, prices, hours, location and bookings that open WhatsApp with the message ready. Made for small Dominican businesses.',
  p4:'PokéAPI consumption with Angular, routing and modular components.', t_routing:'Routing',
  p5t:'Clothing and accessories store',
  p5:'Responsive catalog to view products in detail, with semantic structure and modern CSS.',
  exp_title:'Experience and education',
  e1:'Formalization Analyst II. Validation and control of records, and detection of data inconsistencies.',
  e2:'Technical Support Intern. Hardware and software incidents, and Help Desk tickets within SLA.',
  e3:'Customer service and digital support. Guiding users on the bank\u2019s platforms.',
  e4:'Systems Engineering (final-year student).',
  e5:'Courses in Angular, JavaScript and databases.',
  contact_title:'Contact', contact_text:'Have a job opening or a project? Write to me and I will reply within a day.',
  loc:'Santo Domingo, Dominican Republic'
};

const $ = (s) => document.querySelector(s);
const nodes = [...document.querySelectorAll('[data-i18n]')];
nodes.forEach((n) => { n.dataset.es = n.textContent; });

function setLang(lang) {
  document.documentElement.lang = lang;
  nodes.forEach((n) => { n.textContent = lang === 'en' ? (EN[n.dataset.i18n] ?? n.dataset.es) : n.dataset.es; });
  const btn = $('#lang');
  btn.textContent = lang === 'en' ? 'ES' : 'EN';
  btn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
  document.title = lang === 'en'
    ? 'Miguel Laurencio | Junior Front-End Developer'
    : 'Miguel Laurencio | Desarrollador Front-End Junior';
  try { localStorage.setItem('lang', lang); } catch (e) { /* sin almacenamiento */ }
}

let saved = 'es';
try { saved = localStorage.getItem('lang') || 'es'; } catch (e) { /* sin almacenamiento */ }
setLang(saved === 'en' ? 'en' : 'es');
$('#lang').addEventListener('click', () => setLang(document.documentElement.lang === 'en' ? 'es' : 'en'));

// Menú móvil
const burger = $('#burger');
const menu = $('#menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// Enlace activo según la sección visible
const links = [...menu.querySelectorAll('a')];
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));

// Si la foto no existe, mostrar las iniciales
const photo = $('#photo');
const showInitials = () => { photo.hidden = true; $('#initials').hidden = false; };
photo.addEventListener('error', showInitials);
if (photo.complete && photo.naturalWidth === 0) showInitials();

$('#year').textContent = new Date().getFullYear();
