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

interface DeleteCategoryModalProps {
  selectedRowInfo: any;
  isDeleteCategoryOpen: boolean;
  onDeleteCategoryClose: () => void;
  handleDeleteCategory: (categoryId: number) => void;
}

export default function DeleteCategoryModal(props: DeleteCategoryModalProps) {
  const {
    isDeleteCategoryOpen,
    onDeleteCategoryClose,
    handleDeleteCategory,
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
      isOpen={isDeleteCategoryOpen}
      onClose={() => onDeleteCategoryClose()}
      motionPreset="scale"
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderTopRadius={5}>
          <Heading size="lg" color="gray.500">
            Delete Category
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the Category
            <Text as="span" fontWeight="bold">
              {` "${selectedRowInfo.name}"`}
            </Text>
            ?
          </Text>
        </ModalBody>

        <ModalFooter borderTop="1px solid gainsboro" mt={4}>
          <Button
            variant="outline"
            mr={3}
            onClick={() => onDeleteCategoryClose()}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteCategory(selectedRowInfo.category_id)}
          >
            Delete Category
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
