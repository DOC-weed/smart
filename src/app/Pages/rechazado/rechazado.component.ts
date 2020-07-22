import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-rechazado',
  templateUrl: './rechazado.component.html',
  styleUrls: ['./rechazado.component.css']
})
export class RechazadoComponent implements OnInit {
	status: string;
  constructor(public router: ActivatedRoute, public service: ServiceService) { }

  ngOnInit(): void {
  		 this.router.paramMap.subscribe(params => {
  	 	this.status=params.get('status');
  	 	console.log(this.status);
  	 	this.service.sendErrConfirmacion(this.status).then(res =>{
  	 		console.log(res);
  	 	}).catch(err =>{
  	 		console.log(err);
  	 	});

  	 });
  }

}
