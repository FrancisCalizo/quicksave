import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Input, List, ListItem, Flex, IconButton } from '@chakra-ui/react';

const ComboboxInput = React.forwardRef(({ ...props }, ref: any) => {
  return <Input {...props} borderRightRadius={0} ref={ref} />;
});

const ComboboxList = React.forwardRef(({ isOpen, ...props }: any, ref) => {
  return (
    <List
      display={isOpen ? null : 'none'}
      position="absolute"
      borderRadius={5}
      border="1px solid gainsboro"
      zIndex={99}
      mt={1}
      bg="white"
      w="100%"
      {...props}
      ref={ref}
    />
  );
});

const ComboboxItem = React.forwardRef(({ itemIndex, highlightedIndex, ...props }: any, ref) => {
  const isActive = itemIndex === highlightedIndex;

  return (
    <ListItem
      transition="background-color 220ms, color 220ms"
      bg={isActive ? 'teal.100' : null}
      borderRadius={5}
      px={4}
      py={2}
      cursor="pointer"
      {...props}
      ref={ref}
    />
  );
});

interface ComboboxProps {
  items: string[];
}

export default function Combobox({ items }: ComboboxProps) {
  const [inputItems, setInputItems] = useState(items);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }: any) => {
      setInputItems(
        items.filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase()))
      );
    },
  });

  return (
    <div {...getComboboxProps()} style={{ position: 'relative' }}>
      <Flex alignItems="center">
        <ComboboxInput {...getInputProps()} />
        <IconButton
          {...getToggleButtonProps()}
          aria-label={'toggle menu'}
          borderLeftRadius={0}
          colorScheme={isOpen ? 'gray' : 'blue'}
          icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
        />
      </Flex>

      <ComboboxList isOpen={isOpen} {...getMenuProps()} flex={1}>
        {inputItems.map((item, index) => (
          <ComboboxItem
            {...getItemProps({ item, index })}
            itemIndex={index}
            highlightedIndex={highlightedIndex}
            key={index}
          >
            {item}
          </ComboboxItem>
        ))}
      </ComboboxList>
    </div>
  );
}
