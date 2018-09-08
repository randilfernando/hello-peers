import { Injectable } from '@angular/core';
import {PeerType} from "../types/peerType";

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  constructor() { }

  public getPeers(): PeerType[] {
    return [
      {name: 'Udara Sugandi', email: 'udara.sugandi@gmail.com'},
      {name: 'Randil Fernando', email: 'randil.fernando.rf@gmail.com'}
    ]
  }
}
