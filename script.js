const getHeaderHeight = () =>
    document.getElementById('mainHeader').offsetHeight;

const sections = [...document.querySelectorAll('main section')];
const navLinks = [...document.querySelectorAll('.active-link')];
const mobileLinks = [...document.querySelectorAll('.mobile-link')];
const allLinks = [...document.querySelectorAll('a[href^="#"]')];

const mobileMenu = document.getElementById('mobileMenu');
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const backdrop = document.getElementById('mobileMenuBackdrop');
const header = document.getElementById('mainHeader');


const updateActiveLink = () => {
    const scrollPos = window.scrollY + getHeaderHeight() + 50;
    let currentId = sections[0]?.id;

    for (const section of sections) {
        if (scrollPos >= section.offsetTop) {
            currentId = section.id;
        }
    }
    
    navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${currentId}`;

        link.classList.toggle('text-var-accent', active);
        link.classList.toggle('border-var-accent', active);
        link.classList.toggle('text-var-text', !active);
        link.classList.toggle('border-transparent', !active);
    });

    mobileLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${currentId}`;

        link.classList.toggle('font-bold', active);
        link.classList.toggle('text-var-accent-2', active);
        link.classList.toggle('font-normal', !active);
        link.classList.toggle('text-var-text', !active);
    });
};


const openMenu = () => {
    if (!mobileMenu || !backdrop) return;

    document.body.classList.add('no-scroll');

    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');

    backdrop.classList.remove(
        'opacity-0',
        'pointer-events-none'
    );

    backdrop.classList.add(
        'opacity-100',
        'pointer-events-auto'
    );
};


const closeMenu = () => {
    if (!mobileMenu || !backdrop) return;

    document.body.classList.remove('no-scroll');

    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');

    backdrop.classList.remove(
        'opacity-100',
        'pointer-events-auto'
    );

    backdrop.classList.add(
        'opacity-0',
        'pointer-events-none'
    );
};


const handleSmoothScroll = (e) => {
    const link = e.currentTarget;
    const href = link.getAttribute('href');

    if (!href || href === '#') return;

    const id = href.substring(1);
    const element = document.getElementById(id);

    if (!element) return;

    e.preventDefault();

    const targetPosition =
        element.offsetTop - getHeaderHeight();

    if (link.classList.contains('mobile-link')) {
        closeMenu();

        setTimeout(() => {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            history.replaceState(null, '', `#${id}`);
        }, 100);

        return;
    }

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    history.replaceState(null, '', `#${id}`);
};


if (openMenuBtn) {
    openMenuBtn.addEventListener('click', openMenu);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
}

if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
}

allLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
});

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.rel.includes('noopener')) {
        link.rel = `${link.rel ? link.rel + ' ' : ''}noopener`;
    }
});


const handleHeaderScroll = () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    updateActiveLink();
};

window.addEventListener('scroll', handleHeaderScroll, {
    passive: true
});


updateActiveLink();
