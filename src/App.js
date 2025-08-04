import { useState, useEffect } from 'react';
import './App.css';
import { layout, widgets } from './components';
import { useGetElementSizes } from './utils/hooks/useGetElementSizes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [dimensions, setDimensions] = useState({
    headerHeight: 0,
    footerHeight: 0
  });

  useEffect(() => {
    const updateDimensions = () => {
      const header = document.getElementById('Header');
      const footer = document.getElementById('Footer');
      const contact = document.getElementById('Contact');

      setDimensions({
        headerHeight: header?.offsetHeight || 0,
        footerHeight: footer?.offsetHeight || 0,
        contactHeight: contact?.offsetHeight || 0,
      });
    };

    // Atualiza inicialmente
    updateDimensions();

    // Configura observers
    const resizeObserver = new ResizeObserver(updateDimensions);
    const header = document.getElementById('Header');
    const footer = document.getElementById('Footer');
    const contact = document.getElementById('Contact');

    if (header) resizeObserver.observe(header);
    if (footer) resizeObserver.observe(footer);
    if (contact) resizeObserver.observe(contact);

    return () => resizeObserver.disconnect();
  }, []);

  // Aplica as dimensões como variáveis CSS
  useEffect(() => {
    document.documentElement.style.setProperty('--header-height', `${dimensions.headerHeight}px`);
    document.documentElement.style.setProperty('--footer-height', `${dimensions.footerHeight}px`);
    document.documentElement.style.setProperty('--contact-height', `${dimensions.contactHeight}px`);
  }, [dimensions]);

  // Especifica os IDs dos elementos que quer monitorar
  const { viewportHeight, 'Header': headerHeight, 'Footer': footerHeight } =
    useGetElementSizes(['Header', 'Footer']);

  // Calcula a altura do banner
  const bannerHeight = Math.max(0, viewportHeight - headerHeight - footerHeight);

  return (
    <BrowserRouter>
      <div className='App-container'>
        {console.log(viewportHeight, headerHeight, footerHeight, bannerHeight)}
        <layout.Header id='Header' />
        <div className='App-content' id='Content'>
          <layout.Banner height={bannerHeight} />
          <layout.About id='About'/>
          <layout.Contact id='Contact'/>
        </div>
        <layout.Footer id='Footer' />
      </div>
    </BrowserRouter>

  );
}

export default App;
