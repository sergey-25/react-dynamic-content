import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import {IconButton, Box, TextField} from "@mui/material";
import DialogModal from "./DialogModal";
import SimpleContainer from "./SimpleContainer";

function ItemList({
  isModalOpen,
  handleCloseModal,
  handleSubmit,
  setFormData,
  formData,
  imagePreview,
  setImagePreview,
  showPreviewButton,
  setShowPreviewButton,
  downloadSuccess,
  setDownloadSuccess,
  errorMessage,
  setErrorMessage,
  handleClearInput,
  savedItems,
  setSavedItems,
  setIsModalOpen,
  isEditing,
  setIsEditing,
  editingItem,
  setEditingItem,
  snackbarOpen,
  snackbarMessage,
  snackbarSeverity,
  handleSnackbarClose,
  setSnackbarMessage,
  setSnackbarSeverity,
  setSnackbarOpen,
}) {



  const [changeView, setChangeView] = useState("item-list grid");
  const [displayedItems, setDisplayedItems] = useState(savedItems);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setDisplayedItems(savedItems);
  }, [savedItems]);


  const handleItemUpdate = (itemId) => {
    const itemToEdit = savedItems.find((item) => item._id === itemId);

    setEditingItem(itemToEdit);
    setIsModalOpen(true);
  };

  const handleItemDelete = async (itemId) => {
    try {
      // Make a DELETE request to your backend API
      const response = await axios.delete(
        `http://localhost:3300/api/mis/${itemId}`
      );

      // Handle success, update the state to reflect the deletion
      const updatedItems = savedItems.filter((item) => item._id !== itemId);
      setSavedItems(updatedItems);
    } catch (error) {
      // Handle error
      console.error("Error deleting item:", error);
    }
  };

  const toggleClass = (newClass) => {
    setChangeView(newClass);
  };


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredItems = savedItems.filter((item) =>
      item.mis_name.toLowerCase().includes(query)
    );

    setDisplayedItems(filteredItems);
    console.log(displayedItems);
  };

  return (
    <SimpleContainer>
        <Box sx={{ padding: "40px 20px" }}>
        <TextField
          id="outlined-basic"
          label="Пошук за назвою МІС"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>
      <div className="item-list-top">
        <h2 className="item-list-title">
          {!searchQuery.length ?  `Всього заппсів - ${savedItems.length}`: `Знайдено заппсів - ${displayedItems.length}`}
          {/* Всього заппсів - {savedItems.length} */}
        </h2>
        {displayedItems.length > 0 && (
          <div className="view-controls">
          <IconButton
            size="large"
            onClick={() => toggleClass("item-list block")}
          >
            <ViewListIcon />
          </IconButton>

          <IconButton
            size="large"
            onClick={() => toggleClass("item-list grid")}
          >
            <ViewModuleIcon />
          </IconButton>
        </div>
        )}
      </div>

      <Item
        savedItems={displayedItems}
        onItemUpdate={handleItemUpdate}
        onItemDelete={handleItemDelete}
        changeView={changeView}
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
        handleSnackbarClose={handleSnackbarClose}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarSeverity={setSnackbarSeverity}
        setSnackbarOpen={setSnackbarOpen}
      />

      <DialogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        setFormData={setFormData}
        formData={formData}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        showPreviewButton={showPreviewButton}
        setShowPreviewButton={setShowPreviewButton}
        downloadSuccess={downloadSuccess}
        setDownloadSuccess={setDownloadSuccess}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        handleClearInput={handleClearInput}
        editingItem={editingItem}
      />
    </SimpleContainer>
  );
}

export default ItemList;
