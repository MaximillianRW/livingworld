// hooks/useGetElementSizes.js
import { useState, useEffect } from 'react';

export function useGetElementSizes(elementIds = []) {
  const [sizes, setSizes] = useState(() => ({
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    ...elementIds.reduce((acc, id) => ({ ...acc, [id]: 0 }), {})
  }));

  useEffect(() => {
    // Função para atualizar todos os tamanhos
    const updateAllSizes = () => {
      const newSizes = {
        viewportHeight: window.innerHeight
      };

      // Atualiza cada elemento monitorado
      elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          // Força recálculo do layout antes de medir
          void element.offsetHeight; // Trigger reflow
          newSizes[id] = element.offsetHeight;
        } else {
          newSizes[id] = 0;
        }
      });

      setSizes(prev => {
        // Verifica se houve mudança real em qualquer valor
        const hasChanged = Object.keys(newSizes).some(
          key => prev[key] !== newSizes[key]
        );
        return hasChanged ? { ...prev, ...newSizes } : prev;
      });
    };

    // Atualiza imediatamente
    updateAllSizes();

    // Configura observers para cada elemento
    const resizeObservers = new Map();

    elementIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new ResizeObserver(updateAllSizes);
        observer.observe(element);
        resizeObservers.set(id, observer);
      }
    });

    // Observa redimensionamento da janela
    window.addEventListener('resize', updateAllSizes);
    // Observa mudanças no DOM que podem afetar layout
    window.addEventListener('load', updateAllSizes);

    return () => {
      // Limpa todos os observers
      resizeObservers.forEach(observer => observer.disconnect());
      // Remove event listeners
      window.removeEventListener('resize', updateAllSizes);
      window.removeEventListener('load', updateAllSizes);
    };
  }, [elementIds]);

  return sizes;
}