import { useState } from "react";
import "./Form.css";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  //using this buttonDisabled we avoid checking everytime is an username or password
  //is meant to be sent--->we just enable the send button when the data are correct!
  const [selected, setSelected] = useState(false);

  //this const i'm using to set the "warning-message-boxes beneath username"
  const isUsernameValid = inputValue.trim() != "" && inputValue.length >= 5;

  const inputHandler = (event) => {
    //--->here the value is refreshed every time I type anything in the input field!
    //--->we avoid the async related react isseu
    if (event.target.value.trim() != "" && event.target.value.length >= 5) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
    setInputValue(event.target.value);
  };

  const selecting = () => {
    // /*2*/ first time I select input, it turns on and activate the "warning boxes" down
    if (selected == false) {
      setSelected(true);
    }
  };

  //now we handle the warning box tyle behaviour!
  let usernameInputClassName = "usernameDefault";

  if (!isUsernameValid && selected == true) {
    usernameInputClassName = "usernameWrong";
  } else if (isUsernameValid && selected == true) {
    usernameInputClassName = "usernameGood";
  } else {
    usernameInputClassName = "usernameDefault";
  }

  //--->with this event I'm sending data to back-end, even if I'm not doing it actually!
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    console.log("You've sent this userName to back-end: " + inputValue);

    //setting back to default
    setInputValue("");
    setSelected(false);
    setButtonDisabled(true);
  };

  return (
    <>
      <form onSubmit={formSubmissionHandler}>
        <div className="div">
          <label className="label" htmlFor="userName">
            Username:
          </label>
          <input
            value={inputValue}
            onChange={inputHandler}
            onSelect={selecting} // /*1*/  when the input is selected for--->go to "selecting" above!
            type="text"
            name="userName"
            className={usernameInputClassName}
          />
          {/*3*/}
          {!isUsernameValid && selected == true && (
            <div className="warning">
              Username must at least be 5 characters long!
            </div>
          )}
          {isUsernameValid && selected == true && (
            <div className="correct">Username correct!</div>
          )}
          <button disabled={buttonDisabled}>Send</button>
        </div>
      </form>
    </>
  );
};

export { Form };
