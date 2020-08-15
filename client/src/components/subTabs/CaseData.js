import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "react-drop-zone/dist/styles.css";
import CircularProgress from '@material-ui/core/CircularProgress';

function CaseData({tfStyle, submit, classes, closeCase}) {
  const [caseId, setCaseId] = useState()
  const [loading, setLoading] = useState(false);
  const [caseInfo, setCaseInfo] = useState(null)
  const [loading2, setLoading2] = useState(false);
  const [resText, setResText] = useState()

  return (
    <>
    <h1>View Case Data</h1>
      <TextField
        style={tfStyle}
        label="Enter Case ID"
        type="number"
        variant="outlined"
        onChange={e=>setCaseId(e.target.value)}
      />
      
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "15px", minHeight: "36px" }}
          onClick={() => submit(caseId, setLoading, setCaseInfo)}
        >
        {
          loading ? (
            <CircularProgress size={24} className={classes.buttonProgress} />
          ) : "View"
        }
        </Button>
      </div>
      {
        caseInfo &&
        <div
          style={{marginTop: "30px"}}
        >
          <b>DETAILS: </b>{caseInfo.details} <br />
          <b>Judge Address: </b>{caseInfo.judge} <br />
          <b>Lawyer A [{caseInfo.party_1_name}] Address: </b>{caseInfo.lawyer1} <br />
          <b>Lawyer B [{caseInfo.party_2_name}] Address: </b>{caseInfo.lawyer2} <br />
          <br />
          <b>Case Status: </b>{caseInfo.isOpen == "true" ? "Active" : "Closed"}
          <br />


          <div style={{marginTop: "30px"}}>
            {
              <>
                <h3>Evidences:</h3>
                {
                  caseInfo.evidenceData.map((evi, key) => (
                    <div key={key}>
                      <b>IPFS File Link: </b> <a href={`https://ipfs.io/ipfs/${evi.FileHash}`} target="_blank" rel="noopener noreferrer">{evi.FileHash}</a>
                    </div>
                  ))
                }
              </>
            }
          </div>
          { caseInfo.isOpen == "true" &&
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "15px", minHeight: "36px" }}
              onClick={() => closeCase(caseId, setLoading2, setResText)}
            >
            {
              loading2 ? (
                <CircularProgress size={24} className={classes.buttonProgress} />
              ) : "Close Case"
            }
            </Button>
          }
        </div>
      }
      <h3>{resText}</h3>
    </>
  )
}

export default CaseData
