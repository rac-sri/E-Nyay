import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ipfs from "../../ipfs";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import fileReaderPullStream from "pull-file-reader";
import CircularProgress from '@material-ui/core/CircularProgress';

function Upload({tfStyle, submit, classes}) {
  const [caseId, setCaseId] = useState()
  const [ipfsHash, setIpfsHash] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resText, setResText] = useState("")

  const onDrop = async (file) => {
    setIsUploading(true);
    setFileName(file.name);
    setFileType(file.name.substr(file.name.lastIndexOf(".") + 1));

    const stream = fileReaderPullStream(file);
    const result = await ipfs.add(stream);
    setIpfsHash(result[0].hash);
    setIsUploading(false);

    console.log("IPFS Hash:", result[0].hash);
  };

  return (
    <>
    <h1>Upload Evidence for Case</h1>
      <TextField
        style={tfStyle}
        label="Enter Case ID"
        type="number"
        variant="outlined"
        onChange={e=>setCaseId(e.target.value)}
      />
      <StyledDropZone
        onDrop={onDrop}
        style={{ maxWidth: "50%", margin: "auto", marginTop: "20px" }}
      >
        <div>
          {fileName ? (
            <>
              <span>File: {fileName}</span>
              <br />
              {isUploading ? (
                <b>⏳ Uploading to IPFS....</b>
              ) : (
                <b>✅ Uploaded</b>
              )}
            </>
          ) : (
            "Click or drop your file here"
          )}
        </div>
      </StyledDropZone>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "15px", minHeight: "36px" }}
        onClick={() => submit(caseId, ipfsHash, fileType, setLoading, setResText)}
      >
      {
        loading ? (
          <CircularProgress size={24} className={classes.buttonProgress} />
        ) : "Submit"
      }
      </Button>
      <h2>{resText}</h2> 
    </>
  )
}

export default Upload
