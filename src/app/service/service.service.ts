import { Injectable, Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
const Web3 = require('web3');

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'https://smartcontract-backend.herokuapp.com';
  //url = 'http://localhost:3000';
  private account: any = null;
  private readonly web3: any;
  
  private enable: any;
  ContractAddress = '0xAcD12a2f56F6aEC4794399Ba54682A66FC35618F';
  abi =  [{"inputs": [],'payable': false,"stateMutability": "nonpayable","type": "constructor"},{"constant": true,"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "ContractHash","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"internalType": "string","name": "_ipfsHash","type": "string"}],"name": "addHash","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "countHash","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"internalType": "uint256","name": "_count","type": "uint256"}],"name": "getHash","outputs": [{"internalType": "string","name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"}];;


  constructor(private http: HttpClient, public auth: AngularFireAuth, public router: Router) { 
  if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
        console.log('current');
      } else {
        this.web3 = new Web3.providers.HttpProvider('https://kovan.infura.io/v3/b34e795c52bb43d7bd0bce95e943d746');
        console.log('infura');
      }
      window.web3 = new Web3(window.ethereum);
      this.enable = this.enableMetaMaskAccount();
    }
  }
  
  private async enableMetaMaskAccount(): Promise<any> {
  let enable = false;
  await new Promise((resolve, reject) => {
    enable = window.ethereum.enable().then( accounts => {
      this.account = accounts[0];
      console.log(this.account)
    })
  });
  return Promise.resolve(enable);
}

  sendEmail(contactName: string, client: any) {
    return this.http.post(`${this.url}/send-email/${contactName}`, client).toPromise();
  }
  sendConfirmacion(status: string){
  	return this.http.get(`${this.url}/sendconfir-email/${status}`).toPromise();
  }
  sendErrConfirmacion(status: string) {
  	return this.http.get(`${this.url}/senderr-email/${status}`).toPromise();
  }
  deploy(ipfs: string){
    return this.http.get(`${this.url}/deploy-contract/${ipfs}`).toPromise();
  }
  addHash(ipfsHash: string){
    let contract = new window.web3.eth.Contract(this.abi, this.ContractAddress);
    console.log(ipfsHash);
    contract.methods.addHash(ipfsHash).send({
     from: this.account, gas: 3000000, gasPrice: '30'
    }).on('receipt', receipt => {
     Swal.fire(
       'Transacción completa',
       'Su recibo es : ' + receipt.transactionHash,
       'success'
       );
      });
    }

    getIpfshash() : any{
      const array = [];
      let contract = new window.web3.eth.Contract(this.abi, this.ContractAddress);
      contract.methods.countHash().call().then( data => {
        let i = data;
        console.log(i);
        for (let o = 0; o < i; o ++ ) {
          contract.methods.getHash(o).call().then( hash => {
            array.push(hash);
          });
        }
      });
      console.log(array);
      return array;

}
  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then((usuario) => {
         localStorage.setItem('token', usuario.additionalUserInfo.providerId);
         this.router.navigateByUrl('home');
     }).catch(err => {
      Swal.fire(
        'Error',
        'El correo y/o contraseña son incorrectos' + err,
        'error');
     });

  }
  prueba(name: string) {
    return this.http.get(`${this.url}/createpdf/${name}`).toPromise();
  }
}