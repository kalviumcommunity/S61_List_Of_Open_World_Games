import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const LoginOrLogOut = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("/check-login");
      setIsLoggedIn(response.data.isLoggedIn);
      setUsername(response.data.username || "");
    } catch (error) {
      console.error("Check login status error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://s61-list-of-open-world-games.onrender.com/login",
        { username, email, password }
      );

      const { token, username: loggedInUsername } = response.data;

      document.cookie = `token=${token}; path=/`;

      setIsLoggedIn(true);
      setUsername(loggedInUsername);
      setEmail("");
      setPassword("");

      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/entity");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred");
      }
    }
  };

  const handleLogout = async () => {
    try {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setIsLoggedIn(false);

      toast({
        title: "Logged Out",
        description: "You have successfully logged out.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      bg="url('https://i.pinimg.com/474x/3c/08/cd/3c08cdac961968f58431737db8ba570e.jpg')"
      bgSize="cover"
      bgPosition="center"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(10px)"
      ></Box>
      <Box
        as={motion.div}
        p={8}
        maxW="sm"
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
        backdropFilter="blur(20px)"
        zIndex={1}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoggedIn ? (
          <VStack spacing={4}>
            <Heading color="white">Welcome, {username}!</Heading>
            <Button
              mt={4}
              colorScheme="red"
              size="lg"
              onClick={handleLogout}
              _hover={{ bg: "red.500" }}
            >
              Logout
            </Button>
          </VStack>
        ) : (
          <VStack spacing={6}>
            <Heading mb={2} color="white">
              Login to Your Account
            </Heading>
            {error && <Text color="red.400">{error}</Text>}
            <form onSubmit={handleLogin}>
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel color="white">Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    focusBorderColor="teal.400"
                    bg="rgba(255, 255, 255, 0.8)"
                    _placeholder={{ color: "gray.500" }}
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel color="white">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    focusBorderColor="teal.400"
                    bg="rgba(255, 255, 255, 0.8)"
                    _placeholder={{ color: "gray.500" }}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel color="white">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    focusBorderColor="teal.400"
                    bg="rgba(255, 255, 255, 0.8)"
                    _placeholder={{ color: "gray.500" }}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  w="full"
                  fontWeight="bold"
                  letterSpacing="wide"
                  _hover={{ bg: "teal.500" }}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default LoginOrLogOut;
