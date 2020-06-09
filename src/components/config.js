import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import config from "../config";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';

function saveJSON(link, data, fileName = "config") {
  const content = JSON.stringify(data);
  var blob = new Blob([content], { type: "text/text" });
  var url = URL.createObjectURL(blob);

  var a = link;
  a.download = fileName + ".json";
  a.href = url;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const lendingConfig = config[0];

function CardContentInputs(props) {
  const classes = useStyles();
  const { cardConfig, data, setConfig } = props;

  const getInputs = () => {
    const result = {};
    for (let input of cardConfig.inputs) {
      result[input.id] = "";
    }
    return result;
  };

  useEffect(() => {
    // if (cardConfig.type === "list" && !data) {
    //   setConfig([{ ...getInputs() }]);
    // }
  }, []);

  console.log("CONTENT DATA", data);
  const renderContent = (value, setValue, name) => {
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    return (
      <Grid item>
        <TextField
          required
          label={name}
          variant="filled"
          value={value}
          onChange={handleChange}
        />
      </Grid>
    );
  };
  if (cardConfig.type === "list") {
    return (
      <Grid container justify="left" className={classes.root} spacing={2}>
        {(data || []).map((item, index) => (
          <Grid item xs={12}>
            <Grid container justify="left" spacing={2}>
              {cardConfig.inputs.map((input) =>
                renderContent(
                  item[input.id],
                  (value) => {
                    const result = [...data];
                    result[index] = {
                      ...item[input.id],
                      [input.id]: value,
                    };
                    setConfig(result);
                  },
                  input.name
                )
              )}
              <Grid item>
                <IconButton
                  onClick={() => {
                    const result = [...data];
                    result.splice(index, 1);
                    setConfig(result);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Grid container justify="left" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  console.log(data);
                  setConfig([...(data || []), { ...getInputs() }]);
                }}
              >
                Добавить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return null;
}

function TabPanel(props) {
  const { value, index, selectedConfigUpdate, data } = props;

  const getSetBlockData = (blockId) => (blockData) =>
    selectedConfigUpdate({
      ...data,
      [blockId]: blockData,
    });

  console.log("TAB DATA", data);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index &&
        lendingConfig.blocks.map((block) => (
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {block.name}
              </Typography>
              <CardContentInputs
                cardConfig={block}
                data={data[block.id]}
                setConfig={getSetBlockData(block.id)}
              />
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Config() {
  const [result, setResult] = React.useState({
    config: {},
  });
  const [selectedConfig, setSelectedConfig] = React.useState("config");
  const link = React.useRef(null);

  const handleChange = (event, newValue) => {
    setSelectedConfig(newValue);
  };

  const onSelectedConfigUpdate = (data) => {
    setResult({
      ...result,
      [selectedConfig]: data,
    });
  };

  const save = () => saveJSON(link.current, result)

  console.log("ROOT DATA", result);
  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={selectedConfig}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {Object.keys(result).map((key) => (
            <Tab
              label={
                key === "config"
                  ? "Конфигурация по умолчанию"
                  : `?variant=${key}`
              }
              {...a11yProps(key)}
            />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel
        value={selectedConfig}
        index={"config"}
        data={result["config"]}
        selectedConfigUpdate={onSelectedConfigUpdate}
      />
      <a href="#" ref={link} onClick={save}>
        Скачать
      </a>
    </div>
  );
}
