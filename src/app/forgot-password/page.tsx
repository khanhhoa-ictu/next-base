"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { handleErrorMessage } from "@/lib/utils";
import Loading from "@/components/loading";
import Request from "./components/request/Request";
import Verify from "./components/verify/Verify";
import Forgot from "./components/forgot/Forgot";

function ForgotPassword() {
  const [statusForgot, setStatusForgot] = useState("forgot");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRequest = async () => {
    const newEmail = {
      email,
    };
    try {
      setLoading(true);
      //   await requestPassword(newEmail);
      setStatusForgot("checkOTP");
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.forgotPassword}>
      {loading && <Loading />}

      {statusForgot === "forgot" ? (
        <Request
          email={email}
          handleRequest={handleRequest}
          handleChangeEmail={(value) => setEmail(value)}
        />
      ) : statusForgot === "checkOTP" ? (
        <Verify
          email={email}
          handleVerify={() => setStatusForgot("")}
          handleLoading={(value) => setLoading(value)}
        />
      ) : (
        <Forgot email={email} />
      )}
    </div>
  );
}

export default ForgotPassword;
