import { HashLink } from 'react-router-hash-link';
import smoothscroll from 'smoothscroll-polyfill';

// Ativa o polyfill
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

// Componente com scroll personalizado
const sHashLink = ({ to, duration = 1000, children }) => {
  const handleScroll = (el) => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const start = window.pageYOffset;
    const target = el.getBoundingClientRect().top + start - headerHeight;
    const distance = target - start;
    const startTime = performance.now();

    const animation = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * progress);
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <HashLink to={to} smooth={true} scroll={handleScroll}>
      {children}
    </HashLink>
  );
};

export default sHashLink;