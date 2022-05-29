import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLanguage from "./useLanguage";

const useError = () => {
  const { error: userError } = useSelector((state) => state.user);
  const { error: postError } = useSelector((state) => state.posts);
  const [error, setError] = useState("");
  const userLanguage = useLanguage();

  const errorType = {
    duplicateEmail: "duplicateEmail",
    duplicateUsername: "duplicateUsername",
    emptyTitle: "Der Beitrag hat keine Überschrift!\n Schreiben Sie ein paar Wörter...",
    emptyComment: "Ihr Kommentar ist doch leer...",
    emptyReply: "Ihre Antwort ist doch leer...",
    backend: "backend",
    notFound: "404",
    password: "password",
    database: "database",
    scrape: "scrape",
    noAuthToken: "noAuthToken",
    verifyToken: "tokenVerifyError",
    authToken: "authTokenError",
  };

  const setMatchingError = (error) => {
    const {
      duplicateEmail,
      duplicateUsername,
      emptyTitle,
      emptyComment,
      emptyReply,
      backend,
      notFound,
      password,
      database,
      scrape,
      noAuthToken,
      verifyToken,
      authToken,
    } = errorType;
    switch (error) {
      case duplicateEmail:
        return setError(userLanguage.error.duplicateEmail);
      case duplicateUsername:
        return setError(userLanguage.error.duplicateUsername);
      case emptyTitle:
        return setError(userLanguage.error.emptyTitle);
      case emptyComment:
        return setError(userLanguage.error.emptyComment);
      case emptyReply:
        return setError(userLanguage.error.emptyReply);
      case backend:
        return setError(userLanguage.error.backend);
      case notFound:
        return setError(userLanguage.error.notFound);
      case password:
        return setError(userLanguage.error.password);
      case database:
        return setError(userLanguage.error.database);
      case scrape:
        return setError(userLanguage.error.scrape);
      case noAuthToken:
        return setError(userLanguage.error.noAuthToken);
      case verifyToken:
        return setError(userLanguage.error.verifyToken);
      case authToken:
        return setError(userLanguage.error.authToken);
      default:
        return setError(userError.length > 0 ? userError : postError.length > 0 ? postError : null);
    }
  };

  useEffect(() => {
    if (userError.length > 0) {
      return setMatchingError(userError);
    } else if (postError.length > 0) {
      return setMatchingError(postError);
    }
  }, [userError, postError]);

  return error;
};

export default useError;
