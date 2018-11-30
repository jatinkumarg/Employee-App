import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubScription:any;
  positionSubscription:any;
  savePositionSubscription:any;
  position:Position;
  successMessage:boolean = false;
  failMessage:boolean = false;

  constructor(private p:PositionService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.paramSubScription = this.route.params.subscribe(params=>{
      this.positionSubscription = this.p.getPosition(params['_id']).subscribe((position) =>{
        this.position = position[0];
       });
   });
  }

  onSubmit(){
    this.savePositionSubscription = this.p.savePosition(this.position).subscribe(()=>{
      this.successMessage = true;
      setTimeout(()=>{this.successMessage = false;},2500)
    }, error =>{
      this.failMessage = true;
      setTimeout(()=>{this.failMessage = false;},2500)
    });
  }

  ngOnDestroy(){
    if(this.paramSubScription != undefined){
       this.paramSubScription.unsubscribe();
   }
    if(this.positionSubscription != undefined){
       this.positionSubscription.unsubscribe();
    }
   }

}
