// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './App.css';

// function Retrieve() {
//   const location = useLocation();
//   const { formData } = location.state || {};
//   const [searchId, setSearchId] = useState('');
//   const [searchNomineeId, setSearchNomineeId] = useState('');
//   const [foundPdf, setFoundPdf] = useState(null);
//   const [searched, setSearched] = useState(false);

//   const handleSearch = () => {
//     // Check if the entered ID or Nominee ID match the stored data
//     if (formData) {
//       const matchingNominee = formData.nominees.find(
//         (nominee) => nominee.nomineeId === searchNomineeId
//       );

//       if (
//         (formData.id === searchId && formData.pdfFile) ||
//         (matchingNominee && matchingNominee.pdfFile)
//       ) {
//         setFoundPdf(formData.pdfFile || (matchingNominee && matchingNominee.pdfFile) || null);
//       } else {
//         setFoundPdf(null);
//       }
//     } else {
//       setFoundPdf(null);
//     }

//     // Set searched to true after the search is performed
//     setSearched(true);
//   };

//   return (
//     <div>
//       <h2>Retrieve Page</h2>
//       <div>
//         <label>ID:</label>
//         <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
//       </div>
//       <div>
//         <label>Nominee ID:</label>
//         <input
//           type="text"
//           value={searchNomineeId}
//           onChange={(e) => setSearchNomineeId(e.target.value)}
//         />
//       </div>
//       <button onClick={handleSearch}>Retrieve PDF</button>

//       {searched && foundPdf ? (
//         <div>
//           <p>PDF File Details:</p>
//           <p>Name: {foundPdf.name}</p>
//           <a href={URL.createObjectURL(foundPdf)} download={foundPdf.name}>
//             Download PDF
//           </a>
//         </div>
//       ) : searched ? (
//         <p>No match found. Please check your ID or Nominee ID.</p>
//       ) : null}
//     </div>
//   );
// }

// export default Retrieve;

import React, { useState } from 'react';
import './AddUser.css';
import { useNavigate } from 'react-router-dom';
import { RetrieveWill } from './utils/Handleapi';


function Retrieve() {
  
  const [formData,setFormData] = useState({})
  const [file, setFile] = useState(null);
  const [UID, setUID] = useState('')
  const Navigate = useNavigate();

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate id field
    // if ((name === 'UIDC' || name==='UIDn') && !isIdValid(value)) {
    //   // Handle invalid id
    //   return;
    // }
    if(name==='UIDc'){
      setUID(value);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    // Check if the entered ID or Nominee ID match the stored data
    // if (formData) {
    //   const matchingNominee = formData.nominees.find(
    //     (nominee) => nominee.nomineeId === searchNomineeId
    //   );

    //   if (
    //     (formData.id === searchId && formData.pdfFile) ||
    //     (matchingNominee && matchingNominee.pdfFile)
    //   ) {
    //     setFoundPdf(formData.pdfFile || (matchingNominee && matchingNominee.pdfFile) || null);
    //   } else {
    //     setFoundPdf(null);
    //   }
    // } else {
    //   setFoundPdf(null);
    // }
    await RetrieveWill(file,formData,setUID,setFormData,setFile);
    // have to try this one let ecidstr=await contract.getPerson(UID)
    console.log(formData);
    console.log(UID);
    console.log(file);
    Navigate('/download-will', { state: { UIDc : UID } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <h2>Retrieve Page</h2>
      
      <div>
        <label>UIDc:</label>
        <input type="text" name='UIDc' value={formData.UIDc} onChange={handleChange} required/>
      </div>
      <div>
        <label>Nominee UIDn:</label>
        <input
          type="text"
          name = 'UIDn'
          value={formData.UIDn}
          onChange={handleChange}
          required
        />
      </div>
      <div>
          <label>Upload Nominee PrivateKey:</label>
          <input type="file" accept=".pdf" name="file" onChange={handleFileChange} required/>
        </div>
      <button type="submit" onClick={handleSearch}>Retrieve Will</button>
      

      {/* {foundPdf ? (
        <div>
          <p>PDF File Details:</p>
          <p>Name: {foundPdf.name}</p>
          <a href={URL.createObjectURL(foundPdf)} download={foundPdf.name}>
            Download PDF
          </a>
        </div>
      ) : (
        <p>No match found. Please check your ID or Nominee ID.</p>
      )} */}
      
    </div>
  );
}

export default Retrieve;

