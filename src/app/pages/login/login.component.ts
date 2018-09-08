import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {PeerType} from "../../types/peerType";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  peer: PeerType = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('peer');

    if (data) {
      this.peer = JSON.parse(data);
    }
  }

  login() {
    localStorage.setItem('peer', JSON.stringify(this.peer));
    this.chatService.open(this.peer.email);
    this.router.navigate(['/home']);
  }

}
