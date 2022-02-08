import React from 'react';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

interface DeleteExpenseModalProps {
  selectedRowInfo: any;
  isDeleteExpenseOpen: boolean;
  onDeleteExpenseClose: () => void;
  handleDeleteExpense: (expenseId: number) => void;
}

export default function DeleteExpenseModal(props: DeleteExpenseModalProps) {
  const {
    isDeleteExpenseOpen,
    onDeleteExpenseClose,
    handleDeleteExpense,
    selectedRowInfo,
  } = props;

  const modalSize = useBreakpointValue({
    base: 'full',
    sm: 'full',
    md: 'lg',
    lg: 'lg',
    xl: 'lg',
    ['2xl']: 'lg',
  });

  return (
    <Modal
      isOpen={isDeleteExpenseOpen}
      onClose={() => onDeleteExpenseClose()}
      size={modalSize}
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderTopRadius={5}>
          <Heading size="lg" color="gray.500">
            Delete Expense
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the expense
            <Text as="span" fontWeight="bold">
              {` "${selectedRowInfo.description}"`}
            </Text>
            ?
          </Text>
        </ModalBody>

        <ModalFooter borderTop="1px solid gainsboro" mt={4}>
          <Button
            variant="outline"
            mr={3}
            onClick={() => onDeleteExpenseClose()}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteExpense(selectedRowInfo.expense_id)}
          >
            Delete Expense
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
