import { Component, OnInit } from '@angular/core';
import { Pedometer } from '@ionic-native/pedometer/ngx';
import { Stepcounter } from '@ionic-native/stepcounter/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isStopped = false;
  steps = 0.0;
  calories = 0;
  sc2 = 0;
  constructor(private ped: Pedometer,
    private sc: Stepcounter) {

  }
  ngOnInit() {
    this.ped.isStepCountingAvailable().then((aval: boolean) => {
      alert(aval);
    });
    this.sc.deviceCanCountSteps()
    .then((data: boolean) => {
      alert('StepC ' + data);
    });
  }
  toggleIt() {
    this.isStopped = this.isStopped ? false : true;
    if (this.isStopped) {
      this.sc.start(this.sc2);
      this.ped.startPedometerUpdates()
      .subscribe((data) => {
        this.steps = data.numberOfSteps;
        this.calories = data.distance;
      });
    }
    if (!this.isStopped) {
      this.sc.stop().then(data => {
        alert(JSON.stringify(data));
        alert(this.sc2);
      });
      this.ped.stopPedometerUpdates();
      alert(this.steps + '--' + this.calories);
    }
  }
}
