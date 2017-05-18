import { Injectable } from '@angular/core';
import { environment } from 'app/../environments/environment';

@Injectable()
export class EndpointService {

  constructor() { }

  serverEndpoint(pathSuffix){
    return environment.serverUrl + pathSuffix;
  }
}
