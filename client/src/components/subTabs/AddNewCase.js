import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

function AddNewCase({theme, tfStyle, submit, classes}) {
  const [judgeID, setJudgeID] = useState()
  const [lawyerAID, setLawyerAID] = useState()
  const [lawyerBID, setLawyerBID] = useState()
  const [partyA, setPartyA] = useState()
  const [partyB, setPartyB] = useState()
  const [details, setDetails] = useState()
  const [loading, setLoading] = useState(false);
  const [resText, setResText] = useState("")

  return (
    <Grid container direction="row">
      <Grid
        item
        xs={6}
        style={{
          backgroundImage: "url(./images/hammer.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor:
            theme.palette.type === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPositionY: "-100px",
        }}
      />
      <Grid
        item
        xs={6}
        style={{ maxWidth: "50%", margin: "auto", paddingBottom: "20px" }}
      >
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <h1>Add New Case</h1>
          <TextField
            style={tfStyle}
            label="Judge ID"
            variant="outlined"
            onChange={e=>setJudgeID(e.target.value)}
          />
          <TextField
            style={tfStyle}
            label="Lawyer A ID"
            variant="outlined"
            onChange={e=>setLawyerAID(e.target.value)}
          />
          <TextField
            style={tfStyle}
            label="Lawyer B ID"
            variant="outlined"
            onChange={e=>setLawyerBID(e.target.value)}
          />
          <TextField
            style={tfStyle}
            label="Party A Name"
            variant="outlined"
            onChange={e=>setPartyA(e.target.value)}
          />
          <TextField
            style={tfStyle}
            label="Party B Name"
            variant="outlined"
            onChange={e=>setPartyB(e.target.value)}
          />
          <TextField 
            style={tfStyle} 
            label="Details" 
            variant="outlined"
            onChange={e=>setDetails(e.target.value)} 
          />

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px", minHeight: "36px" }}
            onClick={() => submit(judgeID, lawyerAID, lawyerBID, partyA, partyB, details, setLoading, setResText)}
          >
          {
              loading ? (
                <CircularProgress size={24} className={classes.buttonProgress} />
              ) : "Add Case"
            }
          </Button>
          <h2>{resText}</h2>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddNewCase
