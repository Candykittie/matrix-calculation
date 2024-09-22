import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent{
  matrix:number[][]=[];
  clickedStates:boolean[][]=[];
  clickCount:number[][] = [];
  inputValues:string= '';
  isMatrixGenerated:boolean=false;
  showAlert:boolean= false;
  alertMessage:string= '';
  results:number= 0;
  resultString:string = ''; 
  factorialResult: string = ''; 
  clicktype: string = '';
  timeLeft: number = 3;
  timer: any;
  isInputDisabled: boolean = false;
  FormMatrix() {
    if (!this.inputValues.trim()){
      this.matrix=[];
      this.clickedStates=[];
      this.clickCount=[];
      this.isMatrixGenerated = false;
      this.results=0;
      this.resultString='';
      this.factorialResult='';
      return;
    }
    const values=this.inputValues.split(',')
    .map(val=>parseFloat(val.trim()))
    .filter(val=>!isNaN(val));
    const totalValues=values.length;
    const uniqueValues=new Set(values);
    if (uniqueValues.size!==values.length) {
      this.showAlert=true;
      this.alertMessage='Error: There are duplicate numbers in your input!';
      setTimeout(()=>{
        this.showAlert=false;
      }, 1000);
      return;
    }
    const n=Math.ceil(Math.sqrt(totalValues));
    this.matrix=[];
    this.clickedStates=[];
    this.clickCount=[];
    let valueIndex=0;
    for (let i=0; i<n;i++) {
      const row: number[]=[];
      const clickedRow:boolean[] = [];
      const clickRow:number[] = [];
      for (let j=0;j<n;j++) {
        if (valueIndex < totalValues) {
          row.push(values[valueIndex]);
        } else {
          row.push(0);
        }
        clickedRow.push(false);
        clickRow.push(0);
        valueIndex++;
      }
      this.matrix.push(row);
      this.clickedStates.push(clickedRow);
      this.clickCount.push(clickRow);
    }
    this.isMatrixGenerated=true;
    this.results=0;
    this.resultString='';
    this.factorialResult='';  
  }
  onClick(rowIndex: number, colIndex: number) {
    if (rowIndex >= 0 && rowIndex < this.matrix.length && colIndex >= 0 && colIndex < this.matrix[rowIndex].length) {
      this.clickedStates[rowIndex][colIndex]=!this.clickedStates[rowIndex][colIndex];
      this.clickCount[rowIndex][colIndex]++;
      const currentValue=Number(this.matrix[rowIndex][colIndex])||0;
      if (this.clickCount[rowIndex][colIndex] % 2 === 1){
        this.results += currentValue;
        this.clicktype=`Odd Click: The values are added`;
      } else {
        this.results-=currentValue;
        this.clicktype=`Even Click: The values are subtracted`;
      }
      this.resultString=this.results!==0?`${this.convertNumberToWords(this.results)}`:'';
      this.factorialResult=this.results !== 0 ? this.formatFactorial(this.results):'';
    }
  }
  formatFactorial(num:number):string {
    if(isNaN(num)||num<0) return "Factorial not defined for negative numbers";
    if (num==0||num==1)return'1';
    if (num>20) {
      let fact = BigInt(1);
      for (let i=2;i<=num;i++) {
        fact*=BigInt(i);
      }
      return this.toScientificNotation(fact);
    } else {
      let fact=1;
      for (let i=2;i<=num;i++) {
        fact*=i;
      }
      return fact.toString();
    }
  }
  toScientificNotation(num:BigInt):string {
    const numStr=num.toString();
    const exponent=numStr.length-1;
    const mantissa=numStr.charAt(0)+'.'+numStr.slice(1, 3); 
    return`${mantissa}e+${exponent}`;
  }
  convertNumberToWords(num:number):string {
    if (isNaN(num)||num<0)return 'Invalid number';
    const a = [' ',' One ',' Two ',' Three ',' Four ',' Five ',' Six ',' Seven ',' Eight ',' Nine ',' Ten ',' Eleven ',' Twelve ',' Thirteen ',' Fourteen ',' Fifteen ',' Sixteen ',' Seventeen ',' Eighteen ',' Nineteen'];
    const b = [' ',' ',' Twenty ',' Thirty ',' Forty ',' Fifty ',' Sixty ',' Seventy ',' Eighty ',' Ninety ',' ' ];
    if (num<20) return a[num];
    if (num<100) return b[Math.floor(num/10)] + (num % 10?``+a[num % 10]:'');
    if (num<1000) return a[Math.floor(num/100)]+'Hundred'+(num % 100?''+this.convertNumberToWords(num%100):'');
    return num.toString(); 
  }
  trackByIndex(index:number,obj:any):any{
    return index;
  }
}
