import React from 'react'
import classes from './input.css'

const Input = (props) => {
    let inputElement = null;
    const inputCssClasses=[classes.InputElement];
    let validationError = null;

    if(props.inValid && props.touched){
        inputCssClasses.push(classes.Invalid)
        validationError = <p className={classes.Error}>{props.errorMessage}</p>;
    }

    switch (props.elementtype){

        case ('input'):
            inputElement = <input 
            className={inputCssClasses.join(' ')} 
            {...props.elementconfig}
           value={props.value}
           onChange={props.changed}
            /> 
            console.log(props.erroMessage)
            break;
        
        case('textarea'):
            inputElement = <textarea
            className={inputCssClasses.join(' ')}
            {...props} 
            {...props.elementconfig}
            value={props.value}
           onChange={props.changed} /> 
            break;

        case('select'):
            inputElement = (<select
            className={classes.InputElement}
            value={props.value}
          onChange={props.changed}  >

            {props.elementconfig.options.map(option=>(
                <option
                key={option.value}
                value={option.value}
                >
                 {option.displayValue}   
                </option>
            ))}
                
         </select>)
            break;


        default:
            inputElement = <input  className={inputCssClasses.join(' ')}
            {...props} 
            {...props.elementconfig}
            value={props.value}
           onChange={props.changed} /> 

    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default Input
