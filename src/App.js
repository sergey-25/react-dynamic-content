import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ItemList from "./ItemList.js";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import TemporaryDrawer from "./TemporaryDrawer.js";
import Home from "./Home.js";
import { Divider } from "@mui/material";
import SignUpForm from "./SignUpForm.js";
import SignInForm from "./SignInForm.js";

import { useAuth } from "./reducer/AuthReducer.js";
import ChangesHistory from "./pages/ChangesHistory.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { state, dispatch } = useAuth();

  const [formData, setFormData] = useState({
    mis_name: "",
    operators_name_mis: "",
    connection_year: "",
    medical_care_levels: [],
    operator_site_link: "",
    mis_site_link: "",
    technology: "",
    what_type_of_property_do_they_cooperate_with: [],
    support_service_contacts: [],
    contact_for_connection_issues_for_new_institutions: [],
    links_to_mis_educational_resources: "",
    list_of_functionality_required_by_the_technical_requirements: [],
    additional_functionality_implemented: [],
    picture: null,
  });
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleClearInput = (inputName, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputName === "picture") {
      setFormData((prevData) => ({ ...prevData, [inputName]: "" }));
      setImagePreview(null);
      setShowPreviewButton(false);
      setDownloadSuccess(false);
      setErrorMessage("");
    } else {
      setFormData((prevData) => ({ ...prevData, [inputName]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      ...formData,
      additional_functionality_implemented:
        formData.additional_functionality_implemented || [],
      list_of_functionality_required_by_the_technical_requirements:
        formData.list_of_functionality_required_by_the_technical_requirements ||
        [],
    };
    const storedToken = localStorage.getItem("authToken");
    try {
      if (editingItem) {
        await axios.put(
          `http://localhost:3300/api/mis/${editingItem._id}`,
          formDataToSend,
          {
            headers: {
              "x-auth-token": storedToken,
            },
          }
        );
        const response = await axios.get("http://localhost:3300/api/mis");
        setSavedItems(response.data);

        setIsEditing(false);
        setEditingItem(null);
        setSnackbarMessage("МІС, успішно відредаговано і збережено!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        await axios.post("http://localhost:3300/api/mis", formDataToSend, {
          headers: {
            "x-auth-token": storedToken,
          },
        });

        const response = await axios.get("http://localhost:3300/api/mis");
        setSavedItems(response.data);

        setSnackbarMessage("МІС, успішно додано!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Помилка при додаванні, МІС не збережено!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }

    setIsModalOpen(false);
    setImagePreview(null);
    setShowPreviewButton(false);
    setDownloadSuccess(false);
    setErrorMessage("");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpenDrawer(open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3300/api/mis");
        setSavedItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setSavedItems]);

  const location = useLocation();


  const isAuthPage =
    location.pathname.includes("/signup") ||
    location.pathname.includes("/signin");

    const pageTitles = {
      "/": "Медичні Інформаційні Системи",
      "/list": "Медичні Інформаційні Системи",
      "/history": "Історія змін",
    } 

  return (
    <div className="app">
      {!isAuthPage && (
        <>
          <Header
            toggleDrawer={toggleDrawer}
            handleButtonClick={handleButtonClick}
            showButton={window.location.pathname.includes("/list")}
            title={pageTitles[location.pathname]}
          />
          <TemporaryDrawer
            isOpenDrawer={isOpenDrawer}
            toggleDrawer={toggleDrawer}
            setIsAuthenticated={setIsAuthenticated}
          />
        </>
      )}
      <main>
        <Routes>
          <Route
            path="/"
            exact
            element={
              state.isAuthenticated ? (
                <Home savedItems={savedItems} />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/list"
            element={
              state.isAuthenticated ? (
                <ItemList
                  isModalOpen={isModalOpen}
                  handleCloseModal={handleCloseModal}
                  handleSubmit={handleSubmit}
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
                  savedItems={savedItems}
                  setSavedItems={setSavedItems}
                  setIsModalOpen={setIsModalOpen}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  editingItem={editingItem}
                  setEditingItem={setEditingItem}
                  snackbarOpen={snackbarOpen}
                  snackbarMessage={snackbarMessage}
                  snackbarSeverity={snackbarSeverity}
                  handleSnackbarClose={handleSnackbarClose}
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarSeverity={setSnackbarSeverity}
                  setSnackbarOpen={setSnackbarOpen}
                />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
          path="/history"
          element={
            state.isAuthenticated ? (
              <ChangesHistory 
              savedItems={savedItems}
              />
            ):(
              <Navigate to="/signin" replace />
            )
          }
          />

          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/signin"
            element={<SignInForm setIsAuthenticated={setIsAuthenticated} />}
          />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      {!isAuthPage && <Divider sx={{ margin: "80px 0 0 0" }} />}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
