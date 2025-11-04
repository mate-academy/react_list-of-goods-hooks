import React, { useState, useMemo } from 'react';

// Define a interface para tipar cada item de produto
interface Good {
  id: number; // Usado para ordenar por 'Newest' (ordem de inserção)
  name: string;
  price: number;
}

// A lista inicial de produtos (tipada como Good[])
const initialGoods: Good[] = [
  { id: 1, name: 'Dumplings', price: 12.5 },
  { id: 2, name: 'Carrot', price: 2.1 },
  { id: 3, name: 'Eggs', price: 3.5 },
  { id: 4, name: 'Ice cream', price: 7.99 },
  { id: 5, name: 'Apple', price: 1.5 },
  { id: 6, name: 'Bread', price: 4.0 },
  { id: 7, name: 'Fish', price: 25.0 },
  { id: 8, name: 'Honey', price: 9.8 },
  { id: 9, name: 'Jam', price: 6.25 },
  { id: 10, name: 'Garlic', price: 0.99 },
];

// 1. Definição do Enum para os tipos de ordenação
enum SortType {
  Newest = 'NEWEST',
  Alphabetical = 'ALPHABETICAL',
  Cheapest = 'CHEAPEST',
}

// Função utilitária para formatar o preço
const formatPrice = (price: number): string => {
  // Usando um formatador simples para moeda USD. Pode ser ajustado conforme a região.
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// O componente principal, tipado como React.FC
export const App: React.FC = () => {
  // 2. Estado único para rastrear o tipo de ordenação atual (padrão é Newest)
  const [currentSortType, setCurrentSortType] = useState<SortType>(
    SortType.Newest,
  );

  // Manipulador genérico para mudar o tipo de ordenação
  const handleSort = (type: SortType) => {
    setCurrentSortType(type);
  };

  // 3. useMemo para calcular a lista ordenada com base no SortType
  const sortedGoods = useMemo(() => {
    // Começa sempre com uma cópia da lista inicial como base
    let list = [...initialGoods];

    if (currentSortType === SortType.Alphabetical) {
      // Ordenação Alfabética: por 'name'
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSortType === SortType.Cheapest) {
      // Ordenação por Preço (do menor para o maior)
      list.sort((a, b) => a.price - b.price);
    } else if (currentSortType === SortType.Newest) {
      // Ordenação por 'Newest' (ID ascendente = ordem original de inserção)
      list.sort((a, b) => a.id - b.id);
    }

    return list;
  }, [currentSortType]); // Dependência: só recalcula se currentSortType mudar

  // O botão Reset é ativo apenas se o estado atual NÃO for 'Newest' (o estado padrão)
  const isResetDisabled = currentSortType === SortType.Newest;

  // Função auxiliar para construir classes (incluindo 'is-active')
  const getButtonClass = (type: SortType, baseClass: string) => {
    const isActive = currentSortType === type;
    return `${baseClass} ${isActive ? 'is-active shadow-xl' : 'is-light shadow-md'}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
      />

      <div className="section content container mx-auto max-w-lg">
        <h1 className="title is-4 has-text-centered text-gray-800">
          Goods List Manager (Stateful Sorting)
        </h1>

        {/* Botões de Ação */}
        <div className="buttons is-centered mb-6 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
          <button
            type="button"
            className={getButtonClass(
              SortType.Newest,
              'button is-info is-medium transition duration-300 hover:shadow-lg rounded-lg',
            )}
            onClick={() => handleSort(SortType.Newest)}
            disabled={isResetDisabled}
          >
            Newest
          </button>

          <button
            type="button"
            className={getButtonClass(
              SortType.Alphabetical,
              'button is-success is-medium transition duration-300 hover:shadow-lg rounded-lg',
            )}
            onClick={() => handleSort(SortType.Alphabetical)}
          >
            Alphabetically
          </button>

          <button
            type="button"
            className={getButtonClass(
              SortType.Cheapest,
              'button is-warning is-medium transition duration-300 hover:shadow-lg rounded-lg',
            )}
            onClick={() => handleSort(SortType.Cheapest)}
          >
            Cheapest
          </button>

          {/* O botão Reset apenas muda o estado para Newest, que é o estado inicial */}
          <button
            type="button"
            className="button is-danger is-medium shadow-md transition duration-300 
            hover:shadow-lg rounded-lg disabled:opacity-50"
            onClick={() => handleSort(SortType.Newest)}
            disabled={isResetDisabled}
          >
            Reset
          </button>
        </div>

        {/* Exibição da Lista */}
        <div className="box p-5 bg-white shadow-xl rounded-xl">
          <p className="subtitle is-6 has-text-weight-semibold mb-4 border-b pb-2 text-gray-700">
            Current List (
            <span className="has-text-info">{sortedGoods.length}</span> items):
          </p>

          <ul className="divide-y divide-gray-200">
            {sortedGoods.map(good => (
              <li
                key={good.id}
                data-cy="Good"
                className="py-3 px-4 text-lg text-gray-800 
                hover:bg-indigo-50 hover:text-indigo-800 transition duration-150 rounded-md cursor-pointer flex justify-between items-center"
              >
                <span>{good.name}</span>
                <span className="tag is-primary is-medium is-light has-text-weight-bold">
                  {formatPrice(good.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
