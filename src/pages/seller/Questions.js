import { Close, Details, Edit, Info } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getQuestionsAsSeller,
  updateQuestionAsSeller,
} from "../../redux/apiCalls";
import QuickSearchToolbar from "../../utils/QuickSearchToolbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

function AllQuestions({ questions, columns }) {
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#2263a5",
          borderLeftWidth: 1,
          borderColor: "#f1f8ff",
          color: "white",
        },
      }}
    >
      <DataGrid
        headerHeight={30}
        loading={!questions.length}
        rows={questions}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        density="comfortable"
        initialState={{
          sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          },
        }}
        components={{ Toolbar: QuickSearchToolbar }}
      />
    </Box>
  );
}

function UnansweredQuestions({ questions, columns }) {
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "#2263a5",
          borderLeftWidth: 1,
          borderColor: "#f1f8ff",
          color: "white",
        },
      }}
    >
      <DataGrid
        filterModel={{
          items: [
            { columnField: "status", operatorValue: "equals", value: "false" },
          ],
        }}
        headerHeight={30}
        loading={!questions.length}
        rows={questions}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        density="comfortable"
        initialState={{
          sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          },
        }}
        components={{
          Toolbar: QuickSearchToolbar,
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              All questions has been answered already.
            </Stack>
          ),
        }}
      />
    </Box>
  );
}

const SellerQuestions = ({ from = false }) => {
  const [questions, setQuestions] = useState([]);
  const [questionDetails, setQuestionDetails] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  useEffect(() => {
    setLoading(true);
    getQuestionsAsSeller().then((res) => {
      setQuestions(res);
      setLoading(false);
    });
  }, []);

  const handleCloseDialog = () => {
    setQuestionDetails(false);
  };

  const handleUpdate = () => {
    setLoading(true);
    const newQuestionDetails = {
      status: 1,
      answer,
    };
    updateQuestionAsSeller(questionDetails._id, newQuestionDetails).then(
      (res) => {
        setResponse(res);
        setQuestionDetails(false);
        getQuestionsAsSeller().then((res) => {
          setQuestions(res);
          setLoading(false);
        });
      }
    );
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "Asked At",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography>
            {new Date(params.row.createdAt).toLocaleString()}
          </Typography>
        );
      },
    },
    {
      field: "user",
      headerName: "Asked By",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.user.img} alt="" />
            <Typography>{params.row.user.username}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "product",
      headerName: "Question For",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Link
            to={`/product/${params.row.product._id}`}
            style={{ textDecoration: "none" }}
          >
            <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
              <Avatar src={params.row.product.img} alt="" />
              <Typography>{params.row.product.title}</Typography>
            </Stack>
          </Link>
        );
      },
    },
    {
      field: "question",
      headerName: "Question",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Typography>{params.row.question}</Typography>;
      },
    },
    {
      field: "answer",
      headerName: "Answer",
      headerClassName: "super-app-theme--header",
      width: 245,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Typography>{params.row.answer}</Typography>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              color: !params.row.status ? "red" : "green",
            }}
          >
            {params.row.status ? "Answered" : "Not answered"}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 220,
      align: "center",
      headerAlign: "center",
      description: "",
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <IconButton
              aria-label="edit"
              onClick={() => setQuestionDetails(params.row)}
            >
              <Tooltip title="Answer It">
                <Edit />
              </Tooltip>
            </IconButton>
            <Link
              to={`/product/${params.row.product._id}`}
              style={{ textDecoration: "none" }}
            >
              <Tooltip title="Visit Product Page">
                <IconButton>
                  <Info />
                </IconButton>
              </Tooltip>
            </Link>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }} disableGutters>
        {!loading && questions.length === 0 && (
          <Typography variant="h6">
            You have not received any question yet.{" "}
          </Typography>
        )}
        {from && !loading && questions.length !== 0 && (
          <Box
            sx={{
              height: 300,
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "#2263a5",
                bquestionLeftWidth: 1,
                bquestionColor: "#f1f8ff",
                color: "white",
              },
            }}
          >
            <DataGrid
              headerHeight={30}
              loading={loading}
              rows={questions}
              getRowId={(row) => row._id}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              disableSelectionOnClick
              density="comfortable"
              initialState={{
                sorting: {
                  sortModel: [{ field: "createdAt", sort: "desc" }],
                },
              }}
              hideFooter={true}
            />
          </Box>
        )}

        {!from && (
          <>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Box sx={{ backgroundColor: "#4fb1f2" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  textColor="inherit"
                  centered
                >
                  <Tab label="All Questions" value={1} />
                  <Tab label="Unanswered Questions" value={2} />
                </Tabs>
              </Box>
            </Box>
            <TabPanel value={value} index={1}>
              {/* {main} */}
              <AllQuestions questions={questions} columns={columns} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <UnansweredQuestions questions={questions} columns={columns} />
            </TabPanel>
          </>
        )}
      </Container>

      <Dialog
        open={Boolean(questionDetails)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <DialogTitle>Answer Question</DialogTitle>
        <DialogContent>
          <Typography>Question asked: {questionDetails.question}</Typography>
          <Typography>Your answer:</Typography>
          <TextField
            onChange={(e) => setAnswer(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="answer"
            name="answer"
            autoFocus
            multiline
            rows={3}
            defaultValue={questionDetails?.answer}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleUpdate()}>Answer</Button>
        </DialogActions>
      </Dialog>

      {/* Display success message */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(response.result === "success")}
        TransitionComponent={SlideTransition}
        autoHideDuration={5000}
        onClose={() => {
          setResponse(false);
        }}
      >
        <Alert
          onClose={() => {
            setResponse(false);
          }}
          severity={response.result}
          sx={{ width: "100%" }}
        >
          {response.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SellerQuestions;
