import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as jsPDF from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import IpfsClient from 'ipfs-http-client';
import {ClausulasCeos} from '../../models/clausulasceos';
import { ClausulasClient} from '../../models/clausulasclient';
import { ServiceService } from '../../service/service.service';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Clausulas: ClausulasCeos[] ;
  ClausulasC: ClausulasClient[];
  aHash: any;
  strContactName: string;

  strNombreClient: string;
  strEmailClient: string;
  intTelClient: number;
  strEmpresaClient: string;
  prueba: any;

  blnMostrar: boolean;
  blnMostrar2: boolean;
  blnMostrar3: boolean;
  blnMostrar4: boolean;

  strTitulo: string;
  strDescrip: string;
  strTitulocli: string;
  strDescripcli: string;
  titulos = [{Clausula: 'Clausula', Descripcion: 'Descripcion'}];
  ipfs: any;
  jspdf: any;
  document: any;
 


  constructor( public service: ServiceService, public router: Router) {
    this.ipfs = IpfsClient();
    this.jspdf = new jsPDF();
  }
  ngOnInit() {
   this.blnMostrar = false;
   this.blnMostrar2 = true;
   this.blnMostrar3 = true;
   this.blnMostrar4 = false;
   this.Clausulas = [];
   this.ClausulasC = [];
   this.getHash();
	}

  abrir() {

    this.blnMostrar = false;
  }
  abrir2() {
  this.blnMostrar3 = false;
  this.blnMostrar2 = false;
  }
  hide() {
  this.blnMostrar2 = true;
  }
  guardardatos() {
    this.blnMostrar = true;
    this.blnMostrar2 = true;
  }
  anterior2(){
    this.blnMostrar2 = true;
    this.blnMostrar3 = true;
  }
  anterior(){
    this.blnMostrar = false;
    this.blnMostrar2 = false;
  }

  agregar() {
   this.Clausulas.push({Nombre: this.strTitulo, Contenido: this.strDescrip});
   console.log(this.Clausulas);
   this.strTitulo = '';
   this.strDescrip = '';
  }
  cerrarsesion() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  eliminar(index: number) {
    this.Clausulas.splice(index, 1);
  }
  copiarhash(content){
  const aux = document.createElement("input");
  aux.setAttribute("value", content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  }

  agregarcli() {
   this.ClausulasC.push({Nombre: this.strTitulocli, Contenido: this.strDescripcli});
   console.log(this.ClausulasC);
   this.strTitulocli = '';
   this.strDescripcli = '';
  }
  eliminarcli(index: number) {
  	this.ClausulasC.splice(index, 1);
  }
  getHash() {
    this.aHash = this.service.getIpfshash();
    console.log(this.aHash);
  }

  saveContract() {
  	
    console.log(this.strContactName);
    
   
    this.blnMostrar2 = true;
    

    this.blnMostrar = false;

    this.blnMostrar3 = true;
    this.blnMostrar4 = false;
  }
   buildTableBody(data, columns) {
      let body = [];
      body.push(columns);
      data.forEach(function(row) {
        console.log(row);
          let dataRow = [];
          columns.forEach(function(column) {
            console.log(column)
              dataRow.push(row[column]);
          });
          body.push(dataRow);
      });

      return body;
  }
   table(data, columns) {
      return {
          table: {
              headerRows: 1,
              widths: [100, 400],
              body: this.buildTableBody(data, columns)
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            }
      }
  };
}

  GeneratePDF() {
    
    const docDefenition = {
      content: [
        {text: 'Datos del cliente', fontSize: 16, bold:true, marginBottom:5},
        {text: 'Nombre: ' + this.strNombreClient, fontSize: 11},
        {text: 'Correo electrónico: ' + this.strEmailClient, fontSize: 11},
        {text: 'Telefono: ' + this.intTelClient.toString(), fontSize: 11},
        {text: 'Empresa: ' + this.strEmpresaClient, fontSize: 11, marginBottom:5},
        {text: 'Cláusulas por parte de Ceos', fontSize: 16, bold:true, marginBottom:5},
        this.table(this.Clausulas, ['Nombre', 'Contenido']),
        {text: 'Cláusulas por parte del cliente', fontSize: 16, bold:true, marginBottom:5,marginTop:5},
        this.table(this.ClausulasC, ['Nombre', 'Contenido'])
      ]
    };

    const pdfdocGenerator = pdfMake.createPdf(docDefenition);
    pdfdocGenerator.download(this.strContactName);   
    pdfdocGenerator.getBase64((buffer) => {
     
      const client = {
      name: this.strNombreClient,
      email: this.strEmailClient,
      phone: this.intTelClient,
      company: this.strEmpresaClient,
      attachment: buffer
     };   
       
    this.service.sendEmail(this.strContactName, client ).then((res: any) =>{
      console.log(res.data);
      Swal.fire(
      'Contrato enviado',
      'EL contrato fue enviado al cliente para su aprovación',
      'success');
      this.Clausulas = [];
      this.ClausulasC = [];
      this.strNombreClient = '';
      this.strEmpresaClient = '';
      this.strEmailClient = '';
      this.intTelClient = null;
      this.strContactName = '';
      this.blnMostrar3=true;
      this.blnMostrar2=true;
      this.blnMostrar=false;
      
    }).catch( err => {
    console.log(err);
    });
    });
 
  




  }
}
