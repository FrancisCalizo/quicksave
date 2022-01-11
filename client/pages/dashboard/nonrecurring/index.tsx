import {
  Flex,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { MdLabel } from 'react-icons/md';

import DashboardLayout from 'components/layout/dashboard/DashboardLayout';

export default function Nonrecurring() {
  const { isOpen: isAddExpenseOpen, onOpen: onAddExpenseOpen, onClose: onAddExpenseClose } = useDisclosure();
  const { isOpen: isAddLabelOpen, onOpen: onAddLabelOpen, onClose: onAddLabelClose } = useDisclosure();

  return (
    <>
      {/* Middle Section */}
      <Flex
        w={['100%', '100%', '60%', '60%', '55%']}
        direction="column"
        overflow="auto"
        minHeight="100vh"
        px={4}
        py={6}
      >
        <Flex justify="flex-end" align="center">
          <Button leftIcon={<Icon as={FaPlus} />} mr={4} onClick={onAddLabelOpen}>
            Add Label
          </Button>
          <Button colorScheme="green" leftIcon={<Icon as={FaPlus} />} onClick={onAddExpenseOpen}>
            Add Expense
          </Button>
        </Flex>
      </Flex>

      {/* Right Section */}
      <Flex
        w={['100%', '100%', '30%']}
        bgColor="#F5F5F5"
        flexDir="column"
        overflow="auto"
        minW={[null, null, '300px', '300px', '400px']}
      >
        <h3>NonrecurringRight</h3>
      </Flex>

      {/* Add Expense Modal */}
      <Modal isOpen={isAddExpenseOpen} onClose={onAddExpenseClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, nisi.</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onAddExpenseClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Label Modal */}
      <Modal isOpen={isAddLabelOpen} onClose={onAddLabelClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Label</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, nisi.</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onAddLabelClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

Nonrecurring.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;
