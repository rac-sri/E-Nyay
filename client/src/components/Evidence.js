import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    minWidth: "100%"
  },
}));

export default function Evidence() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tfStyle = {
    margin: "15px"
  }

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
          <Paper elevation={3} style={{maxWidth: "50%", margin: "auto", paddingBottom: "20px"}}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <h1>Add New Case</h1>
              <TextField style={tfStyle} label="Judge ID" variant="outlined" />
              <TextField style={tfStyle} label="Lawyer A ID" variant="outlined" />
              <TextField style={tfStyle} label="Lawyer B ID" variant="outlined" />
              <TextField style={tfStyle} label="Party A Name" variant="outlined" />
              <TextField style={tfStyle} label="Party B Name" variant="outlined" />
              <TextField style={tfStyle} label="Details" variant="outlined" />

              <Button variant="contained" color="primary" style={{marginTop: "15px"}}>
                Add Case
              </Button>
            </Grid>

          </Paper>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Paper elevation={3} style={{maxWidth: "50%", margin: "auto", paddingBottom: "20px"}}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <h1>Register</h1>
              <TextField style={tfStyle} label="Name" variant="outlined" />
              <FormControl style={{minWidth: "30%", marginBottom: "20px"}}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={"lawyer"}>Lawyer</MenuItem>
                  <MenuItem value={"judge"}>Judge</MenuItem>
                </Select>
              </FormControl>
              <TextField style={tfStyle} label="Eth Address" value="0xREEEE" variant="outlined" disabled/>
              
              <Button variant="contained" color="primary" style={{marginTop: "15px"}}>
                Register
              </Button>
            </Grid>

          </Paper>
        </TabPanel>
      </div>
    </div>
  );
}
