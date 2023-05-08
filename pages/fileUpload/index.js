import React, {useState} from 'react';
import withLayout from "../components/layout/withLayout";
import Card from "../components/util/card/card";
import styles from "./fileUpload.module.css";

const DragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };
  
    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      setIsDragging(false);
  
      const { files } = e.dataTransfer;
      if (files && files.length > 0) {
        const fileList = Array.from(files).map((file) => {
          return {
            id: uuidv4(),
            file,
            name: file.name,
            size: file.size,
            type: file.type,
          };
        });
        onFileUpload(fileList);
      }
    };
    return (
        <Card customStyle={styles.card}>
            <div className={styles.content}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h1>Drag and Drop</h1>
                <img className={styles.img} src={"/file.svg"} alt={"dragAndDrop"} />
                <span>* .xlsx or .csv </span>
            </div>
        </Card>
    )
}

export default withLayout(DragAndDrop);