export const CREATE_MTP_STARTED = "CREATE_MTP_STARTED";
export const CREATE_MTP_COMPLETED = "CREATE_MTP_COMPLETED";
export const CREATE_MTP_FAILED = "CREATE_MTP_FAILED";

export const UPDATE_MTP_STARTED = "UPDATE_MTP_STARTED";
export const UPDATE_MTP_COMPLETED = "UPDATE_MTP_COMPLETED";
export const UPDATE_MTP_FAILED = "UPDATE_MTP_FAILED";

export const GETBYID_MTP_STARTED = "GETBYID_MTP_STARTED";
export const GETBYID_MTP_COMPLETED = "GETBYID_MTP_COMPLETED";
export const GETBYID_MTP_FAILED = "GETBYID_MTP_FAILED";

export const GETBYVISITID_MTP_STARTED = "GETBYVISITID_MTP_STARTED";
export const GETBYVISITID_MTP_COMPLETED = "GETBYVISITID_MTP_COMPLETED";
export const GETBYVISITID_MTP_FAILED = "GETBYVISITID_MTP_FAILED";


export const GETBYPATIENTID_MTP_STARTED = "GETBYPATIENTID_MTP_STARTED";
export const GETBYPATIENTID_MTP_COMPLETED = "GETBYPATIENTID_MTP_COMPLETED";
export const GETBYPATIENTID_MTP_FAILED = "GETBYPATIENTID_MTP_FAILED";

export const GETALL_MTP_STARTED = "GETBYPATIENTID_MTP_STARTED";
export const GETALL_MTP_COMPLETED = "GETBYPATIENTID_MTP_COMPLETED";
export const GETALL_MTP_FAILED = "GETBYPATIENTID_MTP_FAILED"; 

export const mtpCreate = (mtpCreateInput: any) => {
 
    return {
        type: CREATE_MTP_STARTED,
        payload: 'status',
        input: mtpCreateInput
    };
};

export const mtpUpdate = (mtpUpdateInput: any) => {

   return {
       type: UPDATE_MTP_STARTED,
       payload: 'status',
       input: mtpUpdateInput
   };

};
export const getMtpById = (id) => {
   
    return {
        type: GETBYID_MTP_STARTED ,
        payload: 'Value',
        input:id 
    };
};

export const getMtpByVisitId = (patientId,visitId) => {
   
    return {
        type: GETBYVISITID_MTP_STARTED ,
        payload: 'Value',
        input:patientId, 
        inputParam:visitId 
    };
};

export const getMtpByPatientId = (patientId) => {
   
    return {
        type: GETBYPATIENTID_MTP_STARTED ,
        payload: 'Value',
        input:patientId 
    };
};

export const getAllMtp = (patientId) => {
   
    return {
        type: GETALL_MTP_STARTED ,
        payload: 'Value',
        input:patientId 
    };
};


