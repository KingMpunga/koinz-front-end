import { logConsole } from "../_helpers/log-console.util";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { environment } from "src/environments/environment";
import { environment } from "../../environments/environment"


export abstract class BaseService {
  protected _apiName: string;
  protected headers = new HttpHeaders();

  protected readonly baseUrl: string = environment.apiEnvironment;
  protected readonly apiUrl: string = environment.apiEnvironment + "/api";
  protected readonly apiVersion: string = environment.apiVersion;

  constructor(protected httpClient: HttpClient) { }

  protected handleError(error: any) {

    logConsole('service error message: ' + error.message);
    logConsole('service error error: ' + error.error);
    logConsole('service error statusText: ' + error.statusText);

    const applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      throw (applicationError);
    }

    let modelStateErrors: string = '';

    if (!error.type) {
      for (const key in error) {
        if (error[key])
          modelStateErrors += error[key] + '\n';
      }
    }

    modelStateErrors = (modelStateErrors === '' ? null : modelStateErrors)!;
    throw (modelStateErrors || 'Server error');
  }

  protected removeNulls(obj: any) {
    if (obj === null) {
      return undefined;
    }
    if (typeof obj === 'object') {
      for (const key in obj) {
        obj[key] = this.removeNulls(obj[key]);
      }
    }
    return obj;
  }

  protected makeApiUrl(route: string): string {
    return `${this.apiUrl}/${this._apiName}/${route}`;
  }

  protected getRequestHeaders(jsonContentType = true, isFormData = false): { headers: HttpHeaders } {
    let headers = new HttpHeaders({
      'Accept': `application/vnd.iman.v${this.apiVersion}+json, application/json, text/plain, *//**`,
      'App-Version': '1',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'ExternalAuth': 'True'
    });
    if (jsonContentType)
      headers = headers.set('Content-Type', 'application/json');
    if (isFormData){
      this.headers.append('Content-Disposition', 'multipart/form-data');
      this.headers.append('Content-Type', 'application/json');

      return { headers: this.headers };
    }

    return { headers: headers };
  }
}