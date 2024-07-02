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
  Modal, // Import Modal component
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea, // Import Textarea component for multi-line input
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import EntityForm from "../Form/EntityForm"; // Import EntityForm component

const Entity = () => {
  const [data, setData] = useState(null);
  const [filterCreatedBy, setFilterCreatedBy] = useState("");
  const [similarCreatedByValues, setSimilarCreatedByValues] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
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

  const handleDelete = (id) => {
    axios
      .delete(
        `https://s61-list-of-open-world-games.onrender.com/api/remove/${id}`
      )
      .then(() => {
        setData((prevData) => prevData.filter((item) => item._id !== id));
        toast({
          title: "Success",
          description: "Item deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error deleting entity:", error);
        toast({
          title: "Error",
          description: "Failed to delete item",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleEdit = (id) => {
    const selected = data.find((item) => item._id === id);
    setSelectedEntity(selected);
    setEditData(selected);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    console.log("Edited data:", editData);
    setIsEditing(false);
    setShowUpdateForm(false);
    toast({
      title: "Success",
      description: "Data updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredData = filterCreatedBy
    ? data.filter((item) => item.created_by === filterCreatedBy)
    : data;

  return (
    <VStack spacing={8} align="stretch" p={8}>
      <Button
        width={"15%"}
        colorScheme="blue"
        onClick={() => setShowAddForm(true)}
      >
        Add Entity
      </Button>

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
          position={"relative"}
          top={"5%"}
          right={"-75%"}
          id="filterCreatedBy"
          value={filterCreatedBy}
          onChange={(e) => setFilterCreatedBy(e.target.value)}
          placeholder="Select option"
        >
          <option value="">All</option>
          {similarCreatedByValues.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </FormControl>

      <Grid templateColumns="repeat(auto-fit, minmax(600px, 1fr))" gap={6}>
        {filteredData &&
          filteredData.map((game, i) => (
            <Card key={i} p={4}>
              <Text fontSize="xl">
                <strong>Game Title</strong>: {game.gameTitle}
              </Text>
              <Text fontSize="lg">
                <strong>Published By</strong>: {game.publishedBy}
              </Text>
              <Text fontSize="lg">
                <strong>Year Of Release</strong>: {game.yearOfRelease}
              </Text>
              <Text fontSize="lg">
                <strong>Available Platforms</strong>: {game.availablePlatforms}
              </Text>
              <Text fontSize="lg">
                <strong>Genre</strong>: {game.genre}
              </Text>
              <Text fontSize="lg">
                <strong>Description</strong>: {game.description}
              </Text>
              <Text fontSize="lg">
                <strong>Created By</strong>: {game.created_by}
              </Text>
              <Flex justify="space-between" mt={4}>
                <Button onClick={() => handleEdit(game._id)}>Edit</Button>
                <Button onClick={() => handleDelete(game._id)}>Delete</Button>
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
              <FormLabel htmlFor="gameTitle">Game Title:</FormLabel>
              <Input
                id="gameTitle"
                value={editData.gameTitle}
                onChange={(e) =>
                  setEditData({ ...editData, gameTitle: e.target.value })
                }
              />
              <FormLabel htmlFor="publishedBy">Published By:</FormLabel>
              <Input 
                id="publishedBy"
                value={editData.publishedBy}
                onChange={(e) =>
                  setEditData({...editData, publishedBy: e.target.value })
                }
              />
              <FormLabel htmlFor="yearOfRelease">Year Of Release:</FormLabel>
              <Input 
                id="yearOfRelease"
                value={editData.yearOfRelease}
                onChange={(e) =>
                  setEditData({...editData, yearOfRelease: e.target.value })
                }
              />
              <FormLabel htmlFor="availablePlatforms">Available Platforms:</FormLabel>
              <Input 
                id="availablePlatforms"
                value={editData.availablePlatforms}
                onChange={(e) =>
                  setEditData({
                   ...editData,
                    availablePlatforms: e.target.value,
                  })
                }
              />
              <FormLabel htmlFor="genre">Genre:</FormLabel>
              <Input 
                id="genre"
                value={editData.genre}
                onChange={(e) =>
                  setEditData({...editData, genre: e.target.value })
                }
              />
              <FormLabel htmlFor="description">Description:</FormLabel>
              <Textarea 
                id="description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({...editData, description: e.target.value })
                }
              />
              <FormLabel htmlFor="created_by">Created By:</FormLabel>
              <Input 
                id="created_by"
                value={editData.created_by}
                onChange={(e) =>
                  setEditData({...editData, created_by: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
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
