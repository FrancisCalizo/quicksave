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

interface DeleteRecurringIncomeModalProps {
  selectedRowInfo: any;
  isDeleteRecurringIncomeOpen: boolean;
  onDeleteRecurringIncomeClose: () => void;
  handleDeleteRecurringIncome: (recurringIncomeId: number) => void;
}

export default function DeleteRecurringIncomeModal(
  props: DeleteRecurringIncomeModalProps
) {
  const {
    isDeleteRecurringIncomeOpen,
    onDeleteRecurringIncomeClose,
    handleDeleteRecurringIncome,
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
      isOpen={isDeleteRecurringIncomeOpen}
      onClose={() => onDeleteRecurringIncomeClose()}
      motionPreset="scale"
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderTopRadius={5}>
          <Heading size="lg" color="gray.500">
            Delete Recurring Income
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the recurring income
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
            onClick={() => onDeleteRecurringIncomeClose()}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteRecurringIncome(selectedRowInfo.id)}
          >
            Delete Recurring Income
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
