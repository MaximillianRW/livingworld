const DATA_PATH = '/data'; // Caminho relativo à pasta 'public'

export const loadCharacterData = async () => {

  const files = [
    'ancestries.json',
    'backgrounds.json',
    'classes.json',
    'deities.json',
    'heritages.json',
  ];

  const requests = files.map(file => 
    fetch(`${DATA_PATH}/${file}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        return res.json();
      })
      .catch(error => {
        console.error(`Error loading ${file}:`, error);
        return []; // Retorna array vazio em caso de erro
      })
  );

  const [ancestries, backgrounds, classes, deities, heritages] = 
    await Promise.all(requests);

  return { ancestries, backgrounds, classes, deities, heritages };
};