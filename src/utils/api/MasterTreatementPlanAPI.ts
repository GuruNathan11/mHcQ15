import { HttpLogin } from "../Http";
export class MasterTreatementPlanAPI {

    public static mtpCreate(org: any) { 
        var url = "/api/masterTreatment/add"               
      var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().post(url,obj, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {                       
                  return res;   
            })
            .catch((e: any) => {
      
              return e;               
            });
            return resultMethod;
      }
  
      public static mtpUpdate(org: any) { 
        var url = "/api/masterTreatment/update"               
      var obj = JSON.stringify(org);
     
        const resultMethod =   HttpLogin.axios().post(url,obj, {
              headers: { 
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
              }
            })
            .then(res => {                       
                  return res;   
            })
            .catch((e: any) => {
      
              return e;               
            });
            return resultMethod;
      }


  public static getMtpById(org: any) { 
    var url = "/api/masterTreatment/getById"               
 
 
    const resultMethod =   HttpLogin.axios().post(url,  {
          headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          }
        })
        .then(res => {                       
              return res;   
        })
        .catch((e: any) => {
  
          return e;               
        });
        return resultMethod;
  }

  public static getMtpByVisitId(org: any) { 
    var url = "/api/masterTreatment/getByPidAndVisitId"               
 
 
    const resultMethod =   HttpLogin.axios().post(url,  {
          headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          }
        })
        .then(res => {                       
              return res;   
        })
        .catch((e: any) => {
  
          return e;               
        });
        return resultMethod;
  }

  
  public static getMtpByPatientId(org: any) { 
    var url = "/api/masterTreatment/getByPid"               
 
 
    const resultMethod =   HttpLogin.axios().post(url,  {
          headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          }
        })
        .then(res => {                       
              return res;   
        })
        .catch((e: any) => {
  
          return e;               
        });
        return resultMethod;
  }
  public static getAllMtp(org: any) { 
    var url = "/api/masterTreatment/getAll"               
 
 
    const resultMethod =   HttpLogin.axios().post(url,  {
          headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
          }
        })
        .then(res => {                       
              return res;   
        })
        .catch((e: any) => {
  
          return e;               
        });
        return resultMethod;
  }
}