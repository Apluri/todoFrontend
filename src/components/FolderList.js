import React from "react";

const FolderList = ({ folders }) => {
  return (
    <div className="folders-list">
      {folders.map((folder) => (
        <div className="folder" key={folder.id}>
          <li className="folder-list-item">{folder.name}</li>
        </div>
      ))}
    </div>
  );
};

export default FolderList;
