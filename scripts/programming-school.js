document.addEventListener('DOMContentLoaded', function() {
  // 現在の年を取得してフッターに表示
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // スクロールアニメーション
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
    
    // 遅延を適用
    const delay = element.getAttribute('data-aos-delay');
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }
  });
  
  // モバイルメニュー
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  
  if (mobileMenuButton) {
    let isMenuOpen = false;
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <nav>
        <a href="#features">特徴</a>
        <a href="#service">サービス概要</a>
        <a href="#success">受講生の声</a>
        <a href="#pricing">料金プラン</a>
        <a href="#contact" class="cta-button">まずは無料でカウンセリング</a>
      </nav>
    `;
    
    document.body.appendChild(mobileMenu);
    
    // スタイルを追加
    const style = document.createElement('style');
    style.textContent = `
      .mobile-menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background-color: white;
        padding: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 40;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .mobile-menu.open {
        transform: translateY(0);
        opacity: 1;
      }
      
      .mobile-menu nav {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .mobile-menu a {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .mobile-menu a:last-child {
        border-bottom: none;
      }
    `;
    
    document.head.appendChild(style);
    
    mobileMenuButton.addEventListener('click', function() {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        mobileMenu.classList.add('open');
      } else {
        mobileMenu.classList.remove('open');
      }
    });
    
    // メニューリンクをクリックしたらメニューを閉じる
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        isMenuOpen = false;
      });
    });
  }
  
  // フォーム送信処理
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // フォームデータを取得
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      // 実際のプロジェクトではここでAPIリクエストを送信
      console.log('フォーム送信:', { name, email, phone, message });
      
      // 送信成功メッセージ
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
          <p style="margin: 0;">お問い合わせありがとうございます。担当者より折り返しご連絡いたします。</p>
        </div>
      `;
      
      contactForm.prepend(successMessage);
      contactForm.reset();
      
      // 3秒後にメッセージを消す
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }
});