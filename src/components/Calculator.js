import React, { Component } from 'react';
import './Calculator.css'
class Calculator extends Component {

	constructor(props) {
		super(props);
		this.state = {
			calculation: '0', button:'', dot: false
		}
	}
	lastOperator(calc){

		var count = 1
		var operator = '-'
		while(operator === '-'){
			
			operator = calc[calc.length-count]
			count+=2
		}
		return count-2
	}
	checkDot(value){
		if(value === '.'){

			if(this.state.dot === false ){
				this.setState({dot:true})
				return true;
			}else{
				return false;
			}
		}else if(value !== '.'){
			return true;
		}
	}
	setCharAt(str,index,chr) {
		if(index > str.length-1) return str;
		return str.substring(0,index-2) + chr 
	}
	addValue(value){
		if(this.checkDot(value)){
			if(this.state.calculation === '0'){
				this.setState({'calculation':value})
			}else{
				this.setState({'calculation':this.state.calculation+value, button:value})
			}
		}
	}
	addOperator(operator){
		var calc = this.state.calculation
		
		var length = calc.length
		var count = 0
		var lastEntered = calc[length-1]
		if(lastEntered === '-'){
			count = this.lastOperator(calc)
			lastEntered = calc[length -  count]
		}
		if(lastEntered === '+' || lastEntered === '*' || lastEntered === '-' ||lastEntered === '/'){
			if(operator !== '-'){
				calc = this.setCharAt(calc,length-count+1,operator)
				
				this.setState({'calculation':calc,dot:false})
			}else{

				this.setState({'calculation':this.state.calculation+ ' ' +operator, button:operator,dot:false})
			}
		}else{
			this.setState({'calculation':this.state.calculation+' ' +operator, button:operator,dot:false})
		}
		

	}
	display(){
		var calc = this.state.calculation
		var length = calc.length
		var lastEntered = calc[length-1]
		if(lastEntered === '+' || lastEntered === '*' || lastEntered === '-' ||lastEntered === '/'){
			this.setState({calculation:'INVALID', button:''})
			setTimeout(() => {  this.clear(); }, 1000);

		}else{
		this.setState({calculation:eval(this.state.calculation)});
		}
	}
	clear(){
		this.setState({'calculation':'0',button:'',dot:false})

	}
	render() {
		return (
			<div className = 'calc'>
			<div id = 'topscreen'>
			<div>
			&#8205; 
			{this.state.button}
			<div id= 'display'>
			{this.state.calculation} 
			</div>
			</div>
			</div>
			<div className = 'buttons'>
			<button onClick = {() =>this.clear()} number = 'AC' id = 'clear' >AC </button>
			<button onClick = {() =>this.addOperator('/')} number = '/'  id = 'divide'>/ </button>
			<button onClick = {() =>this.addOperator('*')}number = 'x'  id = 'multiply'>x </button>
			<button onClick = {() =>this.addValue('7')} number = '7'  id = 'seven'>7 </button>
			<button onClick = {() =>this.addValue('8')}  number = '8'  id = 'eight'>8 </button>
			<button onClick = {() =>this.addValue('9')} number = '9'  id = 'nine'>9 </button>
			<button onClick = {() =>this.addOperator('-')}  number = '-'  id = 'subtract'>- </button>
			<button onClick = {() =>this.addValue('4')} number = '4'  id = 'four'>4 </button>
			<button onClick = {() =>this.addValue('5')}number = '5'  id = 'five'>5 </button>
			<button onClick = {() =>this.addValue('6')}number = '6'  id = 'six'>6 </button>
			<button onClick = {() =>this.addOperator('+')} number = '+'  id = 'add'>+ </button>
			<button onClick = {() => this.addValue('1')} number = '1'  id = 'one'>1 </button>
			<button onClick = {() => this.addValue('2')} number = '2'  id = 'two'>2 </button>
			<button onClick = {() =>this.addValue('3')} number = '3'  id = 'three'>3 </button>
			<button onClick = {() =>this.display()} number = '='  id = 'equals'>= </button>
			<button onClick = {() =>this.addValue('0')} number = '0' id = 'zero' >0 </button>
			<button onClick = {() =>this.addValue('.')} number = '.'  id = 'decimal'>. </button>


			</div>
			</div>
			);
	}
}

export default Calculator;
