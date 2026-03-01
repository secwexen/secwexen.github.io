        // Function to dynamically get the header height for accurate scrolling offset
        const getHeaderHeight = () => {
            return document.getElementById('mainHeader').offsetHeight;
        };

        const sections = Array.from(document.querySelectorAll('main section'));
        const navLinks = Array.from(document.querySelectorAll('.active-link'));
        const mobileLinks = Array.from(document.querySelectorAll('.mobile-link')); 
        const allLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

        /**
         * Updates the active link in the navigation based on the current scroll position.
         */
        const updateActiveLink = () => {
            const currentHeaderHeight = getHeaderHeight();
            // Offset scroll position to account for the fixed header
            const scrollPos = window.scrollY + currentHeaderHeight + 50; 
            let currentId = sections[0]?.id;
            
            // Determine which section is currently in view
            for (const sec of sections) {
                if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
                    currentId = sec.id;
                    break;
                }
            }
            
            // Highlight desktop links
            navLinks.forEach(link => {
                link.classList.remove('text-var-accent', 'border-var-accent');
                link.classList.add('text-var-text', 'border-transparent');

                if (link.getAttribute('href') === '#' + currentId) {
                    link.classList.add('text-var-accent', 'border-var-accent');
                    link.classList.remove('text-var-text', 'border-transparent');
                }
            });

            // Highlight mobile links
            mobileLinks.forEach(link => {
                link.classList.remove('font-bold', 'text-var-accent-2');
                link.classList.add('font-normal', 'text-var-text');
                
                if (link.getAttribute('href') === '#' + currentId) {
                    link.classList.add('font-bold', 'text-var-accent-2');
                    link.classList.remove('font-normal', 'text-var-text');
                }
            });
        };

        /**
         * Handles smooth scrolling to anchor links with correct header offset.
         */
        const handleSmoothScroll = (e) => {
            const a = e.currentTarget;
            const id = a.getAttribute('href').substring(1);
            const el = document.getElementById(id);
            if (!el) return;
            
            e.preventDefault();
            
            // Close menu if it's a mobile link click
            if (a.classList.contains('mobile-link')) {
                closeMenu();
                // Start scrolling after the menu closing animation finishes
                setTimeout(() => {
                    window.scrollTo({ top: el.offsetTop - getHeaderHeight(), behavior: 'smooth' });
                    history.replaceState(null, '', '#' + id);
                }, 100); 
            } else {
                window.scrollTo({ top: el.offsetTop - getHeaderHeight(), behavior: 'smooth' });
                history.replaceState(null, '', '#' + id);
            }
        };

        // Attach event listeners
        allLinks.forEach(a => a.addEventListener('click', handleSmoothScroll));
        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink(); // Initial call to set the active link

        // Mobile Menu Logic
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
        backdrop.addEventListener('click', closeMenu); // Close when clicking the backdrop

        // Security: Add noopener to external links
        document.querySelectorAll('a[target="_blank"]').forEach(a => {
            if (!a.rel.includes('noopener')) a.rel = (a.rel ? a.rel + ' ' : '') + 'noopener';
        });

        // Header Shrink Effect on Scroll
        const header = document.getElementById('mainHeader');
        let scrollTimeout;

        const handleHeaderScroll = () => {
            // Threshold for header shrink effect
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Debounce active link update to optimize performance
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
