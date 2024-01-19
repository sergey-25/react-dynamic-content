import React, { useState, useEffect } from "react";
import MultipleAutocomplete from "./MultipleAutocomplete";
import CustomSelect from "./CustomSelect";
import MultipleSelect from "./MultipleSelect";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CallIcon from "@mui/icons-material/Call";
import SendIcon from '@mui/icons-material/Send';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContactTextField from "./ContactTextField";
import { Tooltip } from "@mui/material";

function Modal({
  isOpen,
  onClose,
  children,
  onSubmit,
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
  editingItem
}) {
  const [showDownloadedPicture, setShowDownloadedPicture] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

  useEffect(() => {
    // Set formData to the editingItem when editing
    if (editingItem) {
      setFormData({ ...editingItem });
    } else {
      // Clear formData when adding a new item
      setFormData({
        mis_name: "",
        operators_name_mis: "",
        connection_year: "",
        operator_site_link: "",
        mis_site_link: "",
        medical_care_levels: [],
        technology: "",
        what_type_of_property_do_they_cooperate_with: [],
        support_service_contacts: [],
        contact_for_connection_issues_for_new_institutions: [],
        links_to_mis_educational_resources: "",
        list_of_functionality_required_by_the_technical_requirements: "",
        additional_functionality_implemented: "",
        picture: null,
      });
    }
  }, [editingItem, setFormData]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSelectChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      technology: value,
    });
  };
  const handleTagsChange = (selectedTags) => {
    setFormData({
      ...formData,
      what_type_of_property_do_they_cooperate_with: selectedTags,
    });
  };
  const handleTags2Change = (selectedTags) => {
    setFormData({
      ...formData,
      medical_care_levels: selectedTags,
    });
  };

  const handleAutoInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
   
    // Check file type before setting it in the state
    if (file && /\.(png|jpg|jpeg)$/i.test(file.name)) {
      // setFormData((prevData) => ({ ...prevData, picture: file }));

      // Display image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, picture: reader.result }));
        setImagePreview(reader.result);
        setShowPreviewButton(true);
        setDownloadSuccess(true);
        setShowDownloadSuccess(true);
        setShowDownloadedPicture(false);
        setErrorMessage("");
      };
      reader.readAsDataURL(file);
     
    } else {
      // Reset the file input and show an error message if the file is not of the allowed types
      setFormData((prevData) => ({ ...prevData, picture: null }));
      setImagePreview(null);
      setShowPreviewButton(false);
      setDownloadSuccess(false);
      setErrorMessage(`Будь-ласка виберіть логотип`);
      e.target.value = ""; // Clear the input value
    }
  };

  const handlePreview = (e) => {
    // Add your preview logic here
    e.preventDefault();
    setShowDownloadedPicture((prev) => !prev);
  };

  const handleContactChange = (formField, index, value) => {
    const updatedContacts = [...formData[formField]];
    updatedContacts[index] = { ...updatedContacts[index], value };
    setFormData({
      ...formData,
      [formField]: updatedContacts,
    });
  };

  const handleAddContact = (formField, type) => {
    setFormData((prevData) => ({
      ...prevData,
      [formField]: [...prevData[formField], { type, value: "" }],
    }));
  };

  const handleRemoveContact = (formField, index) => {
    setFormData((prevData) => {
      const updatedContacts = [...prevData[formField]];
      updatedContacts.splice(index, 1);
      return {
        ...prevData,
        [formField]: updatedContacts,
      };
    });
  };

  const handleAddPhone = (formField) => {
    handleAddContact(formField, "phone");
  };

  const handleAddEmail = (formField) => {
    handleAddContact(formField, "email");
  };

  if (!isOpen) return null;
  return (
    // <div className="modal-overlay" onClick={onClose}>
    //   <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    //     {children}
        <>
        <form onSubmit={onSubmit}>
          <div className="form-inner">
            <label>
              <p>Назва МІС:</p>
              <div className="textfield-box">
                <input
                  className="textfield"
                  type="text"
                  name="mis_name"
                  value={formData.mis_name}
                  onChange={handleInputChange}
                  // onChange={(e) => setFormData({ ...formData, mis_name: e.target.value })}
                  required  
                />

                {formData.mis_name && (
                  <div className="clear-input">
                    <box-icon
                      name="x"
                      onClick={(e) => handleClearInput("mis_name", e)}
                    ></box-icon>
                  </div>
                )}
              </div>
            </label>
            <label>
              <p>Назва Оператора МІС:</p>
              <div className="textfield-box">
                <input
                  className="textfield"
                  type="text"
                  name="operators_name_mis"
                  value={formData.operators_name_mis}
                  onChange={handleInputChange}
                />

                {formData.operators_name_mis && (
                  <div className="clear-input">
                    <box-icon
                      name="x"
                      onClick={(e) => handleClearInput("operators_name_mis", e)}
                    ></box-icon>
                  </div>
                )}
              </div>
            </label>

            <label>
              <p>Рік підключення до ЦБД ЕСОЗ</p>
              <div className="textfield-box">
                <input
                  className="textfield"
                  type="text"
                  name="connection_year"
                  value={formData.connection_year}
                  onChange={handleInputChange}
                />
                {formData.connection_year && (
                  <div className="clear-input">
                    <box-icon
                      name="x"
                      onClick={(e) => handleClearInput("connection_year", e)}
                    ></box-icon>
                  </div>
                )}
              </div>
            </label>

            <label>
              <p>Посилання на веб-сайт Оператора МІС</p>
              <div className="textfield-box">
                <input
                  className="textfield"
                  type="text"
                  name="operator_site_link"
                  value={formData.operator_site_link}
                  onChange={handleInputChange}
                />
                {formData.operator_site_link && (
                  <div className="clear-input">
                    <box-icon
                      name="x"
                      onClick={(e) => handleClearInput("operator_site_link", e)}
                    ></box-icon>
                  </div>
                )}
              </div>
            </label>

            <label>
              <p>Посилання на веб-сайт МІС</p>
              <div className="textfield-box">
                <input
                  className="textfield"
                  type="text"
                  name="mis_site_link"
                  value={formData.mis_site_link}
                  onChange={handleInputChange}
                />
                {formData.mis_site_link && (
                  <div className="clear-input">
                    <box-icon
                      name="x"
                      onClick={(e) => handleClearInput("mis_site_link", e)}
                    ></box-icon>
                  </div>
                )}
              </div>
            </label>

            <div>
              <p className="helper-text">Рівні надання МД</p>
              <MultipleSelect
                label="З закладами якого типу власності співпрацюють"
                options={options}
                value={formData.medical_care_levels}
                onChange={handleTags2Change}
              />
            </div>
            <div>
              <p className="helper-text">
                Технологія для зберігання та обробки даних
              </p>
              <CustomSelect
                id="technologySelect"
                label="Технологія для зберігання та обробки даних"
                options={selectOptions}
                value={formData.technology}
                onChange={handleSelectChange}
              />
            </div>

            <div>
              <p className="helper-text">
                З закладами якого типу власності співпрацюють
              </p>
              <MultipleSelect
                label="З закладами якого типу власності співпрацюють"
                options={selectOptions2}
                value={formData.what_type_of_property_do_they_cooperate_with}
                onChange={handleTagsChange}
              />
            </div>

            <div>
              <p className="helper-text">
                Впроваджений перелік ф-лу, який вимагається ТВ до МІС
              </p>

              <MultipleAutocomplete
                id="autocomplete1"
                options={listOfFunctionalityRequired}
                getOptionLabel={(option) => option.title}
                label="Autocomplete 1"
                formData={formData}
                field="list_of_functionality_required_by_the_technical_requirements"
                onChange={handleAutoInputChange}
                multiple
              />
            </div>

            <label>
              <div className="helper-text-box">
                <p>Контакти служби підтримки</p>

                <div className="contacts-controls">
                  <div className="add-contact">
                   <Tooltip title="Додати телефон">
                   <AddIcCallIcon
                      onClick={() => handleAddPhone("support_service_contacts")}
                    />
                   </Tooltip>
                  </div>
                  <div
                    className="add-mail"
                    onClick={() => handleAddEmail("support_service_contacts")}
                  >
                    <Tooltip title="Додати пошту">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 512 371.13"
                      width="29"
                      height="29"
                    >
                      <path d="M397 141.12c63.51 0 115 51.5 115 115 0 63.51-51.49 115.01-115 115.01s-115.02-51.5-115.02-115.01c0-63.5 51.51-115 115.02-115zM28.8 0h389.26c15.73 0 28.52 12.87 28.5 28.53l-.1 95.75c-7.58-2.84-15.46-5.04-23.59-6.55l.07-77.07-125.82 98.89 9.18 9c-2.53 2.13-4.98 4.34-7.34 6.64l-1.51 1.39c-3.29 3.29-6.42 6.72-9.36 10.33l-10.85-10.64-42.14 35.88c-4.49 3.76-11.46 4.21-16.5.11l-44.24-36.09L39.45 282.69h219.27c1.56 8.14 3.82 16 6.72 23.58l-236.95.02C12.74 306.29 0 293.42 0 277.76L.24 28.52C.27 12.84 13.05 0 28.8 0zm-5.19 261.89L154.06 139.8 23.82 41.69l-.21 220.2zM42.65 23.6l183.96 141.87L400.69 23.6H42.65zm406.4 246.31H410.8v38.27h-27.57v-38.27h-38.28v-27.54h38.28v-38.29h27.57v38.29h38.25v27.54z" />
                    </svg>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="textfield-box contacts">
                {Array.isArray(formData.support_service_contacts) &&
                  formData.support_service_contacts.map((contact, index) => (
                    <div key={index} className="textfield-wrapper">
                      {contact.type === "phone" ? (
                        <CallIcon />
                      ) : (
                        <MailOutlineIcon />
                      )}
                      <ContactTextField
                        type={contact.type}
                        value={contact.value}
                        onChange={(value) =>
                          handleContactChange(
                            "support_service_contacts",
                            index,
                            value
                          )
                        }
                      />
                     
                      {index > 0 && (
                        <div className="icon-remove-contact">
                          <Tooltip title="Видалити контакт">
                          <box-icon
                            name="minus-circle"
                            color="#d50909"
                            onClick={() =>
                              handleRemoveContact(
                                "support_service_contacts",
                                index
                              )
                            }
                          ></box-icon>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </label>

            <label>
              <div className="helper-text-box">
                <p>Контакт з питань підключення для нових закладів</p>

                <div className="contacts-controls">
                  <div className="add-contact">
                   <Tooltip title="Додати телефон">
                   <AddIcCallIcon
                      onClick={() =>
                        handleAddPhone(
                          "contact_for_connection_issues_for_new_institutions"
                        )
                      }
                    />
                   </Tooltip>
                  </div>
                  <div
                    className="add-mail"
                    onClick={() =>
                      handleAddEmail(
                        "contact_for_connection_issues_for_new_institutions"
                      )
                    }
                  >
                    <Tooltip title="Додати пошту">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 512 371.13"
                      width="29"
                      height="29"
                    >
                      <path d="M397 141.12c63.51 0 115 51.5 115 115 0 63.51-51.49 115.01-115 115.01s-115.02-51.5-115.02-115.01c0-63.5 51.51-115 115.02-115zM28.8 0h389.26c15.73 0 28.52 12.87 28.5 28.53l-.1 95.75c-7.58-2.84-15.46-5.04-23.59-6.55l.07-77.07-125.82 98.89 9.18 9c-2.53 2.13-4.98 4.34-7.34 6.64l-1.51 1.39c-3.29 3.29-6.42 6.72-9.36 10.33l-10.85-10.64-42.14 35.88c-4.49 3.76-11.46 4.21-16.5.11l-44.24-36.09L39.45 282.69h219.27c1.56 8.14 3.82 16 6.72 23.58l-236.95.02C12.74 306.29 0 293.42 0 277.76L.24 28.52C.27 12.84 13.05 0 28.8 0zm-5.19 261.89L154.06 139.8 23.82 41.69l-.21 220.2zM42.65 23.6l183.96 141.87L400.69 23.6H42.65zm406.4 246.31H410.8v38.27h-27.57v-38.27h-38.28v-27.54h38.28v-38.29h27.57v38.29h38.25v27.54z" />
                    </svg>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="textfield-box contacts">
                {Array.isArray(
                  formData.contact_for_connection_issues_for_new_institutions
                ) &&
                  formData.contact_for_connection_issues_for_new_institutions.map(
                    (contact, index) => (
                      <div key={index} className="textfield-wrapper">
                        {contact.type === "phone" ? (
                          <CallIcon />
                        ) : (
                          <MailOutlineIcon />
                        )}

                        <ContactTextField
                          type={contact.type}
                          value={contact.value}
                          onChange={(value) =>
                            handleContactChange(
                              "contact_for_connection_issues_for_new_institutions",
                              index,
                              value
                            )
                          }
                        />
                        {index > 0 && (
                          <div className="icon-remove-contact">
                            <Tooltip title="Видалити контакт">
                            <box-icon
                              name="minus-circle"
                              color="#d50909"
                              onClick={() =>
                                handleRemoveContact(
                                  "contact_for_connection_issues_for_new_institutions",
                                  index
                                )
                              }
                            ></box-icon>
                            </Tooltip>
                          </div>
                        )}
                      </div>
                    )
                  )}
              </div>
            </label>

            <label>
              <p> Посилання на навчальні ресурси МІС</p>
              <div className="textfield-box">
                <input
                  className="textfield"
                  type="text"
                  name="links_to_mis_educational_resources"
                  value={formData.links_to_mis_educational_resources}
                  onChange={handleInputChange}
                />
                {formData.links_to_mis_educational_resources && (
                  <div className="clear-input">
                    <box-icon
                      name="x"
                      onClick={(e) =>
                        handleClearInput(
                          "links_to_mis_educational_resources",
                          e
                        )
                      }
                    ></box-icon>
                  </div>
                )}
              </div>
            </label>
            <div>
              <p className="helper-text">
                Перелік додаткового ф-лу, який реалізовано у МІС
              </p>
              <MultipleAutocomplete
                id="autocomplete2"
                options={additionalFunctionality}
                getOptionLabel={(option) => option.title}
                label="Autocomplete 2"
                formData={formData}
                field="additional_functionality_implemented"
                onChange={handleAutoInputChange}
                multiple
              />
            </div>

            <div>
              <div className="file-textfield-box">
                <label>
                  <p>Логотип:</p>
                  <div className="file-textfield">
                    <input
                      hidden
                      type="file"
                      name="picture"
                      onChange={handleFileChange}
                      accept=".png,.jpg, .jpeg"
                    />
                    <box-icon
                      name="cloud-upload"
                      color="#4e82c4"
                      size="100px"
                    ></box-icon>
                    <p>Додайте файл у форматі: .png, .jpg, .jpeg</p>
                  </div>
                </label>
              </div>
              <div className="uploaded-area">
                {downloadSuccess && showPreviewButton && (
                  <>
                    <div className="preview-icon-box">
                      <div className="preview-icon">
                        <box-icon
                          onClick={handlePreview}
                          name="image"
                          color="#4e82c4"
                          size="lg"
                        ></box-icon>
                      </div>

                      <span
                        className="download-success"
                        style={{
                          display: showDownloadSuccess ? "block" : "none",
                        }}
                      >
                        Логотип завантажено, успішно.
                      </span>
                    </div>
                  </>
                )}
                <div className="textfield-file-controls">
                  {downloadSuccess && (
                    <>
                      <box-icon
                        name="check-circle"
                        type="solid"
                        color="#1dc72b"
                      ></box-icon>
                    </>
                  )}
                  {formData.picture && downloadSuccess && (
                    <>
                      <div className="clear-input">
                        <box-icon
                          name="trash-alt"
                          color="#e61024"
                          onClick={(e) => handleClearInput("picture", e)}
                        ></box-icon>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {formData.picture && downloadSuccess && (
                <>
                  <div
                    className="image-box"
                    style={{
                      display: showDownloadedPicture ? "block" : "none",
                    }}
                  >
                    <div className="preview-icon-close">
                      <box-icon name="x" onClick={handlePreview}></box-icon>
                    </div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                  </div>
                </>
              )}

              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}
            </div>
          </div>
          <div className="modal-controls">
            <button type="submit" className="submit-btn">
                Надіслати
                <SendIcon />
                </button>
            
            <button onClick={onClose} className="close-modal-btn">
              Закрити
            </button>
          </div>
        </form>
        </>
    //   </div>
    // </div>
  );
}

const options = [
  { value: "ПМД", label: "ПМД" },
  { value: "СМД", label: "СМД" },
  { value: "Аптечні заклади", label: "Аптечні заклади" },
  { value: "Лабораторії", label: "Лабораторії" },
  { value: "Екстрена медична допомога", label: "Екстрена медична допомога" },
];
const listOfFunctionalityRequired = [
  { title: "Адміністрування аптечного закладу" },
  { title: "Адміністрування надавача медичних послуг" },
  { title: "Вакцинація" },
  { title: "Вакцинація середнім медичним персоналом" },
  { title: "Ведення електронних медичних записів в стаціонарі" },
  { title: "Виписування електронного рецепту на лікарські засоби" },
  { title: "Виписування електронного рецепту на медичні вироби" },
  { title: "Декларації" },
  { title: "Діагностичний звіт" },
  { title: "Довідники" },
  { title: "Доступ до медичних даних" },
  { title: "Електронні медичні записи" },
  { title: "Електронні направлення" },
  { title: "Медичні висновки про народження" },
  { title: "Медичні висновки про тимчасову непрацездатність" },
  { title: "Неонатальний скринінг" },
  { title: "План лікування" },
  { title: "Погашення електронного рецепту на лікарські засоби" },
  { title: "Погашення електронного рецепту на медичні вироби" },
  { title: "Процедури" },
  { title: "Реабілітація" },
  { title: "Реорганізація юридичної особи" },
  { title: "Робота з ідентифікованим пацієнтом" },
  { title: "Робота з клінічними оцінками та категоріями пацієнтів" },
  { title: "Робота з неідентифікованим пацієнтом" },
  { title: "Робоче місце адміністратора медичних записів" },
  { title: "Робоче місце лаборанта" },
  { title: "Робоче місце середнього медичного персоналу" },
  { title: "Робоче місце трансплант-координатора" },
  { title: "Спостереження" },
  { title: "Статус верифікації пацієнта" },
];

const additionalFunctionality = [
  { title: "Запис на прийом" },
  { title: "Складський облік" },
  { title: "Кадровий облік" },
  { title: "Управлінський облік" },
  { title: "Телемедичні рішення" },
  { title: "Інтеграції з девайсами" },
  { title: "Інтеграції з стороннім програмним забезпеченням" },
];

const selectOptions2 = [
  { value: "Відомчі заклади", label: "Відомчі заклади" },
  { value: "Комунальна власність", label: "Комунальна власність" },
  { value: "Приватна власність", label: "Приватна власність" },
];

const selectOptions = [
  { value: "Гібрид", label: "Гібрид" },
  { value: "Хмара", label: "Хмара" },
  { value: "Десктоп", label: "Десктоп" },
];

export default Modal;
