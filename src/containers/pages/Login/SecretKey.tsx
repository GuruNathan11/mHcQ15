import React, { Dispatch, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import 'list-to-tree';
import 'array-to-tree';
import 'react-dropdown-tree-select/dist/styles.css'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { connect, } from "react-redux";
import passcodeImage1 from "./../../../assets/images/mettler_images/passcodeImage.png"
import passcodeImage2 from "./../../../assets/images/mettler_images/passcodeImage2.png"
import { Button } from "primereact/button";
import * as Constants from "./../Constants/ConstantValues";
import { loginSecurity, verifyOtp } from "../../../store/actions/Login";
import inputSecurityLoginData from '../../../assets/data/SecurityLoginData.json';
import optData from '../../../assets/data/optData.json';

interface ISecretKey { }
interface ISecretKey {
  props: RouteComponentProps;
  dispatch: Dispatch<any>;
  match: any;
  loginSecurityData: any;
  verifyOTPData: any;
  decryptscretkey: any;
  state: {
    nodes: [],
    checked: [],
    expanded: []
  }
}
const SecretKey: React.FC<ISecretKey> = ({
  match, dispatch, loginSecurityData, verifyOTPData, decryptscretkey


}) => {
  let [enteredPassword, setEnteredPassword] = useState("");
  const [decryptscretkeyId, setdecryptscretkey] = useState(decryptscretkey);
  let [encryptMail, setEncryptMail] = useState(null);
  const [passcodeImage, setPassCodeImage] = useState(null);
  let [decryptMail, setDecryptMail] = useState(null);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [thirdValue, setThirdValue] = useState("");
  const [fourthValue, setForthValue] = useState("");
  const [fifthValue, setFifthValue] = useState("");
  const [sixthValue, setSixthValue] = useState("");

  const [checkvalue, setCheckvalue] = useState(false);
  const [checkBackSpacevalue, setCheckBackSpacevalue] = useState(0);
  const [checkBackSpace, setCheckBackSpace] = useState(false);
  var numberRegex = /^\d+$/;
  useEffect(() => {
    setPassCodeImage(match.params.id);
    encryptMail = match.params.mail;
    setEncryptMail(match.params.mail);
    if (match.params.mail) {
      var CryptoJS = require("crypto-js");
      let decodesecretmail = decodeURIComponent(encryptMail);
      let decosesecrectkey = CryptoJS.AES.decrypt(decodesecretmail.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setDecryptMail(decosesecrectkey);


    }
    if (match.params.id) {
      decryptscretkey = match.params.id;
      setdecryptscretkey(decryptscretkey);
      var CryptoJS = require("crypto-js");
      let decodesecretid = decodeURIComponent(decryptscretkey);
      let decosesecrectkeyid = CryptoJS.AES.decrypt(decodesecretid.toString(), 'secret key 123').toString(CryptoJS.enc.Utf8);
      setPassCodeImage(decosesecrectkeyid);

    }
  }, []);
  const inputData = {
    pinNumber: []
  }

  let [inputFormdata, setInputFormdata] = useState(inputData);
  const [isPageLoaded, setPageLoaded] = useState(false);

  if (!isPageLoaded && !loginSecurityData.isLoading) {
    if (loginSecurityData.items !== null && loginSecurityData.items !== "") {

      if (loginSecurityData.items.message.code !== undefined && loginSecurityData.items.message.code === "MHC - 0200") {

        var loginData = JSON.parse(window.localStorage.getItem("LOGINDATA"));
        if (loginData.items.data.userType[0] === "Super Admin") {
          window.location.href = "/MettlerOrganizationList";
        }else  if (loginData.items.data.userType[0] === "Admin") {
          window.location.href = "/MettlerAllStaffDetailsList";
        }else if (loginData.items.data.userType[0] === "Staff") {
          window.location.href = "/MettlerQ15Reports";
        }  else {
         alert("Please Contact Admin Team");
        }
      } else {

        alert(loginSecurityData.items.message.description);

      }
      setPageLoaded(true);


    }
  }
  if (!loginSecurityData && loginSecurityData.isFormSubmit) {

    setTimeout(() => {
      setPageLoaded(false);

    }, (1000));
  }
  var CryptoJS = require("crypto-js");
  var passmailIdCryptoJS = CryptoJS.AES.encrypt(decryptMail, 'secret key 123');
  var setpasscryptMail = encodeURIComponent(passmailIdCryptoJS.toString());
  const [isPageVerifyOTPLoaded, setPageVerifyOTPLoaded] = useState(false);

  if (!isPageVerifyOTPLoaded && !verifyOTPData.isLoading) {
    if (verifyOTPData.items !== null && verifyOTPData.items !== "") {
      if (verifyOTPData.items.message.code !== undefined && verifyOTPData.items.message.code === "MHC - 0200") {

        window.location.href = '/MettlerSetPassword/' + setpasscryptMail;
      } else {
        alert(JSON.stringify(verifyOTPData.items.message.description));
      }
      setPageVerifyOTPLoaded(true);
      //   

    }
  }


  let maskPasswordTimeout;
  const passwordMaskDelay = 400;
  const maskPassword = () => {
    inputFormdata.pinNumber = inputFormdata.pinNumber.filter(x => x !== "").map(() => '•');
    setInputFormdata({ ...inputFormdata });

  };
  const handlePageSetChange = (textId, index) => {
    if (checkBackSpace) {

      if (index !== 7) {

        document.getElementById(index).focus();
        setCheckBackSpacevalue(1);
      }
      //  setCheckBackSpace(false);
    }

    setEnteredPassword(enteredPassword);

    setInputFormdata({ ...inputFormdata });
    setCheckvalue(false);

    clearTimeout(maskPasswordTimeout);
    maskPasswordTimeout = setTimeout(() => {
      maskPassword();
    }, passwordMaskDelay);

  }
  const numberOfDigits = 6;
  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && index === 0) {
      inputFormdata.pinNumber[index] = '';
      enteredPassword = "";
      setFirstValue("");
      setSecondValue("");
      setThirdValue("");
      setForthValue("");
      setFifthValue("");
      setSixthValue("");
      setInputFormdata({ ...inputFormdata });

    } else if (e.key === "Backspace" && index > 0) {

      setCheckvalue(true);
      setCheckBackSpace(true);
      setCheckBackSpacevalue(0);
      enteredPassword = enteredPassword.slice(0, -1);
      inputFormdata.pinNumber[index] = '';

      setIndexValue(index,"");

      setInputFormdata({ ...inputFormdata });
      if (index > 0) {
        document.getElementById(`pinNumber${index - 1}`).focus();
      }


      return;

    } else if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      document.getElementById(`pinNumber${index}`).focus();
      setCheckBackSpace(false);
    } else if (checkBackSpace) {
      if (numberRegex.test(e.key)) {
        inputFormdata.pinNumber[index] = e.key;
        setIndexValue(index,e.key);
        handlePageSetChange(`pinNumber${index}`, `pinNumber${index + 1}`);
      }

    }

  }

  function setIndexValue(index ,value){
    switch(index) {
      case 0:
    setFirstValue(value);
    break;
    case 1:
    setSecondValue(value);
    break;
    case 2:
    setThirdValue(value);
    break;
    case 3:
    setForthValue(value);
    break;
    case 4:
    setFifthValue(value);
    break;
    case 5:
    setSixthValue(value);
    break;
  }
  }
  const handleInputChange = (event: any) => {
    if (!checkBackSpace) {
      if (event.target.id === "pinNumber0") {
        if (!checkvalue) {
          enteredPassword = enteredPassword + event.target.value;
          inputFormdata.pinNumber[0] = Constants.numbersOnlyFormat(event.target.value);
          setFirstValue(inputFormdata.pinNumber[0]);
          if (inputFormdata.pinNumber[0] !== null && inputFormdata.pinNumber[0] !== "") {
            document.getElementById("pinNumber1").focus();
          }
        } else {
          document.getElementById("pinNumber0").focus();
        }
      } else if (event.target.id === "pinNumber1") {
        if (!checkvalue) {
          enteredPassword = enteredPassword + event.target.value;
          inputFormdata.pinNumber[1] = Constants.numbersOnlyFormat(event.target.value);
          setSecondValue(inputFormdata.pinNumber[1]);
          if (inputFormdata.pinNumber[1] !== null && inputFormdata.pinNumber[1] !== "") {
            document.getElementById("pinNumber2").focus();
          }
        } else {
          document.getElementById("pinNumber1").focus();
        }

      } else if (event.target.id === "pinNumber2") {
        if (!checkvalue) {
          enteredPassword = enteredPassword + event.target.value;
          inputFormdata.pinNumber[2] = Constants.numbersOnlyFormat(event.target.value);
          setThirdValue(inputFormdata.pinNumber[2]);
          if (inputFormdata.pinNumber[2] !== null && inputFormdata.pinNumber[2] !== "") {
            document.getElementById("pinNumber3").focus();
          }
        } else {
          document.getElementById("pinNumber2").focus();
        }
      } else if (event.target.id === "pinNumber3") {
        if (!checkvalue) {
          enteredPassword = enteredPassword + event.target.value;
          inputFormdata.pinNumber[3] = Constants.numbersOnlyFormat(event.target.value);
          setForthValue(inputFormdata.pinNumber[3]);
          if (inputFormdata.pinNumber[3] !== null && inputFormdata.pinNumber[3] !== "") {
            document.getElementById("pinNumber4").focus();
          }
        } else {
          document.getElementById("pinNumber3").focus();
        }
      } else if (event.target.id === "pinNumber4") {
        if (!checkvalue) {
          enteredPassword = enteredPassword + event.target.value;
          inputFormdata.pinNumber[4] = Constants.numbersOnlyFormat(event.target.value);
          setFifthValue(inputFormdata.pinNumber[4]);
          if (inputFormdata.pinNumber[4] !== null && inputFormdata.pinNumber[4] !== "") {
            document.getElementById("pinNumber5").focus();
          }
        } else {
          document.getElementById("pinNumber4").focus();
        }
      } else if (event.target.id === "pinNumber5") {
        enteredPassword = enteredPassword + event.target.value;
        inputFormdata.pinNumber[5] = Constants.numbersOnlyFormat(event.target.value);
        setSixthValue(inputFormdata.pinNumber[5]);
      }

      handlePageSetChange(event.target.id, 7);
    } else {
      if (checkBackSpacevalue === 1) {
        setCheckBackSpacevalue(0);
        setCheckBackSpace(false);
      }
    }

  };


  const handlePageChange = (event: any) => {

    if (passcodeImage === "1") {
      optData.email = decryptMail;
      if (inputFormdata.pinNumber.length === 6) {
        optData.otp = enteredPassword[0] + enteredPassword[1] + enteredPassword[2] + enteredPassword[3] + enteredPassword[4] + enteredPassword[5];
      }
      dispatch(verifyOtp(optData));


    } else if (passcodeImage === "2") {
      if (inputFormdata.pinNumber.length === 6) {
        //inputSecurityLoginData.secretKey = enteredPassword[0] + enteredPassword[1] + enteredPassword[2] + enteredPassword[3] + enteredPassword[4] + enteredPassword[5];
        inputSecurityLoginData.secretKey = firstValue + secondValue + thirdValue + fourthValue + fifthValue + sixthValue;
   
      }
      var intialLoginData = JSON.parse(window.localStorage.getItem("LOGINDATA"));


     // alert(inputSecurityLoginData.secretKey);
    //  alert(firstValue+","+secondValue+","+thirdValue+","+fourthValue+","+fifthValue+","+sixthValue);
     console.log(inputSecurityLoginData.secretKey);
     console.log(JSON.stringify(intialLoginData));
      if (intialLoginData !== null) {
        inputSecurityLoginData.jwt = intialLoginData.items.data.jwt.jwtToken;
        dispatch(loginSecurity(inputSecurityLoginData));
      } else {
        alert("Already Sign in Other Device");
        window.location.reload();
      }

    }

    console.log(JSON.stringify(inputFormdata));
  }

  const forgotPasscode = (event: any) => {
    var CryptoJS = require("crypto-js");
    var loginUserIdCryptoJS = CryptoJS.AES.encrypt("passcode", 'secret key 123');
    var loginUserIdEnc = encodeURIComponent(loginUserIdCryptoJS.toString());
    window.location.href = "/MettlerForgotPassword/" + loginUserIdEnc;
  }

  return (
    <div className="p-grid passcode-section" style={{ background: '#fff' }}>
      <div id="newRemovePadding" className="p-col-12 p-md-7" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', marginLeft: '-6px', height: '101%' }}>
        {(
          passcodeImage === "1" &&
          <img src={passcodeImage2} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Passcode Image"></img>
        )}
        {(passcodeImage === "2" &&
          <img src={passcodeImage1} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Passcode Image"></img>
        )}
      </div>
      <div className="p-col-12 p-md-1" id="removePadding"></div>
      <div className="p-col-12 p-md-3 passcode-secondPage" id="removePadding">
        <div>{passcodeImage === "2" ? <span style={{ display: 'block' }} className="passCodeText">Enter you Passcode</span> : <span className="passCodeText1">Please enter your OTP to Reset Password</span>}</div>
        <div className="passwordText">
          <input id="pinNumber0" className="passwordText1" name="pinNumber" autoFocus value={inputFormdata.pinNumber[0]} onKeyDown={(e) => handleBackspaceAndEnter(e, 0)} required onChange={handleInputChange} maxLength={1} />
          <input id="pinNumber1" className="passwordText2" name="pinNumber" value={inputFormdata.pinNumber[1]} onKeyDown={(e) => handleBackspaceAndEnter(e, 1)} required onChange={handleInputChange} maxLength={1} />
          <input id="pinNumber2" className="passwordText3" name="pinNumber" value={inputFormdata.pinNumber[2]} onKeyDown={(e) => handleBackspaceAndEnter(e, 2)} required onChange={handleInputChange} maxLength={1} />
          <input id="pinNumber3" className="passwordText4" name="pinNumber" value={inputFormdata.pinNumber[3]} onKeyDown={(e) => handleBackspaceAndEnter(e, 3)} required onChange={handleInputChange} maxLength={1} />
          <input id="pinNumber4" className="passwordText5" name="pinNumber" value={inputFormdata.pinNumber[4]} onKeyDown={(e) => handleBackspaceAndEnter(e, 4)} required onChange={handleInputChange} maxLength={1} />
          <input id="pinNumber5" className="passwordText6" name="pinNumber" value={inputFormdata.pinNumber[5]} onKeyDown={(e) => handleBackspaceAndEnter(e, 5)} required onChange={handleInputChange} maxLength={1} />
        </div>
        <div className="buttonPasscode">
          <Button style={{ width: '321px', position: 'relative', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '16px', height: '48px', backgroundColor: '#1F489F' }} onClick={handlePageChange} label="Submit"></Button>
        </div>
        {(
          passcodeImage === "1" && <></>)}
        {(
          passcodeImage === "2" &&
          <a onClick={forgotPasscode} style={{ cursor: 'pointer' }}><div className="forgotPassCode">Forgot Passcode?</div></a>
        )}
      </div>
      <div id="newRemovePadding" className="p-col-12 p-md-1"></div>
    </div>
  );


};
const mapStateToProps = (state: any) => {
  const { loginSecurityData, verifyOTPData } = state;
  return {
    loginSecurityData, verifyOTPData
  };
};
export default connect(mapStateToProps)(SecretKey);