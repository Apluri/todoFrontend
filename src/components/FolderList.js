import React, { useState, useEffect } from "react";
import axios from "axios";

const FolderList = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    //let url = "http://localhost:8080/api/";
    let url = "https://tamk-4a00ez62-3001-group04.herokuapp.com/api/";
    try {
      const response = await axios.get(url + "folders/");
      setFolders(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="folders-list">
      {folders.map((folder) => (
        <div className="folder" key={folder.id}>
          <div className="folder-list-item">{folder.name}</div>
        </div>
      ))}
    </div>
  );
};
/*
const FolderList = ({ folders }) => {
  
  return (
    <div className="folders-list">
      {folders.map((folder) => (
        <div className="folder" key={folder.id}></div>
      ))}
    </div>
  );
      
};
*/
export default FolderList;
