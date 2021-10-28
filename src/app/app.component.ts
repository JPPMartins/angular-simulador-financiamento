import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simulador-financiamento';

  valorEntrada : any = '';
  valorTotal : any = '';
  valorFinanciar : any = '';
  tempoAnos : number = 0;
  tempoMeses  : number = 0;
  taxaJurosAnos: any = '';
  amortizacao : any = '';
  juros : any = '';
  primeiraParcela : any = '';
  taxaJurosMeses : any = '';
  parcelas : any[] = [];

  calculaValorFinanciar(valorEntrada : any, valorTotal : any){
    this.valorEntrada = valorEntrada;
    this.valorTotal = valorTotal;
    this.valorFinanciar = valorTotal - valorEntrada;
    this.recalculaValores();
    
  }

  calculaTempoMeses(tempoAnos: any){
    this.tempoAnos = tempoAnos;
    this.tempoMeses = tempoAnos*12;
    this.recalculaValores();
    
  }

  calculaJurosMeses(jurosAnos : any){
    this.taxaJurosAnos =  jurosAnos;
    this.taxaJurosMeses = jurosAnos/12;
    this.recalculaValores();
  }

  recalculaValores(){
    this.calculaAmortizacao();
    this.calculaJuros();
    this.calculaPrimeiraParcela();
    this.parcelas = [];

  }

  calculaAmortizacao(){
    if(this.tempoMeses > 0 && this.valorFinanciar > 0){
      this.amortizacao = this.valorFinanciar/this.tempoMeses;
    }
  }

  calculaJuros(){
    this.juros = (this.valorFinanciar * this.taxaJurosMeses)/100;
  }

  calculaPrimeiraParcela(){
    this.primeiraParcela = this.amortizacao + this.juros;
  }

  calculaTodasParcelas(){
    let saldoDevedor = this.valorFinanciar + this.amortizacao;
    let juros = this.juros;
    let parcela = this.primeiraParcela;
    let nParcela = 1;

    for(nParcela; nParcela <= this.tempoMeses; nParcela++){
      saldoDevedor = saldoDevedor - this.amortizacao;
      juros = (saldoDevedor * this.taxaJurosMeses)/100
      parcela = this.amortizacao + juros;
      let rowItem = {"nparcela": nParcela, "saldoDevedor": saldoDevedor , "amortizacao": this.amortizacao, "parcelaValor": parcela, "juros" : juros};
      this.parcelas.push(rowItem);
    }
  }

  ngOnInit() {
      
  }
}
