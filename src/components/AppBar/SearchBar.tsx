// SearchBar.tsx
import React, { useState, useCallback } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, SearchInput } from './styles';
import { debounce } from 'lodash';

interface SearchBarProps {
  onSearchChange: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [value, setValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      onSearchChange(searchValue);
    }, 600),
    []
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      setValue(searchValue);
      debouncedSearch(searchValue);
    },
    [debouncedSearch]
  );

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput
        placeholder="Search..."
        value={value}
        onChange={handleSearchChange}
      />
    </Search>
  );
};

export default SearchBar;
