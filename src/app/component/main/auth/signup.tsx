import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";

import React from "react";
import { useForm } from "react-hook-form";

export default function Register({ isOpen, onClose, onRegister }: any) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  interface FormInputs {
    username: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit = (data: any) => {
    onRegister(data);
    onClose();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register any account to see full data</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  {...register("username", {
                    required: "Username is required.",
                  })}
                />

                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <Text as="sub" color="red">
                      {message}
                    </Text>
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>

                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", {
                      required: "password is required",
                    })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <Text as="sub" color="red">
                        {message}
                      </Text>
                    )}
                  />
                </InputGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Register
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
