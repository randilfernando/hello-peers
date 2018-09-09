import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {PeerType} from "../../types/peerType";
import {Router} from "@angular/router";
import {IMAGES} from "../../constants/assets.constants";
import {LOCAL_STORAGE} from "../../constants/storage.constants";
import {PeerService} from "../../services/peer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  IMAGES = IMAGES;

  peer: PeerType = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private peerService: PeerService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    const data = localStorage.getItem(LOCAL_STORAGE.MY_PEER);

    if (data) {
      this.peer = JSON.parse(data);
    }
  }

  login() {
    this.peerService.login(this.peer);
    this.chatService.open(this.peer.username);
    this.router.navigate(['/home']);
  }

}
