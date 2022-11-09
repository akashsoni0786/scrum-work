import React from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  Page,
  Spinner,
  InlineError,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { useNavigate } from "react-router-dom";
import { get_fetch } from "../../utils/methods/Fetch";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/Slice";

const Login = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const [errorUserEmpty, setErrorUserEmpty] = useState(false);
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState(false);
  const [errorUserWrong, setErrorUserWrong] = useState(false);
  const [errorPasswordWrong, setErrorPasswordWrong] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [clicked, setClicked] = useState("no");
  const handleEmailChange = useCallback((value) => setUser(value), []);
  const handleSubmit = async (event) => {
    setErrorUserEmpty(false);
    setErrorPasswordEmpty(false);
    setErrorUserWrong(false);
    setErrorPasswordWrong(false);
    setClicked("yes");
    event.preventDefault();
    const headers = {
      accept: "application/json",
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
    };
    const data = {
      username: user,
      password: pass,
    };

    const url = new URL("https://fbapi.sellernext.com/user/login");

    if (user === "" && pass === "") {
      setClicked("no");
      setErrorUserEmpty(true);
      setErrorPasswordEmpty(true);
    } else {
      if (user === "") {
        setClicked("no");
        setErrorUserEmpty(true);
      } else if (pass === "") {
        setClicked("no");
        setErrorPasswordEmpty(true);
      } else {
        if (user === "admin" && pass === "password123") {
          get_fetch(url, data, headers).then((data) => {
            if (data.success === true) {
              sessionStorage.setItem("token", data.data.token);
              sessionStorage.setItem("username", user);
              sessionStorage.setItem("gridData",JSON.stringify([]));
              sessionStorage.setItem("currentTab", "All");
              sessionStorage.setItem("searchMode","Off");
              dispatch(login(user));
              navigate("/dashboard", {
                state: { mytoken: sessionStorage.getItem("token") },
              });
              setClicked("no");
              setUser("");
              setPass("");
            } else {
              setClicked("no");
            }
          });
        } else {
          if (user !== "admin") {
            setClicked("no");
            setErrorUserWrong(true);
          }
          if (pass !== "password") {
            setClicked("no");
            setErrorPasswordWrong(true);
          }
        }
      }
    }
  };

  return (
    <>
      <Page title="Login">
        <Card sectioned>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                error={
                  (errorUserEmpty === true || errorUserWrong === true) && true
                }
                requiredIndicator
                value={user}
                onChange={handleEmailChange}
                label="Email"
                autoComplete="email"
                helpText={
                  <span>We’ll use this email address to authenticate you.</span>
                }
              />
              {errorUserEmpty && (
                <InlineError
                  message="Empty field of username"
                  fieldID="myFieldID"
                />
              )}
              {errorUserWrong && (
                <InlineError message="Invalid username" fieldID="myFieldID" />
              )}
              <TextField
                error={
                  (errorPasswordEmpty === true ||
                    errorPasswordWrong === true) &&
                  true
                }
                requiredIndicator
                onChange={(e) => setPass(e)}
                label="Password"
                type="password"
                value={pass}
                helpText={
                  <span>We’ll use this password to authenticate you.</span>
                }
              />
              {errorPasswordEmpty && (
                <InlineError
                  message="Empty field of password"
                  fieldID="myFieldID"
                />
              )}
              {errorPasswordWrong && (
                <InlineError message="Invalid password" fieldID="myFieldID" />
              )}
              <Button primary submit>
                {clicked === "no" ? (
                  <>Submit</>
                ) : (
                  <Spinner accessibilityLabel="Spinner example" size="small" />
                )}
              </Button>
            </FormLayout>
          </Form>{" "}
        </Card>
      </Page>
    </>
  );
};

export default Login;
