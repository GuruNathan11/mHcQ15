export const GET_ALL_Q15_SHIFT_LIST = "GET_ALL_Q15_SHIFT_LIST";


export const getAllQ15ShiftList = (data: any) => {
    return {
        type: GET_ALL_Q15_SHIFT_LIST,
        payload: data,
    };
};