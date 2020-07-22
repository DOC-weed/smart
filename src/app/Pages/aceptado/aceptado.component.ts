import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-aceptado',
  templateUrl: './aceptado.component.html',
  styleUrls: ['./aceptado.component.css']
})
export class AceptadoComponent implements OnInit {

  constructor(public router: ActivatedRoute, public service: ServiceService) { }
  	status: string;
  ngOnInit(): void {
  	 this.router.paramMap.subscribe(params => {
  	 	this.status=params.get('status');
  	 	console.log(this.status);
  	 	this.service.sendConfirmacion(this.status).then(res =>{
  	 		console.log(res);
  	 	}).catch(err =>{
  	 		console.log(err);
  	 	});

  	 });

  }

}
