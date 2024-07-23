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
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const LoginOrLogOut = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        {
          username,
          email,
          password,
        }
      );

      const { token, username: loggedInUsername } = response.data;

      document.cookie = `token=${token}; path=/`;

      setIsLoggedIn(true);
      setUsername(loggedInUsername);
      setEmail("");
      setPassword("");

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
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.5)"
        backdropFilter="blur(10px)"
      ></Box>
      <Box
        p={8}
        maxW="md"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
        backdropFilter="blur(20px)"
        zIndex={1}
      >
        {isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading color="white">Welcome, {username}!</Heading>
            <Button mt={4} colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading mb={4} color="white">
              Login to Your Account
            </Heading>
            {error && <Text color="red.500">{error}</Text>}
            <form onSubmit={handleLogin}>
              <FormControl id="username" mb={4}>
                <FormLabel color="white">Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="email" mb={4}>
                <FormLabel color="white">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="password" mb={6}>
                <FormLabel color="white">Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Button
                colorScheme="teal"
                type="submit"
                w="full"
                py={4}
                fontSize="lg"
                fontWeight="bold"
                letterSpacing="wide"
              >
                Login
              </Button>
            </form>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default LoginOrLogOut;
