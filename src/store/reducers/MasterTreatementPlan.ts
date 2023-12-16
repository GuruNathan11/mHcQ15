import { CREATE_MTP_COMPLETED,CREATE_MTP_FAILED , UPDATE_MTP_COMPLETED,UPDATE_MTP_STARTED,
    UPDATE_MTP_FAILED, GETBYID_MTP_COMPLETED ,GETBYID_MTP_FAILED,GETBYID_MTP_STARTED,
    GETBYVISITID_MTP_STARTED, GETBYVISITID_MTP_COMPLETED,GETBYVISITID_MTP_FAILED,GETBYPATIENTID_MTP_COMPLETED,
    GETBYPATIENTID_MTP_FAILED,GETBYPATIENTID_MTP_STARTED, GETALL_MTP_COMPLETED,GETALL_MTP_FAILED, CREATE_MTP_STARTED,GETALL_MTP_STARTED
   } from '../actions/MasterTreatementPlan';

   const intialData= {
    status: {
        statusCode: 300,
        statusDisplay: "",
        statusValue: true
    },
    items: [],
    userInput: {       
        insert_datetime:"",
        inserted_by:"",
        update_datetime:"",
        updated_by:""
    
    },
    isLoading: true,
    isFormSubmit: false,
    isLoggedIn: false,
    error: ''
};

export const mtpSaveData = (state = intialData, action: any) => {

    switch (action.type) {
      case CREATE_MTP_STARTED:           
      return {
        ...state,
        items:[],
        isLoading: true,
      };
    case CREATE_MTP_COMPLETED:
        return {
        ...state,
        isLoading: false,
        status: action.status,
        items: action.payload
      };
    case CREATE_MTP_FAILED:
      return {
        ...state,
        isLoading: true,
      };
      
      default:
          return state;
      }
      
  }

  export const mtpUpdateData = (state = intialData, action: any) => {

    switch (action.type) {
      case UPDATE_MTP_STARTED:           
      return {
        ...state,
        items:[],
        isLoading: true,
      };
    case UPDATE_MTP_COMPLETED:
        return {
        ...state,
        isLoading: false,
        status: action.status,
        items: action.payload
      };
    case UPDATE_MTP_FAILED:
      return {
        ...state,
        isLoading: true,
      };
      
      default:
          return state;
      }
      
  }

  
  export const mtpGetByIdData = (state = intialData, action: any) => {

    switch (action.type) {
      case GETBYID_MTP_STARTED:           
      return {
        ...state,
        items:[],
        isLoading: true,
      };
    case GETBYID_MTP_COMPLETED:
        return {
        ...state,
        isLoading: false,
        status: action.status,
        items: action.payload
      };
    case GETBYID_MTP_FAILED:
      return {
        ...state,
        isLoading: true,
      };
      
      default:
          return state;
      }
      
  }

  
  export const mtpGetByVisitIdData = (state = intialData, action: any) => {

    switch (action.type) {
      case GETBYVISITID_MTP_STARTED:           
      return {
        ...state,
        items:[],
        isLoading: true,
      };
    case GETBYVISITID_MTP_COMPLETED:
        return {
        ...state,
        isLoading: false,
        status: action.status,
        items: action.payload
      };
    case GETBYVISITID_MTP_FAILED:
      return {
        ...state,
        isLoading: true,
      };
      
      default:
          return state;
      }
      
  }

  
  export const mtpGetByPatientIdData = (state = intialData, action: any) => {

    switch (action.type) {
      case GETBYPATIENTID_MTP_STARTED:           
      return {
        ...state,
        items:[],
        isLoading: true,
      };
    case GETBYPATIENTID_MTP_COMPLETED:
        return {
        ...state,
        isLoading: false,
        status: action.status,
        items: action.payload
      };
    case GETBYPATIENTID_MTP_FAILED:
      return {
        ...state,
        isLoading: true,
      };
      
      default:
          return state;
      }
      
  }

  export const mtpGetAllData = (state = intialData, action: any) => {

    switch (action.type) {
      case GETALL_MTP_STARTED:           
      return {
        ...state,
        items:[],
        isLoading: true,
      };
    case GETALL_MTP_COMPLETED:
        return {
        ...state,
        isLoading: false,
        status: action.status,
        items: action.payload
      };
    case GETALL_MTP_FAILED:
      return {
        ...state,
        isLoading: true,
      };
      
      default:
          return state;
      }
      
  }

  