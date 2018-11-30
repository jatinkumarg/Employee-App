import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
   positions: Position[]; 
   getPositionsSub: any;
   loadingError: boolean = false;

  constructor(private p : PositionService, private router: Router) { }

  ngOnInit() {
    this.getPositionsSub = this.p.getPositions().subscribe(
      positions => this.positions = positions,
      function(err) { this.loadingError = true; }
    );
  }

  ngOnDestroy() {
    if(this.getPositionsSub){this.getPositionsSub.unsubscribe();}
  }

  routePosition(id: string){
    this.router.navigate(['/position', id]);
  }
  
}
