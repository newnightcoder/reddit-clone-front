import history from "./history";

const redirect = () => {
  localStorage.clear();
  history.push("/");
};
export default redirect;
