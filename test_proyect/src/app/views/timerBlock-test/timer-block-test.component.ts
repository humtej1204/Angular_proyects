import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-block-test',
  templateUrl: './timer-block-test.component.html',
  styleUrls: ['./timer-block-test.component.scss']
})
export class TimerBlockTestComponent implements OnInit {

  constructor() { }

  errorCounter = 0;
  blockCounter = 0;
  dissableBtn = false;

  ngOnInit(): void {
  }

  addError() {
    this.errorCounter++;
  }

  blockUser() {
    const timeBlock = [
      30, 120, 1000
    ]

    if (this.errorCounter === 3) {
      this.blockCounter++;
      this.dissableBtn = true;
      this.errorCounter = 0;
      console.log("Tu cuenta fue bloqueada por unos minutos");
      this.unlockUser(timeBlock[this.blockCounter - 1])
    }

    if (this.blockCounter === 3) {
      this.dissableBtn = true;
      this.errorCounter = 0;
      this.blockCounter = 0;
      console.log("Ya no tienes mas intentos, llama a un supervisor para desbloquear tu cuenta")
    }
  }

  unlockUser(time: number) {
    setTimeout(()=>{
      this.dissableBtn = false;
    }, 100 * time);
  }


}
