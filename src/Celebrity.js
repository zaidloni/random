import { useState } from "react";
import Delete from "./delete.svg";
import Edit from "./edit.svg";
import Cross from "./cross.svg";
import Tick from "./tick.svg";

const Celebrity = ({
  data,
  isOpen,
  onItemClick,
  onDelete,
  flag,
  changeFlag,
}) => {
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [change, setChange] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(data.first + " " + data.last);
  const [gender, setGender] = useState(data.gender);
  const [country, setCountry] = useState(data.country);
  const [description, setDescription] = useState(data.description);
  const [age, setAge] = useState(calculateAge(data.dob));

  const handleDiscardChanges = () => {
    setName(data.first + " " + data.last);
    setGender(data.gender);
    setAge(calculateAge(data.dob));
    setDescription(data.description);
    setCountry(data.country);
    setIsEditable(false);
  };

  function calculateAge(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    // Check if the birthday has already occurred this year
    const hasBirthdayOccurred =
      today.getMonth() > dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() &&
        today.getDate() >= dobDate.getDate());
    // Subtract 1 from the age if the birthday has not occurred this year
    if (!hasBirthdayOccurred) {
      age--;
    }
    return age;
  }

  return (
    <>
      <div className="card-container">
        <div className="card">
          <img className="card-img" src={data.picture} alt={data.first} />
          {isEditable ? (
            <input
              type="text"
              style={{
                marginRight: "200px",
                padding: "10px",
                borderRadius: "10px",
                width: "100px",
              }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setChange(true);
              }}
            />
          ) : (
            <h3 className="card-name">{name}</h3>
          )}
          {flag ? (
            <span className="toggle">{isOpen ? "-" : "+"}</span>
          ) : (
            <span onClick={onItemClick} className="toggle">
              {isOpen ? "-" : "+"}
            </span>
          )}
        </div>
        {isOpen && (
          <div>
            <div
              className="details"
              style={{ gap: isEditable ? "20px" : "50px" }}
            >
              <div>
                <p className="mb-2">Age</p>
                {isEditable ? (
                  <input
                    className="details-input"
                    type="number"
                    value={age}
                    onChange={(e) => {
                      setChange(true);
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (Number(value) >= 0 && Number(value) <= 120)
                      ) {
                        setAge(value);
                      }
                    }}
                  />
                ) : (
                  <span className="f-500">{age}</span>
                )}
              </div>
              <div>
                <p className="mb-2">Gender</p>
                {isEditable ? (
                  <select
                    className="details-input"
                    value={gender}
                    onChange={(e) => {
                      setChange(true);
                      setGender(e.target.value);
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="transgender">Transgender</option>
                    <option value="rather not say">Rather not say</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <span className="f-500">{gender}</span>
                )}
              </div>
              <div>
                <p className="mb-2">Country</p>
                {isEditable ? (
                  <input
                    className="details-input"
                    type="text"
                    value={country}
                    onChange={(e) => {
                      setChange(true);

                      const value = e.target.value;
                      if (!/\d/.test(value)) {
                        setCountry(value);
                      }
                    }}
                  />
                ) : (
                  <span className="f-500">{country}</span>
                )}
              </div>
            </div>
            <div>
              <p className="mb-2">Description</p>
              {isEditable ? (
                <textarea
                  className="desc-textarea"
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setChange(true);
                  }}
                />
              ) : (
                <span className="f-500">{description}</span>
              )}
            </div>

            {isEditable ? (
              <div className="card-actions" style={{ marginTop: "20px" }}>
                <img
                  src={Cross}
                  onClick={() => {
                    changeFlag();
                    handleDiscardChanges();
                  }}
                />
                <img
                  onClick={() => {
                    console.log(change);
                    if (change) {
                      if (name && age && country && description) {
                        setIsEditable(false);
                        changeFlag();
                      } else {
                        alert("Please fill all values");
                      }
                    } else {
                      alert("No changes done");
                    }
                  }}
                  src={Tick}
                />
              </div>
            ) : (
              <div className="card-actions">
                <img
                  onClick={() => {
                    setDeleteFlag(true);
                  }}
                  src={Delete}
                />
                <img
                  onClick={() => {
                    if (age < 18) {
                      alert("Age is less than 18");
                      return;
                    }
                    setIsEditable(true);
                    changeFlag();
                  }}
                  src={Edit}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {deleteFlag && (
        <div className="delete-dailog">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <p>Are you sure you want to delete ?</p>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setDeleteFlag(false)}
            >
              X
            </span>
          </div>
          <div style={{ textAlign: "end" }}>
            <button className="btn" onClick={() => setDeleteFlag(false)}>
              Cancel
            </button>
            <button
              className="btn"
              style={{ background: "red", color: "white", border: "none" }}
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Celebrity;
