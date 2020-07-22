import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IpfsClient from 'ipfs-http-client';
import * as Web3 from 'web3';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service/service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
	ipfs: any;
	ipfsHash= '';
	contractName: string;
  address: string;
	file: any;
  aHash: any;
  data: any;
	
	

  constructor(public router: ActivatedRoute, public service: ServiceService, public route: Router) {
  this.ipfs = IpfsClient({host: 'ipfs.infura.io', port:'5001', protocol: 'https'});
   }
	
  ngOnInit(): void {
  	 this.router.paramMap.subscribe(params => {
  	 	this.contractName=params.get('name');
  	 });
  	  const fileSelector = document.getElementById('contract');
  	 fileSelector.addEventListener('change', (event: any) =>{
  	 	this.file = event.target.files[0];
  	 	
  	 });
     this.getHash();

  	 
  	 
  }
  upload(myform: NgForm){
    console.log(this.file)
      if(this.file === undefined) {
        Swal.fire(
       'Archivo no detectado',
       'Suba un archivo ',
       'error'
       );
      }else {
      this.run(this.file);
      myform.reset(); 
      this.file=undefined; 
      }
  		
  }

   copiarhash(content){
  const aux = document.createElement("input");
  aux.setAttribute("value", content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  }

  getHash() {
    this.aHash = this.service.getIpfshash();
    console.log(this.aHash);
  }


  async run(file: any){
  	const result =[];
  	for await (const _result of this.ipfs.add(file)){
  		result.push(_result);
  	} 
  	this.ipfsHash=result[0].cid.string;
    console.log(this.ipfsHash);
    this.service.addHash(this.ipfsHash);
    }
    cerrarsesion() {
    localStorage.clear();
    this.route.navigateByUrl('login');
  }


}
