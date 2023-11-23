import React, { useState } from 'react';
import './App.css';
import { UpdateWill, UpdateWillPrivateKey } from './utils/Handleapi';
import { useNavigate } from 'react-router-dom';
//import './AddUser.css';

function UpdateUser() {
  const [formData, setFormData] = useState({
    // name: '',
    // id: '',
  });

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFile1Change = (e) => {
    const file = e.target.files[0];
    setFile1(file);
  };

  const handleFile2Change = (e) => {
    const file = e.target.files[0];
    setFile2(file);

  };

  // const handleAddNominee = () => {
  //   // Check if there is no nominee or only one nominee
  //   if (formData.nomineeList.length < 2) {
  //     setFormData({
  //       ...formData,
  //       nomineeList: [...formData.nomineeList, { nomineeName: '', nomineeId: '' }],
  //     });
  //   }
  // };

  // const handleDeleteNominee = (index) => {
  //   const updatedNominees = [...formData.nomineeList];
  //   updatedNominees.splice(index, 1);
  //   setFormData({
  //     ...formData,
  //     nomineeList: updatedNominees,
  //   });
  // };

  // const handleNomineeChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedNominees = [...formData.nomineeList];
  //   updatedNominees[index][name] = value;
  //   setFormData({
  //     ...formData,
  //     nomineeList: updatedNominees,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, you can send the data to your server or perform any other action.
    console.log(formData);
    await UpdateWillPrivateKey(file1,setFile1);
    await UpdateWill(file2,setFile2,formData,setFormData);
    Navigate('/app');
  };

  return (
    <div>
      <h2>Update User Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
        </div>
        <div>
          <label>UIDc:</label>
          <input type="text" name="UIDc" value={formData.UIDc} onChange={handleChange} />
        </div>
        <div>
          <label>Upload CreatorKey File:</label>
          <input type="file" accept=".pdf" name="createfile" onChange={handleFile1Change} />
        </div>
        <div>
          <label>Upload New Will File:</label>
          <input type="file" accept=".pdf" name="willfile" onChange={handleFile2Change} />
        </div>
        {/* <div>
          <h3>Nominee List</h3>
          {formData.nomineeList.map((nominee, index) => (
            <div key={index}>
              <label>Nominee Name:</label>
              <input
                type="text"
                name="nomineeName"
                value={nominee.nomineeName}
                onChange={(e) => handleNomineeChange(index, e)}
              />
              <label>Nominee ID:</label>
              <input
                type="text"
                name="nomineeId"
                value={nominee.nomineeId}
                onChange={(e) => handleNomineeChange(index, e)}
              />
              <button type="button" onClick={() => handleDeleteNominee(index)}>
                Delete Nominee
              </button>
            </div>
          ))}
          {formData.nomineeList.length < 2 && (
            <button type="button" onClick={handleAddNominee}>
              Add Nominee
            </button>
          )}
        </div> */}
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
