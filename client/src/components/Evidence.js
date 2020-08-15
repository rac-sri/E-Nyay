import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import web3 from '../functionalities/web3'
import AddNewCase from './subTabs/AddNewCase'
import Register from './subTabs/Register'
import Upload from './subTabs/Upload'
import CaseData from './subTabs/CaseData'
import Entry from "./entry";

const courtABI = require('../abis/Court.json')
const courtContractAddress = "0x5012248C147BCce91b46914bd7f4753dD7615ebC"  //rinkeby

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
  buttonProgress: {
    color: "white",
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Evidence() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [contract, setContract] = useState(null)
  const [account, setAccount] = useState()

  // Setup Contracts on App Load
  useEffect(() => {
    async function contractsSetup() {
      setContract(new web3.eth.Contract(courtABI, courtContractAddress))
    }
    contractsSetup()

    web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);
      setAccount(accounts[0])
    });

  }, [])

  const addCase = (judgeID, lawyerAID, lawyerBID, partyAName, partyBName, details, setLoading, setResText) => {
    setLoading(true)
    contract.methods.newCase(
      judgeID, lawyerAID, lawyerBID, partyAName, partyBName, details
    ).send({
      from: account
    }).then(r => {
      console.log(r)

      contract.methods.getCasesCount().call().then(r => {
        setLoading(false)
        setResText(`✅ CaseID is: ${parseInt(r)-1}`)
      })
    })
  }

  const registerUser = (role, name, addr, setLoading, setResText) => {
    setLoading(true)

    if(role === "judge") {
      contract.methods.registerJudge(
        name, addr, ""
      ).send({
        from: account
      }).then(r => {
        console.log(r)

        contract.methods.getJudgesCount().call().then(r => {
          setLoading(false)
          setResText(`✅ JudgeID is: ${parseInt(r)-1}`)
        })
      })
    } else {
      contract.methods.registerLawyer(
        name, addr, ""
      ).send({
        from: account
      }).then(r => {
        console.log(r)
        
        contract.methods.getLawyersCount().call().then(r => {
          setLoading(false)
          setResText(`✅ LawyerID is: ${parseInt(r)-1}`)
        })

      })
    }
  }

  const uploadEvidence = (caseID, fileHash, fileType, setLoading, setResText) => {
    setLoading(true)
    contract.methods.uploadEvidence(
      caseID, fileHash, fileType
    ).send({
      from: account
    }).then(r => {
      console.log(r)
      setResText("✅ Evidence added to the Case")
      setLoading(false)
    })
  }

  const getCaseData = async (caseId, setLoading, setCaseInfo) => {
    setLoading(true)
    
    let caseData = await contract.methods.cases(caseId).call();
    let evidenceCount = await contract.methods.getEvidenceCount(caseId).call();

    let evidenceData=[]
    
    for(var i=0; i<parseInt(evidenceCount); i++) {
      let evi = await contract.methods.getEvidence(caseId, i).call();
      evidenceData.push(evi);
    }

    caseData.evidenceData = evidenceData;

    setCaseInfo(caseData)
    setLoading(false)
    console.log(caseData)
  }

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
          <Tab label="Video Chat" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <AddNewCase 
            theme={theme}
            tfStyle={tfStyle}
            submit={addCase}
            classes={classes}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <img src="./dot-grid-triangle.svg" alt="dots"
            style={{
              left: 0,
              top: "104px",
              position: "fixed"
            }}
          />
          <Upload
            tfstyle={tfStyle}
            submit={uploadEvidence}
            classes={classes}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Register
            theme={theme}
            tfStyle={tfStyle}
            submit={registerUser}
            classes={classes}
          />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <img src="./dot-grid-triangle.svg" alt="dots"
            style={{
              left: 0,
              top: "104px",
              position: "fixed"
            }}
          />
          <CaseData
            tfstyle={tfStyle}
            submit={getCaseData}
            classes={classes}
          />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <img src="./dot-grid-triangle.svg" alt="dots"
            style={{
              left: 0,
              top: "104px",
              position: "fixed"
            }}
          />
          <Entry />
        </TabPanel>
      </div>
    </div>
  );
}
