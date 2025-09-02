import { useState } from 'react';

export const useSorting = (initialConfig = { key: 'name', direction: 'asc' }) => {
  const [sortConfig, setSortConfig] = useState(initialConfig);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return { sortConfig, requestSort };
};