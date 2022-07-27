import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useLanguage from "./useLanguage";

const useError = () => {
  const { error: userError } = useSelector((state) => state.user);
  const { error: postError } = useSelector((state) => state.posts);
  const [error, setError] = useState("");
  const userLanguage = useLanguage();

  const errorType = useMemo(() => {
    return {
      duplicateEmail: "duplicateEmail",
      duplicateUsername: "duplicateUsername",
      nameTooLong: "nameTooLong",
      emptyTitle: "emptyTitle",
      emptyComment: "emptyComment",
      emptyReply: "emptyReply",
      backend: "backend",
      notFound: "404",
      password: "password",
      database: "database",
      scrape: "scrape",
      noAuthToken: "noAuthToken",
      verifyToken: "tokenVerifyError",
      authToken: "authTokenError",
      timeout: "timeout",
    };
  }, []);

  const setMatchingError = useCallback(
    (error) => {
      switch (error) {
        case errorType.duplicateEmail:
          return setError(userLanguage.error.duplicateEmail);
        case errorType.duplicateUsername:
          return setError(userLanguage.error.duplicateUsername);
        case errorType.nameTooLong:
          return setError(userLanguage.error.nameTooLong);
        case errorType.emptyTitle:
          return setError(userLanguage.error.emptyTitle);
        case errorType.emptyComment:
          return setError(userLanguage.error.emptyComment);
        case errorType.emptyReply:
          return setError(userLanguage.error.emptyReply);
        case errorType.backend:
          return setError(userLanguage.error.backend);
        case errorType.notFound:
          return setError(userLanguage.error.notFound);
        case errorType.password:
          return setError(userLanguage.error.password);
        case errorType.database:
          return setError(userLanguage.error.database);
        case errorType.scrape:
          return setError(userLanguage.error.scrape);
        case errorType.noAuthToken:
          return setError(userLanguage.error.noAuthToken);
        case errorType.verifyToken:
          return setError(userLanguage.error.verifyAuthToken);
        case errorType.authToken:
          return setError(userLanguage.error.authToken);
        case errorType.timeout:
          return setError(userLanguage.error.timeout);
        default:
          return setError(userError.length > 0 ? userError : postError.length > 0 ? postError : "");
      }
    },
    [errorType, setError, userLanguage, postError, userError]
  );

  useEffect(() => {
    if (userError.length === 0 && postError.length === 0) return setError("");
    if (userError.length > 0) {
      return setMatchingError(userError);
    } else if (postError.length > 0) {
      return setMatchingError(postError);
    }
  }, [userError, postError, userLanguage, setMatchingError]);

  return error;
};

export default useError;
