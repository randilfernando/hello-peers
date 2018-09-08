import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {PeerType} from "../types/peerType";
import {VideoService} from "./video.service";

declare let Peer: any;

export enum Status {
  UNKNOWN,
  DISCONNECTED,
  CLOSE,
  ERROR,
  OPEN,
  CALLING,
  RECEIVING,
  CALL_CONNECTED,
  CALL_DISCONNECTED,
  IDLE
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private peer: any;
  private call: any;
  private remoteStream: any;
  private selectedPeer: PeerType;

  private state = new BehaviorSubject<Status>(Status.UNKNOWN);
  public state$ = this.state.asObservable();

  constructor(
    private videoService: VideoService
  ) {
  }

  public open(id: string) {
    if (this.peer) {
      this.close();
    }

    const peer = new Peer({
      host: 'hello-peers.herokuapp.com',
      port: ''
    });

    peer.on('open', () => {
      this.peer = peer;
      this.call = null;
      this.remoteStream = null;
      this.selectedPeer = null;
      this.state.next(Status.OPEN);
      this.state.next(Status.IDLE);
    });

    peer.on('error', () => {
      this.call = null;
      this.remoteStream = null;
      this.selectedPeer = null;
      this.videoService.closeVideoStream();
      this.state.next(Status.ERROR);
      this.state.next(Status.IDLE);
    });

    peer.on('call', call => {
      this.call = call;
      this.state.next(Status.RECEIVING);
    });

    peer.on('close', () => {
      this.peer = null;
      this.call = null;
      this.remoteStream = null;
      this.selectedPeer = null;
      this.state.next(Status.CLOSE);
    });

    peer.on('disconnected', () => {
      this.call = null;
      this.remoteStream = null;
      this.selectedPeer = null;
      this.state.next(Status.DISCONNECTED);
    })
  }

  public disconnect() {
    this.peer.disconnect();
  }

  public reconnect() {
    this.peer.reconnect();
  }

  public close() {
    this.peer.destroy();
  }

  public selectPeer(peer: PeerType) {
    this.selectedPeer = peer;
  }

  public makeCall(mediaStream: any) {
    if (!this.call && this.selectedPeer) {
      this.call = this.peer.call(this.selectedPeer.email, mediaStream);
      this.state.next(Status.CALLING);

      this.call.on('stream', remoteStream => {
        this.remoteStream = remoteStream;
        this.state.next(Status.CALL_CONNECTED);
      });

      this.call.on('close', () => {
        this.call = null;
        this.remoteStream = null;
        this.videoService.closeVideoStream();
        this.state.next(Status.CALL_DISCONNECTED);
        this.state.next(Status.IDLE);
      });
    }
  }

  public endCall() {
    if (this.call) {
      this.call.close();
      this.state.next(Status.CALL_DISCONNECTED);
      this.state.next(Status.IDLE);
    }
  }

  public answerCall(mediaStream: any) {
    if (this.call) {
      this.call.answer(mediaStream);

      this.call.on('stream', remoteStream => {
        this.remoteStream = remoteStream;
        this.state.next(Status.CALL_CONNECTED);
      });

      this.call.on('close', () => {
        this.call = null;
        this.remoteStream = null;
        this.videoService.closeVideoStream();
        this.state.next(Status.CALL_DISCONNECTED);
        this.state.next(Status.IDLE);
      });
    }
  }
}
