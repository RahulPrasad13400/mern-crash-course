import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalContextProvider, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {EditIcon, DeleteIcon} from "@chakra-ui/icons"
import { useProductStore } from '../store/Product'

export default function ProductCard({product}) {
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const toast = useToast()
    const {deleteProduct} = useProductStore()
    const {isOpen, onOpen, onClose} = useDisclosure()

    async function handleDeleteProduct(pid){
        const {success, message} = await deleteProduct(pid)
        if(!success){
            toast({
                title : "Error",
                description : message, 
                status : 'error',
                duration : 3000,
                isClosable : true
            })
        }else{
            toast({
                title : "Success",
                description : message, 
                status : 'success',
                duration : 1000,
                isClosable : true
            })
        }
    }

    async function handleUpdate(pid){

    }

    return (
    <Box bg={bg} shadow={"lg"} rounded={"lg"} overflow="hidden" transition="all 0.3s" _hover={{transform : "translateY(-5px)", shadow : "xl" }}>
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit="cover" />
        <Box px={3} py={3}>
            <Heading as="h3" size="md" mb="2">{product.name}</Heading>
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='red' />
                <IconButton icon={<DeleteIcon />} onClick={()=>handleDeleteProduct(product._id)} colorScheme='blue' />
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input defaultValue={updatedProduct.name} placeholder='Product Name' name='name' />
                        <Input placeholder='Price' name='price' />
                        <Input placeholder='Image Url' name='image' />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={()=>handleUpdate(product._id)}>Update</Button>
                    <Button variant={'ghost'}  onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}
