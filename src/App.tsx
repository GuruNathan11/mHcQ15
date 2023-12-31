import React, { Component, ReactNode } from "react";
import classNames from "classnames";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
//import { MenuItem } from "primereact/components/menuitem/MenuItem";
import { BreadCrumb } from 'primereact/breadcrumb';
import { createBrowserHistory } from "history";
import rectangular from './assets/images/mettler_images/Rectangle_light.svg';
import plusImage from '../src/assets/images/mettler_images/plusImage.png'
import fileDocument from '../src/assets/images/mettler_images/file-document_dark.svg';
import userEdit from '../src/assets/images/mettler_images/usersImage_dark.svg';
import setting from '../src/assets/images/mettler_images/settingImage_dark.svg';
import dashboard from '../src/assets/images/mettler_images/RiDashboardLine.svg';
import mettlerTitle from '../src/assets/images/mettler_images/MettlerTitle_dark.svg';
import menuExpand from '../src/assets/images/mettler_images/menu_expand.svg';
import duplicate from '../src/assets/images/mettler_images/duplicate.svg';
import groupImage from '../src/assets/images/mettler_images/group.svg';
import organizationImage from '../src/assets/images/mettler_images/organizationImage.png';
import patientStaffImage from '../src/assets/images/mettler_images/patientStaffImage.svg';
import patientBedImage from '../src/assets/images/mettler_images/patientBedAssignImage.svg';
import Groupss from "../src/assets/images/mettler_images/Groupss.png";
import fileAdd from '../src/assets/images/mettler_images/file-add.svg';
import documentreporticon from '../src/assets/images/mettler_images/documentreporticon.svg';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import MenuItem from '@mui/material/MenuItem';
// Be sure to include styles at some point, probably during your bootstraping 
import "primereact/resources/themes/nova-light/theme.css";
//import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { AppnewMenu } from "./Appnewmenu";
import { getCurrentUser } from "../src/store/selectors/Accounts";
import { AppTopbar } from "./AppTopbar";
import { AppMenu } from "./AppMenu";
import "./layout/layout.css";
import "./App.css";
import * as Constants from "../src/containers/pages/Constants/ConstantValues";
import StaffDetails from "./containers/pages/Staff/StaffInfo";

import {
  LoginPage, ForgotPasswordPage,
  PasscodePage,
  OtpEnterValidPage, SetPassword, AdminDashboardPage,
  StaffInfoPage, OrganizationDetailsPage,
  AllStaffDetailsPage,
  AddOrganizationPage,
  Q15Reports,
  Q15ReportsViews, AllOrganizationList
} from "./containers/pages";
import { HttpLogin } from "./utils/Http";
import MenuItem from "@mui/material/MenuItem";
import { Dialog, DialogContentText } from "@mui/material";
import { PatientStaffConfiguration } from "./containers/pages/Q15/PatientStaff/PatientStaffConfiguration";

interface IAppProps {
}
interface IAppState {
  timeout: number,
  showModal: boolean,
  userLoggedIn: boolean,
  isTimedOut: boolean,
  isloading: boolean,
  staticMenuInactive: boolean,
  overlayMenuActive: boolean,
  mobileMenuActive: boolean,
  isLogged: boolean,
  inActive: boolean,
  iconmenuActive: boolean,
  layoutMode: string,
  layoutColorMode: string,
  UserDisplayName: string,
  userType: string,
  searchTerm: string,
  openDialog: boolean,
  role: [],
  rolebyid: [],
  rolepermission: [],
  roleid: string,
  isSkipHeader: boolean,
  Aaroles: string;
  preiass: boolean,
  value: string,
  getPatientDataItems: any,
  selectedPatientId: string,
  newTreatmentPlan: any,
  newFormName: any,
  encryptPatientid: string,
  encryptVisitid: string,
}
interface timelineDetails {
  label: string
}
interface Props extends RouteComponentProps { }
class App extends Component<Props, IAppState> {
  private menuClick: boolean = false;
  private layoutMenuScroller!: ScrollPanel | null;
  private menu!: Array<null>;
  private breadcrumDetails: timelineDetails[] = [

  ];

  private home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact/showcase' }
  history = createBrowserHistory();

  public idleTimer;
  handleSelectChange: (event: SelectChangeEvent<"">, child: ReactNode) => void;
  public constructor(props: any) {
    super(props);
    this.state = {
      isLogged: false,
      timeout: 1000 * 20 * 60,
      showModal: false,
      userLoggedIn: false,
      isloading: true,
      isTimedOut: false,
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      iconmenuActive: true,
      userType: "",
      layoutMode: "static",
      layoutColorMode: "dark",
      role: [],
      UserDisplayName: "",
      inActive: false,
      rolepermission: [],
      rolebyid: [],
      isSkipHeader: false,
      Aaroles: "",
      roleid: "",
      openDialog: false,
      preiass: false,
      value: "",
      getPatientDataItems: null,
      selectedPatientId: '',
      newTreatmentPlan: null,
      newFormName: null,
      searchTerm: '',
      encryptPatientid: '',
      encryptVisitid: ''
    }

    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onSidebarClicked = this.onSidebarClicked.bind(this);
    //this.onMenuItemClick = this.onMenuItemClick.bind(this);
    // this.componentWillMount();  

    // window.addEventListener('beforeunload', this.listener);



    this.idleTimer = null;
    this.handleTreatmentChange = this.handleTreatmentChange.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this._onAction = this._onAction.bind(this)
    this._onActive = this._onActive.bind(this)
    this._onIdle = this._onIdle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this._onpush = this._onpush.bind(this)
    this._onnopush = this._onnopush.bind(this)
  }

  _onAction() {

    this.setState({ isTimedOut: false })
  }
  _onActions() {

    this.setState({ preiass: false })
  }
  _onpush() {

    this.setState({ iconmenuActive: true })
  }
  _onnopush() {

    this.setState({ iconmenuActive: false })
  }
  _onActive() {

    this.setState({ isTimedOut: false })
  }
  onSidebarClicked(event: React.MouseEvent) {
    this.menuClick = true;

    setTimeout(() => {
      if (this.layoutMenuScroller) {

        (this.layoutMenuScroller as any)["moveBar"]();

      }
    }, 500);
  }
  _onIdle() {

    const isTimedOut = this.state.isTimedOut
    var currentUser = getCurrentUser();

    if (currentUser !== null && currentUser !== "") {
      if (isTimedOut) {

      } else {
        this.setState({ showModal: true })
        this.idleTimer.reset();
        this.setState({ isTimedOut: true })
      }
    }

  }
  handleClose() {
    this.setState({ showModal: false })
  }


  /*
    listener(e: BeforeUnloadEvent) {
  
      e.preventDefault();
  
      return "Test";
    }*/

  handleLogout() {
    this.setState({ showModal: false })

    window.localStorage.setItem("AUTHDATA", "");
    window.location.href = "/";
  }

  // createReportUserMenu() {
  //   this.menu = [
  //     {
  //       label: "Reports",
  //       icon: "pi pi-fw pi-file",
  //       items: [
  //         {
  //           label: "Reports",
  //           icon: "pi pi-fw pi-file",
  //           command: () => {
  //  this.props.history.push("/reports");
  //           }
  //         }
  //       ]
  //     }
  //   ];
  // }

  createnewUserMenu() {
    var o = {};
    var program = new Array<any>();


    program = [
      //   {
      //   id: 2,
      //   label: "Add Forms",
      //   position: 22,
      //   icon: "userManage",
      //   parentId: 0,
      //   command: () => {
      //   window.location.href = "/mettlerViewForm"
      //   }
      // },
      {
        id: 3,
        label: "Forms",
        position: 23,
        icon: "userEdit",
        parentId: 0,
        command: () => {
          window.location.href = "/mettlerViewForm"
        }
      },
      {
        id: 4,
        label: "Q15 Safety Check",
        position: 23,
        icon: "q15checkicon",
        parentId: 0,
        command: () => {
          window.location.href = "/MettlerAdminScheduleChanges"
        }
      }
      // ,{
      //   id: 4,
      //   label: "View Form",
      //   position: 24,
      //   icon: "reports",
      //   parentId: 0,
      //   command: () => {
      //     window.location.href = "/mettlerViewFields"
      //   }
      // }
    ];


    var tree = function (program, root) {

      program.forEach(function (a) {
        a.items = o[a.id] && o[a.id].items;
        o[a.id] = a;
        o[a.parentId] = o[a.parentId] || {};
        o[a.parentId].items = o[a.parentId].items || [];
        o[a.parentId].items.push(a);
      });
      return o[root].items;
    }(program, '0');
    this.menu = tree;


  }
  componentWillMount() {
    var currentUser = getCurrentUser();

    if (currentUser !== null) {
      if (currentUser.userProfile !== null) {
        //     this.setState({ UserDisplayName: (currentUser.userProfile[0].first_name + " " + currentUser.userProfile[0].last_name) });
      }
    }
    const loggedInString = localStorage.getItem("LOGINDATA");
    // const loggedInString=JSON.stringify(JSON.parse(window.localStorage.getItem("LOGINDATA")))

    if (loggedInString) {

      const loggedInData = JSON.parse(loggedInString);
      if (loggedInData !== null) {
        this.setState({ isLogged: loggedInData.loggedStatus === true });
        this.setState({ userType: loggedInData.items.data.userType[0] });
        HttpLogin.axios().get("/api/patient/get_all")
          .then((res) => {
            if (res.data.message.code === "MHC - 0200") {

              //this.setState({ getPatientDataItems: res.data.data.filter(k => k.organization === loggedInData.items.data.userDetail.organization) });
              HttpLogin.axios().get("/api/forms/get")
                .then((resp) => {
                  if (resp.data.message.code === "MHC - 0200") {
                    // console.log(JSON.stringify(loggedInData));
                    // console.log(JSON.stringify(resp.data.data.filter(t => t.name !== "" && t.organization === loggedInData.loginInput.organization)));
                    this.setState({ newFormName: resp.data.data.filter(t => t.name !== "" && t.organization === loggedInData.loginInput.organization) })
                  } else {
                    this.setState({ newFormName: [] });
                  }
                })
            }
          })

      } else {
        this.setState({ isLogged: false });
      }

      this.createnewUserMenu();
      this.setState({ Aaroles: "EmployerAdmin" });
      this.setState({ isloading: false });
      if (window.location.href.includes("Email")) {
        window.location.href = "/vCareDashboard";
      }
    } else {
      this.setState({ isLogged: false });
    }
  }

  onWrapperClick(event: React.MouseEvent) {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false
      });
    }

    this.menuClick = false;
  }

  handleTreatmentChange(name) {
    var CryptoJS = require("crypto-js");
    var encryptId = CryptoJS.AES.encrypt(name, 'secret key 123');
    var setEncryptId = encodeURIComponent(encryptId.toString());
    // console.log(JSON.stringify(setEncryptId));        
    // window.location.href = "/MettlerAIMS" + "/" + this.state.encryptPatientid + "/" + setEncryptId + "/" + this.state.encryptVisitid;
  }

  onToggleMenu(event: React.MouseEvent) {
    this.menuClick = true;

    if (this.isDesktop()) {
      if (this.state.layoutMode === "overlay") {
        this.setState({
          overlayMenuActive: !this.state.overlayMenuActive
        });
      } else if (this.state.layoutMode === "static") {
        this.setState({
          staticMenuInactive: !this.state.staticMenuInactive
        });
      }
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive
      });
    }

    event.preventDefault();
  }

  isDesktop(): boolean {
    return window.innerWidth > 1024;
  }

  onSidebarClick(event: React.MouseEvent) {
    this.menuClick = true;

    setTimeout(() => {
      if (this.layoutMenuScroller) {

        (this.layoutMenuScroller as any)["moveBar"]();

      }
    }, 500);
  }

  handleOpenDialog() {

    this.setState({
      openDialog: true
    });


  }
  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
    this.setState({ selectedPatientId: "" });
  }
  usersEdit() {
    window.location.href = "/MettlerPatientDetails";
  }

  adminPage() {
    window.location.href = "/MettlerAdminDashboard";
  }

  // onMenuItemClick(event: { originalEvent: Event; item: MenuItem }) {


  // }
  handleTabClose = event => {
    alert(event.type);
    // event.preventDefault();
    alert("beforeunload event triggered");
    // console.log('beforeunload event triggered');

    // return (event.returnValue = 'Are you sure you want to exit?');
  };
  public render() {

    window.addEventListener('beforeunload', this.handleTabClose);
    let wrapperClass = classNames("layout-wrapper", {
      "layout-overlay": this.state.layoutMode === "overlay",
      "layout-static": this.state.layoutMode === "static",
      "layout-static-sidebar-inactive":
        this.state.staticMenuInactive && this.state.layoutMode === "static",
      "layout-overlay-sidebar-active":
        this.state.overlayMenuActive && this.state.layoutMode === "overlay",
      "layout-mobile-sidebar-active": this.state.mobileMenuActive
    });

    let sidebarClassName = this.state.inActive ? classNames("layout-sidebar", {
      "layout-sidebar-dark inactive": this.state.layoutColorMode === "dark"
    }) : classNames("layout-sidebar", {
      "layout-sidebar-dark": this.state.layoutColorMode === "dark"
    });

    if ((window.location.pathname === '/MettlerPasscodePage/' || window.location.pathname === '/MettlerPasscodePage/' || window.location.pathname.includes('/MettlerPasscodePage/')) && !this.state.isSkipHeader) {
      this.setState({ isSkipHeader: true });

    }

    if ((window.location.pathname === '/Login' || window.location.pathname === '/Login' || window.location.pathname.includes('/Login')) && !this.state.isSkipHeader) {
      this.setState({ isSkipHeader: true });

    }

    if ((window.location.pathname === '/MettlerForgotPassword' || window.location.pathname === '/MettlerForgotPassword' || window.location.pathname.includes('/MettlerForgotPassword')) && !this.state.isSkipHeader) {
      this.setState({ isSkipHeader: true });

    }

    if ((window.location.pathname === '/MettlerOtpEnter' || window.location.pathname === '/MettlerOtpEnter' || window.location.pathname.includes('/MettlerOtpEnter')) && !this.state.isSkipHeader) {
      this.setState({ isSkipHeader: true });

    }
    if ((window.location.pathname === '/MettlerSetPassword' || window.location.pathname === '/MettlerSetPassword' || window.location.pathname.includes('/MettlerSetPassword')) && !this.state.isSkipHeader) {
      this.setState({ isSkipHeader: true });

    }

    // if ((window.location.pathname === '/mettlerViewForm' || window.location.pathname === '/mettlerViewForm' || window.location.pathname.includes('/mettlerViewForm')) && !this.state.isSkipHeader) {
    //   this.setState({ isSkipHeader: true });

    // }

    // if ((window.location.pathname === '/mettlerAddFields' || window.location.pathname === '/mettlerAddFields' || window.location.pathname.includes('/mettlerAddFields')) && !this.state.isSkipHeader) {
    //   this.setState({ isSkipHeader: true });

    // }

    // if ((window.location.pathname === '/mettlerViewFields' || window.location.pathname === '/mettlerViewFields' || window.location.pathname.includes('/mettlerViewFields')) && !this.state.isSkipHeader) {
    //   this.setState({ isSkipHeader: true });

    // }

    // if ((window.location.pathname === '/MettlerCreateNewForm' || window.location.pathname === '/MettlerCreateNewForm' || window.location.pathname.includes('/MettlerCreateNewForm')) && !this.state.isSkipHeader) {
    //   this.setState({ isSkipHeader: true });

    // }



    if ((window.location.pathname === '/FormDynamicPage' || window.location.pathname === '/FormDynamicPage' || window.location.pathname.includes('/FormDynamicPage')) && !this.state.isSkipHeader) {
      this.setState({ isSkipHeader: true });

    }

    if ((window.location.pathname === '/MettlerAddOrganization' || window.location.pathname === '/MettlerAddOrganization' || window.location.pathname.includes('/MettlerAddOrganization')) && !this.state.isSkipHeader) {
      this.setState({ isSkipHeader: true });

    }
    function setSelectedPatientId(selectedPatientId: any) {
      throw new Error("Function not implemented.");
    }

    function setTableNewData(arg0: any) {
      throw new Error("Function not implemented.");
    }

    this.handleSelectChange = (event) => {
      // Update the selected value in the state
      this.setState({ selectedPatientId: event.target.value });
    };


    return (
      <React.Fragment>

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAzmb-yIUociOEymczq8w0Tf_YeRCrj7Y&callback=init"
          async defer></script>

        <Switch>
          {this.state.isSkipHeader && (
            <><div className="layout-main">
              <Route path="/" exact={true} component={LoginPage} />
              <Route path="/Login" exact={true} component={LoginPage} />
              <Route path="/MettlerPasscodePage" exact={true} component={PasscodePage} />
              <Route path="/MettlerPasscodePage/:id" exact={true} component={PasscodePage} />
              <Route path="/MettlerPasscodePage/:id/:mail" exact={true} component={PasscodePage} />
              <Route path="/MettlerForgotPassword" exact={true} component={ForgotPasswordPage} />
              <Route path="/MettlerForgotPassword/:hint" exact={true} component={ForgotPasswordPage} />
              <Route path="/MettlerOtpEnter" exact={true} component={OtpEnterValidPage} />
              <Route path="/MettlerOtpEnter/:hint" exact={true} component={OtpEnterValidPage} />
              <Route path="/MettlerOtpEnter/:hint/:mail" exact={true} component={OtpEnterValidPage} />
              <Route path="/MettlerSetPassword" exact={true} component={SetPassword} />
              <Route path="/MettlerSetPassword/:mail" exact={true} component={SetPassword} />
              <Route path="/MettlerSetPassword/:userName" exact={true} component={SetPassword} />
              <Route path="/MettlerAddOrganization" exact={true} component={AddOrganizationPage} />

            </div>
            </>
          )}

          {!this.state.isLogged && (

            <div className="layout-main">
              <Route path="/" exact={true} component={LoginPage} />
            </div>
          )}
          {this.state.isLogged && (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
              {!this.state.iconmenuActive && (
                <AppTopbar onToggleMenu={this.onToggleMenu} />
              )}
              {this.state.iconmenuActive && !window.location.pathname.includes("/MettlerPatientInfo") && (
                <AppTopbar onToggleMenu={this.onToggleMenu} />
              )}
              {this.state.iconmenuActive && (
                this.state.inActive ?
                  <div className={sidebarClassName} onClick={this.onSidebarClick} style={{ width: '330px', height: '-webkit-fill-available' }}>

                    <div className="layout-sidebar-scroll-content">
                      <div className="layout-logo">


                        <div className="layout-profile"></div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ alignItems: 'center', gap: '25px', marginTop: '-22px' }} className="menu">
                            <img style={{ height: '18.642px', width: "160px", position: "relative", left: '-28px', top: '18px' }} alt="" src={mettlerTitle} />
                            <a style={{ cursor: 'pointer' }} onClick={() => this.setState({ inActive: false })}><img style={{ height: '14.064px', width: "30px", position: "relative", left: '39px', top: '18px' }} alt="" src={menuExpand} /></a>
                            {this.state.userType === "Super Admin" &&
                              <><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerAddOrganization" }}>
                                <div style={{ position: "relative", left: '-54px', top: '63px' }} className="App-create-patient">
                                  <div style={{ width: '24px', height: '24px', fontSize: '15px', fontWeight: 'bold' }}>|</div>
                                  <div ><span style={{ position: "relative", left: '-36px', top: '-1.5px', fontSize: '15px' }}>-</span><span style={{ position: "relative", left: '-37px', top: '-1.5px', fontSize: '15px' }}>-</span><span style={{ position: "relative", left: '-38px', top: '-1.5px', fontSize: '15px' }}>-</span><span style={{ position: "relative", left: '-39px', top: '-1.5px', fontSize: '15px' }}>-</span></div>
                                  <div style={{ position: 'absolute', left: '44px' }} className="App-CreatePatient-font">Create New</div>
                                </div></a>
                                <div style={{ display: 'flex', position: 'relative', left: '20.5px', top: '90px' }}><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerOrganizationList" }}><img style={{ height: '20px', width: "20px" }} alt="" src={organizationImage} /><span style={{ position: 'relative', left: '18px', top: '1px' }} className="App-inline-text">Organization Details</span></a></div>

                              </>
                            }
                            {this.state.userType === "Admin" &&
                              <>

                                <div style={{ display: 'flex', position: 'relative', left: '20.5px', top: '90px' }}><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerOrganizationDetails" }}><img style={{ height: '20px', width: "20px" }} alt="" src={dashboard} /><span style={{ position: 'relative', left: '18px', top: '1px' }} className="App-inline-text">Organization Info</span></a></div>
                                <div style={{ display: 'flex', position: 'relative', left: '20.5px', top: '110px' }}><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerAllStaffDetailsList" }}><img style={{ height: '20px', width: "20px" }} alt="" src={groupImage} /><span style={{ position: 'relative', left: '18px', top: '1px' }} className="App-inline-text">Staff Details</span></a></div>
                              </>
                            }
                            {this.state.userType === "Staff" &&
                              <>

                                <div style={{ display: 'flex', position: 'relative', left: '20.5px', top: '70px' }}><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerStaffInfoPage" }}><img style={{ height: '20px', width: "20px" }} alt="" src={dashboard} /><span style={{ position: 'relative', left: '18px', top: '2px' }} className="App-inline-text">Staff Info</span></a></div>
                                <div style={{ display: 'flex', position: 'relative', left: '20.5px', top: '90px' }}><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerOrganizationDetails" }}><img style={{ height: '20px', width: "20px" }} alt="" src={organizationImage} /><span style={{ position: 'relative', left: '18px', top: '1px' }} className="App-inline-text">Organization Info</span></a></div>
                                <div style={{ display: 'flex', position: 'relative', left: '20.5px', top: this.state.newTreatmentPlan !== null && this.state.newTreatmentPlan.length > 0 ? `${220 + (this.state.newTreatmentPlan.length * 20)}px` : "210px" }}><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerQ15Reports" }}><img style={{ height: '20px', width: "20px" }} alt="" src={documentreporticon} /><span style={{ position: 'relative', left: '18px', top: '1px' }} className="App-inline-text">Q15 Reports</span></a></div>
                              </>
                            }
                            <Dialog maxWidth={'md'} PaperProps={{ sx: { overflow: 'hidden', height: '100%', width: '250px', position: 'absolute', left: '150px', maxHeight: '100%' } }}
                              open={this.state.openDialog}
                              onClose={this.handleCloseDialog}
                            >
                              <DialogContentText >

                                {this.state.newFormName !== null && this.state.newFormName.length > 0 &&
                                  this.state.newFormName
                                    .filter(col => {
                                      return this.state.newTreatmentPlan !== null && this.state.newTreatmentPlan !== undefined && this.state.newTreatmentPlan.length > 0 ? !this.state.newTreatmentPlan.find(selected => col === selected) : col
                                    })
                                    .map((name, index) => (
                                      <a
                                        key={index}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          // console.log(JSON.stringify(name));    
                                          var CryptoJS = require("crypto-js");
                                          var encryptId = CryptoJS.AES.encrypt(name.name, 'secret key 123');
                                          var setEncryptId = encodeURIComponent(encryptId.toString());
                                          // console.log(JSON.stringify(setEncryptId));       
                                          window.location.href = "/MettlerAIMS" + "/" + setEncryptId
                                        }
                                        }
                                      >
                                        <div
                                          id="hover"
                                          key={index}
                                          style={{
                                            padding: "8px", // Optional padding for each item
                                            borderBottom: "1px solid #ccc", // Optional border between items
                                          }}
                                        >
                                          <img
                                            src={Groupss}
                                            style={{
                                              fontWeight: "bolder",
                                              color: "#000000",
                                              fontSize: "35px",
                                              marginRight: "8px", // Optional margin between icon and text
                                            }}
                                          ></img>
                                          <span style={{ fontSize: "17px" }}>{(name.name)}</span>
                                        </div>
                                      </a>
                                    ))}

                              </DialogContentText></Dialog>
                            {this.state.userType === "Patient" &&
                              <>
                                <div style={{ display: 'flex', position: 'relative', left: '20.5px', top: '70px' }}><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerPatientInfo" }}><img style={{ height: '20px', width: "20px" }} alt="" src={dashboard} /><span style={{ position: 'relative', left: '18px', top: '1px' }} className="App-inline-text">Patient Dashboard</span></a></div>
                                <div style={{ display: 'flex', position: 'relative', left: '20.5px', top: '90px' }}><a style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerCreatePatient" }}><img style={{ height: '24px', width: "20px" }} alt="" src={groupImage} /><span style={{ position: 'relative', left: '18px', top: '-2px' }} className="App-inline-text">Patient Info</span></a></div>
                              </>}

                          </div>

                        </div>



                      </div>
                    </div>

                  </div>
                  : <div className={sidebarClassName} onClick={this.onSidebarClick} style={{ width: "60px", height: '-webkit-fill-available', marginTop: window.location.pathname === "/MettlerPatientDetails/:patientId" ? "60px" : "0px" }}>

                    <div className="layout-sidebar-scroll-content">
                      <div className="layout-logo">


                        <div className="layout-profile"></div>

                        <div>
                          <div>
                            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '25px', marginTop: '-22px', position: 'relative', top: '-7px' }} className="menu">

                              <a style={{ cursor: 'pointer' }} onClick={() => this.setState({ inActive: true })}><img style={{ height: '30px', width: '59px', marginTop: '8px' }} src={rectangular}></img></a>
                              {this.state.userType === "Super Admin" &&
                                <>
                                  <a className="dashbordHover" onClick={() => { window.location.href = "/MettlerAddOrganization" }}><img style={{ height: '36px', width: "38px" }} alt="" src={plusImage} /></a>
                                  <a className="dashbordHover" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerOrganizationList" }}><img style={{ height: '20px', width: "20px" }} alt="" src={organizationImage} /><span className="dashbord">Organization Details</span></a>
                                  <a className="dashbordHover" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/patient-staff-configuration" }}><img style={{ height: '20px', width: "20px" }} alt="" src={organizationImage} /><span className="dashbord">Q15 Patient Staff Configuration</span></a>

                                </>}
                              {this.state.userType === "Admin" &&
                                <>

                                  <a className="dashbordHover" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerOrganizationDetails" }}><img style={{ height: '20px', width: "20px" }} alt="" src={dashboard} /><span className="dashbord">Organization Info</span></a>
                                  <a className="dashbordHover" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerAllStaffDetailsList" }}><img style={{ height: '20px', width: "20px" }} alt="" src={groupImage} /><span className="dashbord">Staff Details</span></a>
                                </>}
                              {this.state.userType === "Staff" &&
                                <>
                                  <a className="dashbordHover" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerStaffInfoPage" }}><img style={{ height: '20px', width: "20px" }} alt="" src={dashboard} /><span className="dashbord">Staff Info</span></a>
                                  <a className="dashbordHover" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerOrganizationDetails" }}><img style={{ height: '20px', width: "20px" }} alt="" src={organizationImage} /><span className="dashbord">Organization Info</span></a>
                                  <a className="dashbordHover" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = "/MettlerQ15Reports" }}>   <img style={{ height: '20px', width: "20px" }} alt="" src={documentreporticon} /><span className="dashbord">Q15 Reports</span></a>
                                </>}


                            </div>

                          </div>

                        </div>



                      </div>
                    </div>

                  </div>)
              }

              {!this.state.iconmenuActive && (
                <div className="layout-main PatientData">

                  {this.breadcrumDetails.length > 0 && <BreadCrumb model={this.breadcrumDetails} home={this.home} />}



                  <Route path="/MettlerAdminDashboard" exact={true} component={AdminDashboardPage} />
                  <Route path="/MettlerOrganizationDetails" exact={true} component={OrganizationDetailsPage} />
                  <Route path="/MettlerOrganizationDetails/:id" exact={true} component={OrganizationDetailsPage} />
                  <Route path="/MettlerStaffInfoPage" exact={true} component={StaffInfoPage} />
                  <Route path="/MettlerStaffInfoPage/:staffId" exact={true} component={StaffInfoPage} />
                  <Route path="/MettlerAllStaffDetailsList" exact={true} component={AllStaffDetailsPage} />

                  <Route path="/MettlerQ15Reports" exact={true} component={Q15Reports} />
                  <Route path="/MettlerQ15ReportsViews" exact={true} component={Q15ReportsViews} />
                  <Route path="/MettlerOrganizationList" exact={true} component={AllOrganizationList} />
                </div>

              )}
              {this.state.iconmenuActive && (
                <div className="layout-main PatientData" style={{ marginLeft: '60px', background: window.location.pathname === "/MettlerPatientDetails" ? "#F2F4F9" : '#fff' }}>

                  <Route path="/MettlerAdminDashboard" exact={true} component={AdminDashboardPage} />
                  <Route path="/MettlerOrganizationDetails" exact={true} component={OrganizationDetailsPage} />
                  <Route path="/MettlerOrganizationDetails/:id" exact={true} component={OrganizationDetailsPage} />
                  <Route path="/MettlerStaffInfoPage" exact={true} component={StaffInfoPage} />
                  <Route path="/MettlerStaffInfoPage/:staffId" exact={true} component={StaffInfoPage} />
                  <Route path="/MettlerAllStaffDetailsList" exact={true} component={AllStaffDetailsPage} />
                  <Route path="/MettlerQ15Reports" exact={true} component={Q15Reports} />
                  <Route path="/MettlerQ15ReportsViews" exact={true} component={Q15ReportsViews} />
                  <Route path="/MettlerOrganizationList" exact={true} component={AllOrganizationList} />
                  <Route path="/patient-staff-configuration"  component={PatientStaffConfiguration} />

                </div>
              )}

            </div>


          )}

        </Switch>

      </React.Fragment >
    );
  }
}
const ChildApp = withRouter(App as any);
export default ChildApp;
function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
