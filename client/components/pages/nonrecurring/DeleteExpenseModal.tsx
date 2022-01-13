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

  return (
    <Modal
      isOpen={isDeleteExpenseOpen}
      onClose={() => onDeleteExpenseClose()}
      size="lg"
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
            onClick={() => handleDeleteExpense(selectedRowInfo.expenseId)}
          >
            Delete Expense
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
