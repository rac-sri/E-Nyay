import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

function Register({theme, tfStyle, submit, classes}) {
  const [role, setRole] = useState()
  const [name, setName] = useState()
  const [addr, setAddr] = useState()
  const [loading, setLoading] = useState(false);
  const [resText, setResText] = useState("")

  return (
    <Grid container direction="row">
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
          <h1>Register</h1>
          <TextField 
            style={tfStyle} 
            label="Name" 
            variant="outlined"
            onChange={e=>setName(e.target.value)}
          />
          <FormControl
            style={{
              minWidth: "30%",
              marginBottom: "20px",
              paddingRight: "180px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={e=>setRole(e.target.value)}
            >
              <MenuItem value={"lawyer"}>Lawyer</MenuItem>
              <MenuItem value={"judge"}>Judge</MenuItem>
            </Select>
          </FormControl>
          <TextField
            style={tfStyle}
            label="Eth Address"
            variant="outlined"
            onChange={e=>setAddr(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "15px", minHeight: "36px" }}
            onClick={() => submit(role, name, addr, setLoading, setResText)}
          >
            {
              loading ? (
                <CircularProgress size={24} className={classes.buttonProgress} />
              ) : "Register"
            }
          </Button>
          <h2>{resText}</h2>
        </Grid>
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          backgroundImage: "url(./images/statue.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor:
            theme.palette.type === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPositionY: "-180px",
          minHeight: "620px",
        }}
      />
    </Grid>
  )
}

export default Register
