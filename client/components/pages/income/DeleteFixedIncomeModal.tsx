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

interface DeleteFixedIncomeModalProps {
  selectedRowInfo: any;
  isDeleteFixedIncomeOpen: boolean;
  onDeleteFixedIncomeClose: () => void;
  handleDeleteFixedIncome: (fixedIncomeId: number) => void;
}

export default function DeleteFixedIncomeModal(
  props: DeleteFixedIncomeModalProps
) {
  const {
    isDeleteFixedIncomeOpen,
    onDeleteFixedIncomeClose,
    handleDeleteFixedIncome,
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
      isOpen={isDeleteFixedIncomeOpen}
      onClose={() => onDeleteFixedIncomeClose()}
      motionPreset="scale"
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderTopRadius={5}>
          <Heading size="lg" color="gray.500">
            Delete Fixed Income
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the Fixed Income
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
            onClick={() => onDeleteFixedIncomeClose()}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteFixedIncome(selectedRowInfo.id)}
          >
            Delete Fixed Income
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
