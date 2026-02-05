import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

/**
 * Lista de produtos inicial fornecida pelo servidor
 * Esta é a fonte de dados original que não será modificada
 */
export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

/**
 * Enum que define os tipos de ordenação disponíveis
 * - Default: ordem original da lista
 * - Alphabetically: ordem alfabética A-Z
 * - ByLength: ordem por tamanho da string (menor para maior)
 */
enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

/**
 * Componente principal da aplicação que exibe uma lista de produtos
 * com opções de ordenação, reversão e reset
 */
export const App: React.FC = () => {
  // Estado que controla o tipo de ordenação atual
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  // Estado que controla se a lista está invertida ou não
  const [isReversed, setIsReversed] = useState(false);

  /**
   * Função que retorna a lista de produtos ordenada de acordo com
   * o tipo de ordenação e o estado de reversão atuais
   * @returns {string[]} Array de produtos ordenados
   */
  const getSortedGoods = (): string[] => {
    // Cria uma cópia da lista original para não modificar o array original
    const sortedGoods = [...goodsFromServer];

    // Aplica a ordenação baseada no tipo selecionado
    switch (sortType) {
      case SortType.Alphabetically:
        // Ordena alfabeticamente usando localeCompare
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.ByLength:
        // Ordena por tamanho da string (menor para maior)
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      case SortType.Default:
      default:
        // Mantém a ordem original
        break;
    }

    // Se o estado isReversed estiver ativo, inverte a ordem da lista
    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  /**
   * Handler para ordenar a lista alfabeticamente
   */
  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabetically);
  };

  /**
   * Handler para ordenar a lista por tamanho das strings
   */
  const handleSortByLength = () => {
    setSortType(SortType.ByLength);
  };

  /**
   * Handler para inverter a ordem da lista
   * Alterna entre true e false a cada clique
   */
  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  /**
   * Handler para resetar a lista ao estado inicial
   * Restaura a ordenação padrão e remove a inversão
   */
  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  // Determina se o botão Reset deve ser exibido
  // Mostra apenas quando há alguma ordenação ou reversão aplicada
  const showReset = sortType !== SortType.Default || isReversed;

  // Obtém a lista de produtos com a ordenação aplicada
  const goods = getSortedGoods();

  return (
    <div className="section content">
      {/* Container dos botões de controle */}
      <div className="buttons">
        {/* Botão de ordenação alfabética - ativo quando sortType é Alphabetically */}
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetically ? 'is-light' : ''}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        {/* Botão de ordenação por tamanho - ativo quando sortType é ByLength */}
        <button
          type="button"
          className={`button is-success ${sortType !== SortType.ByLength ? 'is-light' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        {/* Botão de reversão - ativo quando isReversed é true */}
        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {/* Botão de reset - só aparece quando há alguma alteração na ordenação */}
        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      {/* Lista de produtos - cada item usa o nome do produto como key */}
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
