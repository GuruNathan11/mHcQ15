import { put, call } from "redux-saga/effects";
import { MasterTreatementPlanAPI } from "../../utils/api/MasterTreatementPlanAPI";
import {  CREATE_MTP_COMPLETED,CREATE_MTP_FAILED , UPDATE_MTP_COMPLETED, 
    UPDATE_MTP_FAILED, GETBYID_MTP_COMPLETED ,GETBYID_MTP_FAILED, 
     GETBYVISITID_MTP_COMPLETED,GETBYVISITID_MTP_FAILED,GETBYPATIENTID_MTP_COMPLETED,
    GETBYPATIENTID_MTP_FAILED, GETALL_MTP_COMPLETED,GETALL_MTP_FAILED 
} from "../actions/MasterTreatementPlan";
 
export function* mtpCreate(request: any) {
  
    try {
           const result=yield call(MasterTreatementPlanAPI.mtpCreate, request.input);
         yield put({ 
            type: CREATE_MTP_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: CREATE_MTP_FAILED, payload: e.message });
    }
}

export function* mtpUpdate(request: any) {
  
    try {
           const result=yield call(MasterTreatementPlanAPI.mtpUpdate, request.input);
         yield put({ 
            type: UPDATE_MTP_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: UPDATE_MTP_FAILED, payload: e.message });
    }
}


export function* getMtpById(request: any) {
  
    try {
           const result=yield call(MasterTreatementPlanAPI.getMtpById, request.input);
         yield put({ 
            type: GETBYID_MTP_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: GETBYID_MTP_FAILED, payload: e.message });
    }
}

export function* getMtpByVisitId(request: any) {
  
    try {
           const result=yield call(MasterTreatementPlanAPI.getMtpByVisitId, request.input);
         yield put({ 
            type: GETBYVISITID_MTP_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: GETBYVISITID_MTP_FAILED, payload: e.message });
    }
}

export function* getMtpByPatientId(request: any) {
  
    try {
           const result=yield call(MasterTreatementPlanAPI.getMtpByPatientId, request.input);
         yield put({ 
            type: GETBYPATIENTID_MTP_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: GETBYPATIENTID_MTP_FAILED, payload: e.message });
    }
}
export function* getAllMtp(request: any) {
  
    try {
           const result=yield call(MasterTreatementPlanAPI.getAllMtp, request.input);
         yield put({ 
            type: GETALL_MTP_COMPLETED,     
            payload: result.data,
            input: request.input
        });
    } catch (e) {
        yield put({ type: GETALL_MTP_FAILED, payload: e.message });
    }
}