/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  Grid,
  Card,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import EntityForm from "../Form/EntityForm";

const Entity = () => {
  const [data, setData] = useState(null);
  const [filterCreatedBy, setFilterCreatedBy] = useState("");
  const [similarCreatedByValues, setSimilarCreatedByValues] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://s61-list-of-open-world-games.onrender.com/api/data"
      );
      setData(response.data.data.reverse());
      const similarData = response.data.data.reduce((curr, item) => {
        if (!curr.includes(item.created_by)) {
          curr.push(item.created_by);
        }
        return curr;
      }, []);
      setSimilarCreatedByValues(similarData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://s61-list-of-open-world-games.onrender.com/api/remove/${id}`
      );
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast({
        title: "Success",
        description: "Item deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting entity:", error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (id) => {
    const selected = data.find((item) => item._id === id);
    setSelectedEntity(selected);
    setEditData(selected);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.patch(
        `https://s61-list-of-open-world-games.onrender.com/api/update/${editData._id}`,
        editData
      );

      setData((prevData) =>
        prevData.map((item) =>
          item._id === editData._id ? { ...item, ...editData } : item
        )
      );

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Data updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating entity:", error);
      toast({
        title: "Error",
        description: "Failed to update data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredData = filterCreatedBy
    ? data.filter((item) => item.created_by === filterCreatedBy)
    : data;

  return (
    <VStack spacing={8} align="stretch" p={8} bg="gray.100" minH="100vh">
      <Flex justify="space-between" align="center" width="100%" mb={4}>
        <Heading size="lg" color="blue.700">
          Game Entity Manager
        </Heading>
        <Flex gap={4}>
          <Button
            colorScheme="blue"
            onClick={() => setShowAddForm(true)}
            fontSize="md"
          >
            Add Entity
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
              navigate("/login");
            }}
            fontSize="md"
          >
            Logout
          </Button>
        </Flex>
      </Flex>

      {showAddForm && (
        <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Entity</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EntityForm onAddEntity={fetchData} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <FormControl>
        <Select
          width={"25%"}
          id="filterCreatedBy"
          value={filterCreatedBy}
          onChange={(e) => setFilterCreatedBy(e.target.value)}
          placeholder="Filter by Creator"
          bg="white"
          borderColor="gray.400"
          focusBorderColor="blue.400"
        >
          <option value="">All</option>
          {similarCreatedByValues.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormControl>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        {filteredData &&
          filteredData.map((game, i) => (
            <Card
              key={i}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              p={4}
              _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
              transition="all 0.2s"
            >
              <Text fontSize="xl" fontWeight="bold" color="blue.600">
                {game.gameTitle}
              </Text>
              <Text fontSize="md" color="gray.600">
                <strong>Published By:</strong> {game.publishedBy}
              </Text>
              <Text fontSize="md" color="gray.600">
                <strong>Year Of Release:</strong> {game.yearOfRelease}
              </Text>
              <Text fontSize="md" color="gray.600">
                <strong>Platforms:</strong> {game.availablePlatforms}
              </Text>
              <Text fontSize="md" color="gray.600">
                <strong>Genre:</strong> {game.genre}
              </Text>
              <Text fontSize="md" color="gray.600" noOfLines={3}>
                <strong>Description:</strong>{" "}
                {expandedDescriptions[game._id]
                  ? game.description
                  : `${game.description.slice(0, 100)}...`}
                <Button
                  ml={2}
                  size="sm"
                  variant="link"
                  colorScheme="blue"
                  onClick={() => toggleDescription(game._id)}
                >
                  {expandedDescriptions[game._id] ? "Show Less" : "Show More"}
                </Button>
              </Text>
              <Text fontSize="md" color="gray.600">
                <strong>Created By:</strong> {game.created_by}
              </Text>
              <Flex justify="space-between" mt={4}>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleEdit(game._id)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(game._id)}
                >
                  Delete
                </Button>
              </Flex>
            </Card>
          ))}
      </Grid>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Entity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Game Title:</FormLabel>
              <Input
                value={editData.gameTitle}
                onChange={(e) =>
                  setEditData({ ...editData, gameTitle: e.target.value })
                }
              />
              <FormLabel>Published By:</FormLabel>
              <Input
                value={editData.publishedBy}
                onChange={(e) =>
                  setEditData({ ...editData, publishedBy: e.target.value })
                }
              />
              <FormLabel>Year Of Release:</FormLabel>
              <Input
                value={editData.yearOfRelease}
                onChange={(e) =>
                  setEditData({ ...editData, yearOfRelease: e.target.value })
                }
              />
              <FormLabel>Genre:</FormLabel>
              <Input
                value={editData.genre}
                onChange={(e) =>
                  setEditData({ ...editData, genre: e.target.value })
                }
              />
              <FormLabel>Platforms:</FormLabel>
              <Textarea
                value={editData.availablePlatforms}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    availablePlatforms: e.target.value,
                  })
                }
              />
              <FormLabel>Description:</FormLabel>
              <Textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSaveEdit}
              isDisabled={!editData.gameTitle}
            >
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Entity;
