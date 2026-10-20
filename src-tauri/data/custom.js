window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

(function() {
  // Detecta se está rodando dentro do PakePlus (Tauri)
  const isPakePlus = !!(window.__TAURI__ || window.__TAURI_INTERNALS__);

  if (isPakePlus) {
    // 1. Esconde botões de download e "acessar online"
    const esconder = ['.download-pc', '.acessar-online', '.botao-download'];
    esconder.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
    });

    // 2. Se estiver na landing page, redireciona para o login
    const path = window.location.pathname;
    if (path === '/' || path === '/landing' || path === '/index.html') {
      window.location.replace('/login');
    }

    // 3. Opcional: intercepta o botão voltar para não sair do app
    window.addEventListener('popstate', function() {
      if (window.location.pathname === '/login' && document.referrer === '') {
        // Impede de voltar para uma página "vazia"
        history.pushState(null, '', '/login');
      }
    });
  }
})();
