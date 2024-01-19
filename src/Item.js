import React from "react";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip, Alert, AlertTitle } from "@mui/material";
import CustomSnackbar from "./CustomSnackbar";

function Item({
  item,
  savedItems,
  onItemUpdate,
  onItemDelete,
  changeView,
  snackbarOpen,
  snackbarMessage,
  snackbarSeverity,
  handleSnackbarClose,
  setSnackbarMessage,
  setSnackbarSeverity,
  setSnackbarOpen,
}) {
  const extractValueBetweenSlashes = (url) => {
    // Check if url is defined
    if (url) {
      const match = url.match(/\/([^\/]+)\//);
      return match ? match[1] : url;
    }

    return null;
  };
  const handleUpdateItem = (itemId) => {
    onItemUpdate(itemId);
  };

  const handleDeleteItem = (itemId) => {
    onItemDelete(itemId);

    setSnackbarMessage("МІС, успішно видалено!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  return (
    <div>
      {savedItems.length > 0 ? (
        <>
          <ul className={changeView}>
            {savedItems.map((item, index) => (
              <li
                key={index}
                className="item"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(item);
                  // console.log(URL.createObjectURL(item.picture.data));
                }}
              >
                <div className="item-inner">
                  {item.picture && (
                    <>
                      <div className="item-logo-box">
                        {item.picture.data || item.picture.contentType ? (
                          <>
                            <img
                              className="item-logo"
                              // src={URL.createObjectURL(item.picture.data)}
                              alt={`Picture for ${item.mis_name}`}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              className="item-logo"
                              src={item.picture}
                              alt={`Picture for ${item.mis_name}`}
                            />
                          </>
                        )}
                      </div>
                    </>
                  )}
                  <h2>{item.mis_name}</h2>
                  <div className="content-box">
                    <p className="item-label">Назва Оператора МІС</p>
                    <p>{item.operators_name_mis}</p>
                  </div>

                  <div className="content-box">
                    <p className="item-label">Рік підключення до ЦБД ЕСОЗ</p>
                    <p>{item.connection_year}</p>
                  </div>
                  <div className="content-box">
                    <p className="item-label">
                      Посилання на веб-сайт Оператора МІС
                    </p>

                    <a
                      href={item.operator_site_link}
                      target="_blank"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {extractValueBetweenSlashes(item.operator_site_link)}
                    </a>
                  </div>
                  <div className="content-box">
                    <p className="item-label">Посилання на веб-сайт МІС</p>
                    <a
                      href={item.mis_site_link}
                      target="_blank"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {extractValueBetweenSlashes(item.mis_site_link)}
                    </a>
                  </div>
                  <div className="content-box">
                    <p className="item-label" key={"45"}>
                      Рівні надання МД
                    </p>

                    {item.medical_care_levels &&
                    item.medical_care_levels.length > 0 ? (
                      <div className="item-chips-box">
                        {item.medical_care_levels.map((subItem, index) => (
                          <>
                            <p className="item-chips" key={index}>
                              {subItem}
                            </p>
                          </>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="content-box">
                    <p className="item-label">
                      Технологія для зберігання та обробки даних
                    </p>
                    <p>{item.technology}</p>
                  </div>

                  <div className="content-box">
                    <p className="item-label">
                      З закладами якого типу власності співпрацюють
                    </p>
                    <div className="item-chips-box">
                      {item.what_type_of_property_do_they_cooperate_with ? (
                        <>
                          {item.what_type_of_property_do_they_cooperate_with.map(
                            (subItem, index) => (
                              <p key={index} className="item-chips">
                                {subItem}
                              </p>
                            )
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="content-box">
                    <p className="item-label">
                      Посилання на навчальні ресурси МІС
                    </p>
                    <a
                      href={item.links_to_mis_educational_resources}
                      target="_blank"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {extractValueBetweenSlashes(
                        item.links_to_mis_educational_resources
                      )}
                    </a>
                  </div>

                  <div className="content-box">
                    <p className="item-label">
                      Контакт з питань підключення для нових закладів
                    </p>
                    {item.contact_for_connection_issues_for_new_institutions ? (
                      <>
                        {item.contact_for_connection_issues_for_new_institutions.map(
                          (contact, index) => (
                            <div key={index} className="item-contact-wrapper">
                              {contact.type === "phone" ? (
                                <CallIcon />
                              ) : (
                                <MailOutlineIcon />
                              )}

                              <p>{contact.value}</p>
                            </div>
                          )
                        )}
                      </>
                    ) : null}
                  </div>

                  <div className="content-box">
                    <p className="item-label">Контакти служби підтримки</p>
                    {item.support_service_contacts ? (
                      <>
                        {item.support_service_contacts.map((contact, index) => (
                          <div key={index} className="item-contact-wrapper">
                            {contact.type === "phone" ? (
                              <CallIcon />
                            ) : (
                              <MailOutlineIcon />
                            )}
                            <p>{contact.value}</p>
                          </div>
                        ))}
                      </>
                    ) : null}
                  </div>

                  <div className="content-box">
                    <p className="item-label">
                      Впроваджений перелік ф-лу, який вимагається ТВ до МІС
                    </p>
                    <div className="item-chips-box" key={index}>
                      {item.list_of_functionality_required_by_the_technical_requirements ? (
                        <>
                          {item.list_of_functionality_required_by_the_technical_requirements.map(
                            (subItem, index) => (
                              <p key={index} className="item-chips">
                                {subItem.title}
                              </p>
                            )
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="content-box">
                    <p className="item-label">
                      Перелік додаткового ф-лу, який реалізовано у МІС
                    </p>
                    <div className="item-chips-box">
                      {item.additional_functionality_implemented ? (
                        <>
                          {item.additional_functionality_implemented.map(
                            (subItem, index) => (
                              <p key={index} className="item-chips">
                                {subItem.title}
                              </p>
                            )
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="item-controls">
                  <Tooltip title="Редагувати">
                    <IconButton
                      color="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateItem(item._id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Видалити">
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item._id, item);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Alert variant="outlined" severity="warning">
        <AlertTitle> За вашим запитом нічого не знайдено.</AlertTitle>
        Спробуйте ввести інший запит
      </Alert>
      )}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}

export default Item;
