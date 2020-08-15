import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "react-drop-zone/dist/styles.css";
import CircularProgress from '@material-ui/core/CircularProgress';

function CaseData({tfStyle, submit, classes}) {
  const [caseId, setCaseId] = useState()
  const [loading, setLoading] = useState(false);
  const [caseInfo, setCaseInfo] = useState(null)

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
          <b>Judge Address: </b>{caseInfo.judge} <br />
          <b>Lawyer A Address: </b>{caseInfo.lawyer1} <br />
          <b>Lawyer B Address: </b>{caseInfo.lawyer2} <br />

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
        </div>
      }
    </>
  )
}

export default CaseData
