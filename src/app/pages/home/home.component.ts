import {Component, OnInit} from '@angular/core';
import {PeerType} from "../../types/peerType";
import {PeerService} from "../../services/peer.service";
import {ChatService, Status} from "../../services/chat.service";
import {Router} from "@angular/router";
import {VideoService} from "../../services/video.service";
import {IMAGES} from "../../constants/assets.constants";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  IMAGES = IMAGES;

  Status = Status;
  status: Status;

  peers: PeerType[];

  constructor(
    private router: Router,
    private videoService: VideoService,
    private peerService: PeerService,
    private chatService: ChatService) {
  }

  ngOnInit() {
    this.getPeers();
    this.chatService.state$.subscribe(state => {
      this.status = state;
    });
  }

  async selectPeer(peer: PeerType) {
    const mediaStream = await this.videoService.openVideoStream();
    this.chatService.makeCall(peer.username, mediaStream);
    this.router.navigate(['/chat'])
  }

  private getPeers() {
    this.peers = this.peerService.getPeers();
  }

}
