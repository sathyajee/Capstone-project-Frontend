import React, { useState } from 'react';
import { ethers,providers } from "ethers";
//import './AddUser.css';
import { useNavigate } from 'react-router-dom';
import {UpdateIndex, createWill} from './utils/Handleapi';
function AddUser() {
  const [formData, setFormData] = useState({
    // Name: '',
    // UIDc: '',
    // nomanieeName:'',
    // UIDn:'',
    // file:null
    });

  const [file, setFile] = useState(null);
  const [encid, setEncid] = useState('');
  let UIDcreator = "";
  const [UID, setUID] = useState('')
  const Navigate = useNavigate();

  const isIdValid = (id) => {
    // Add your custom validation logic for id
    const idRegex = /^[2-9]\d{3}\s\d{4}\s\d{4}$/;
    return idRegex.test(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate id field
    // if ((name === 'UIDc' || name==='UIDn') && !isIdValid(value)) {
    //   // Handle invalid id
    //   return;
    // }
    if(name==='UIDc'){
      UIDcreator = value;
      setUID(value);
      // setEncid(value);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isNomineeIdValid = (nomineeId) => {
    // Add your custom validation logic for nomineeId
    const nomineeIdRegex = /^[2-9]\d{3}\s\d{4}\s\d{4}$/;
    return nomineeIdRegex.test(nomineeId);
  };

  const handleNomineeChange = (index, e) => {
    const { name, value } = e.target;
    // Validate nomineeId field
    if (name.includes('nomineeId') && !isNomineeIdValid(value)) {
      // Handle invalid nomineeId
      return;
    }
    const updatedNominees = [...formData.nominees];
    updatedNominees[index][name] = value;
    setFormData({
      ...formData,
      nominees: updatedNominees,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setFormData({
    //   ...formData,
    //   file: file,
    // });
    // formData.append('file',file);
    console.log(file);
    setFile(file);
  };

  const contractAddress = '0x65ef37C94424847113500D5bC6E4821699bE9a07'; // Replace with your actual contract address
	const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "name": "storePerson",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "ind",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "i",
          "type": "uint256"
        }
      ],
      "name": "getPerson",
      "outputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const provider=new ethers.providers.Web3Provider(window.ethereum,"goerli");
  let contract;
  let signer;
  provider.send("eth_requestAccounts",[]).then(() =>{
    provider.listAccounts().then(function (accounts){
      signer=provider.getSigner(accounts[0]);
      contract=new ethers.Contract(contractAddress,abi,signer);
    });
  });

  const [index,setIndex]=useState("");

  const handleStorePerson = async (EncCid) => {
    console.log(EncCid);
    //backend func
    //setCid(ecid);
    const createPerson=await contract.storePerson(EncCid);
    const i=await contract.getIndex();
    setIndex(i);
    //func to send index to the backend;
    console.log(createPerson);
    return i;
  }

  const handleAddNominee = () => {
    if (formData.nominees.length < 2) {
      setFormData({
        ...formData,
        nominees: [...formData.nominees, { nomineeName: '', nomineeId: '' }],
      });
    }
  };

  const handleDeleteNominee = (index) => {
    if (formData.nominees.length > 1) {
      const updatedNominees = [...formData.nominees];
      updatedNominees.splice(index, 1);
      setFormData({
        ...formData,
        nominees: updatedNominees,
      });
    }
  };
let Encid;
let Index;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(UIDcreator);
    Encid = await createWill(formData,file,setEncid,setUID,setFormData,setFile);
    Index = await handleStorePerson(Encid);
    await UpdateIndex(UID, Index);
    // setEncid("3");
    // setUID("2");
    //console.log(Index);
    console.log(index)
    console.log(Encid);
    // Redirect to the Retrieve page with the form data in the state
    Navigate('/download-keys', { state: { UIDc : UID } });
  };

  return (
    <div>
      <h2>Add User Page</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />
        </div>
        <div>
          <label>ID:</label>
          <input type="number" name="UIDc" value={formData.UIDc} onChange={handleChange} required/>
        </div>
        {/* <div>
          <h3>Nominees</h3>
          {formData.nominees.map((nominee, index) => (
            <div key={index}>
              <label>Nominee Name:</label>
              <input
                type="text"
                name={`nomineeName${index}`}
                value={nominee[`nomineeName${index}`]}
                onChange={(e) => handleNomineeChange(index, e)}
              />
              <label>Nominee ID:</label>
              <input
                type="text"
                name={`nomineeId${index}`}
                value={nominee[`nomineeId${index}`]}
                onChange={(e) => handleNomineeChange(index, e)}
              />
              
            </div>
          ))}
          
        </div> */}
        <div>
          <h3>Nominees</h3>
          <div>
          <label>Nominee Name:</label>
          <input type="text" name="nomanieeName" value={formData.nomanieeName} onChange = {handleChange} required/>
          {/* <input type="text" name="nomanieeName" /> */}
          </div>
          <div>
          <label>Nominee ID:</label>
          <input type="number" name="UIDn" value={formData.UIDn} onChange = {handleChange} required/>
          </div>
        </div>
        <div>
          <label>Upload PDF File:</label>
          <input type="file" accept=".pdf" name="file" onChange={handleFileChange} required/>
        </div>
        <button type="submit">Add User</button>
      </form>
      
    </div>
  );
}

export default AddUser;

