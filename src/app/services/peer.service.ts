import { Injectable } from '@angular/core';
import {PeerType} from "../types/peerType";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {LOCAL_STORAGE} from "../constants/storage.constants";

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  private myPeer: PeerType;
  private loggedOn = new BehaviorSubject<boolean>(false);

  public loggedOn$ = this.loggedOn.asObservable();

  constructor() { }

  public login(peer: PeerType) {
    this.myPeer = peer;
    this.loggedOn.next(true);
  }

  public logout() {
    this.myPeer = null;
    this.loggedOn.next(false);
  }

  public getPeer() {
    return this.myPeer;
  }

  public register(peer: PeerType) {
    localStorage.setItem(LOCAL_STORAGE.MY_PEER, JSON.stringify(peer));
  }

  public getPeers(): PeerType[] {
    return [
      {username: 'udara', email: 'udara.sugandi@gmail.com'},
      {username: 'randil', email: 'randil.fernando.rf@gmail.com'}
    ]
  }
}
