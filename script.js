        const getHeaderHeight = () => {
            return document.getElementById('mainHeader').offsetHeight;
        };

        const sections = Array.from(document.querySelectorAll('main section'));
        const navLinks = Array.from(document.querySelectorAll('.active-link'));
        const mobileLinks = Array.from(document.querySelectorAll('.mobile-link')); 
        const allLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

        const updateActiveLink = () => {
            const currentHeaderHeight = getHeaderHeight();
            const scrollPos = window.scrollY + currentHeaderHeight + 50; 
            let currentId = sections[0]?.id;
            
            for (const sec of sections) {
                if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
                    currentId = sec.id;
                    break;
                }
            }
            
            navLinks.forEach(link => {
                link.classList.remove('text-var-accent', 'border-var-accent');
                link.classList.add('text-var-text', 'border-transparent');

                if (link.getAttribute('href') === '#' + currentId) {
                    link.classList.add('text-var-accent', 'border-var-accent');
                    link.classList.remove('text-var-text', 'border-transparent');
                }
            });

            mobileLinks.forEach(link => {
                link.classList.remove('font-bold', 'text-var-accent-2');
                link.classList.add('font-normal', 'text-var-text');
                
                if (link.getAttribute('href') === '#' + currentId) {
                    link.classList.add('font-bold', 'text-var-accent-2');
                    link.classList.remove('font-normal', 'text-var-text');
                }
            });
        };

        const handleSmoothScroll = (e) => {
            const a = e.currentTarget;
            const id = a.getAttribute('href').substring(1);
            const el = document.getElementById(id);
            if (!el) return;
            
            e.preventDefault();
            
            if (a.classList.contains('mobile-link')) {
                closeMenu();
                setTimeout(() => {
                    window.scrollTo({ top: el.offsetTop - getHeaderHeight(), behavior: 'smooth' });
                    history.replaceState(null, '', '#' + id);
                }, 100); 
            } else {
                window.scrollTo({ top: el.offsetTop - getHeaderHeight(), behavior: 'smooth' });
                history.replaceState(null, '', '#' + id);
            }
        };

        allLinks.forEach(a => a.addEventListener('click', handleSmoothScroll));
        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();

        const mobileMenu = document.getElementById('mobileMenu');
        const openMenuBtn = document.getElementById('openMenu');
        const closeMenuBtn = document.getElementById('closeMenu');
        const backdrop = document.getElementById('mobileMenuBackdrop');

        const openMenu = () => {
            document.body.classList.add('no-scroll');
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            backdrop.classList.remove('opacity-0', 'pointer-events-none');
            backdrop.classList.add('opacity-100', 'pointer-events-auto');
        };

        const closeMenu = () => {
            document.body.classList.remove('no-scroll');
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            backdrop.classList.remove('opacity-100', 'pointer-events-auto');
            backdrop.classList.add('opacity-0', 'pointer-events-none');
        };

        openMenuBtn.addEventListener('click', openMenu);
        closeMenuBtn.addEventListener('click', closeMenu);
        backdrop.addEventListener('click', closeMenu);

        document.querySelectorAll('a[target="_blank"]').forEach(a => {
            if (!a.rel.includes('noopener')) a.rel = (a.rel ? a.rel + ' ' : '') + 'noopener';
        });

        const header = document.getElementById('mainHeader');
        let scrollTimeout;

        const handleHeaderScroll = () => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveLink, 50);
        };

        const observerOptions = {
    root: null,
    rootMargin: `-${getHeaderHeight()}px 0px 0px 0px`,
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.active-link[href="#${id}"]`);
        const mobileLink = document.querySelector(`.mobile-link[href="#${id}"]`);
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('text-var-accent', 'border-var-accent'));
            link?.classList.add('text-var-accent', 'border-var-accent');

            mobileLinks.forEach(l => l.classList.remove('font-bold', 'text-var-accent-2'));
            mobileLink?.classList.add('font-bold', 'text-var-accent-2');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));
