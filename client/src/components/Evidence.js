import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ipfs from "../ipfs";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";
import fileReaderPullStream from "pull-file-reader";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    minWidth: "100%",
  },
}));

export default function Evidence() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [ipfsHash, setIpfsHash] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tfStyle = {
    margin: "10px",
    minWidth: "55%",
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Add Case" {...a11yProps(0)} />
          <Tab label="Upload Evidence" {...a11yProps(1)} />
          <Tab label="Register Lawyer/Judge" {...a11yProps(2)} />
          <Tab label="View Case Data" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel value={value} index={0} dir={theme.direction}>
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
                />
                <TextField
                  style={tfStyle}
                  label="Lawyer A ID"
                  variant="outlined"
                />
                <TextField
                  style={tfStyle}
                  label="Lawyer B ID"
                  variant="outlined"
                />
                <TextField
                  style={tfStyle}
                  label="Party A Name"
                  variant="outlined"
                />
                <TextField
                  style={tfStyle}
                  label="Party B Name"
                  variant="outlined"
                />
                <TextField style={tfStyle} label="Details" variant="outlined" />

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "15px" }}
                >
                  Add Case
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <h1>Upload Evidence for Case</h1>
          <TextField
            style={tfStyle}
            label="Enter Case ID"
            type="number"
            variant="outlined"
          />
          <StyledDropZone
            onDrop={onDrop}
            style={{ maxWidth: "50%", margin: "auto" }}
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
            style={{ marginTop: "15px" }}
          >
            Submit
          </Button>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
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
                <TextField style={tfStyle} label="Name" variant="outlined" />
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
                  >
                    <MenuItem value={"lawyer"}>Lawyer</MenuItem>
                    <MenuItem value={"judge"}>Judge</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  style={tfStyle}
                  label="Eth Address"
                  value="0xREEEE"
                  variant="outlined"
                  disabled
                />

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "15px" }}
                >
                  Register
                </Button>
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
        </TabPanel>
      </div>
    </div>
  );
}
