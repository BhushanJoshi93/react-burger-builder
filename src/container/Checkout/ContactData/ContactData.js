import React, { Component } from "react";
import Button from "../../../components/UI/CustomButton/CustomButton";
import classes from "./contactData.css";
import axios from "../../../axios-instance";
import Spinner from "../../../components/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
          elementtype:'input',
          elementconfig:{
              type:'text',
              placeholder:'your name'
          },
          value:'',
          validationRule:{
              required:true
          },
          valid:false,
          touched:false,
          erroMessage:'Please enter a Valid Name'
      },
      street:{
        elementtype:'input',
        elementconfig:{
            type:'text',
            placeholder:'Street'
        },
        value:'',
        validationRule:{
            required:true
        },
        valid:false,
        touched:false,
        erroMessage:'Please enter a Valid Street'
      },
      zipcode: {
        elementtype:'input',
        elementconfig:{
            type:'text',
            placeholder:'Zipcode'
        },
        value:'',
        validationRule:{
            required:true,
            maxLength:5,
            minLength:5
        },
        valid:false,
        touched:false,
        erroMessage:'ZipCode length 5 digits',
        
      },
      country:{
        elementtype:'input',
        elementconfig:{
            type:'text',
            placeholder:'Country'
        },
        value:'',
        validationRule:{
            required:true
        },
        valid:false,
        touched:false,
        erroMessage:'Please enter a Valid Country'
      },
      email: {
        elementtype:'input',
        elementconfig:{
            type:'email',
         placeholder:'email'
        },
        value:'',
        validationRule:{
            required:true
        },
        valid:false,
        touched:false,
        erroMessage:'Please enter a Valid Email'
      }, 
      deliveryMethod: {
        elementtype:'select',
        elementconfig:{
          options:[
        {value:'Fast',displayValue:'Fastest'},
          {value:'Cheapest',displayValue:'Cheapest'}
        ]
         
        },
        value:'Select Value',
        valid:true

      },
    },
    formIsValid:false,
    loading: false,
  };

  orderHandler = (event) => {
    //the below line is to prevent the default behaviour of forms which is to reload/send a request the page
    event.preventDefault();
    this.setState({ loading: true });

    const formData ={};
            //name,email etc        //the whole orderForm
    for(let formElementIdentifier in this.state.orderForm){
        //this would simply become 
        //formData={name:bhsuhan, zipcode:123 etc}
        formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
    }


    const order = {
      ingredient: this.props.ingredients,
      totalPrice: this.props.price,
      orderUserData:formData
    };

    axios
      .post("/order.json", order)
      .then((response) => {
        //     console.log("Response:", response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
        this.setState({ loading: false });
      });
  };



  //value: actual value insode of element
  //rules: validation rules in state.
  validtionCheck(value,rules){

    let isValid=true;

    if(!rules){
        return true;
    }

    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.maxLength){
        isValid= value.length <=rules.maxLength && isValid;
    }

    if(rules.minLength){
        isValid= value.length >=rules.minLength && isValid;
    }
    

    return isValid;
  }


  inputChangedHandler =(event,inputIndentifier)=>{
    // console.log(event.target.value)
     const updatedOrderForm={
         ...this.state.orderForm
     }
     //deepcloning
     const updateFormElement={
         ...updatedOrderForm[inputIndentifier]
     }
     updateFormElement.value=event.target.value;

     //pass validation to validationCheck()
     updateFormElement.valid= this.validtionCheck(updateFormElement.value,updateFormElement.validationRule)
    
     //set touched state ==> for applying css for 1st time the element loads
     updateFormElement.touched=true;

     //checking if fromIs valid (i.e all valid: in all object is set to true or false)
     let formIsValid=true;
     for(let inputIndentifier in updatedOrderForm){
         formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid 
     }

     updatedOrderForm[inputIndentifier]=updateFormElement;
     //console.log(updateFormElement);
     this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
   }

  render() {

    let formElement=[];
    for(let key in this.state.orderForm){
        formElement.push({
            id:key,
            config:this.state.orderForm[key]
        })
    }

    let form = (
      <form>
          {
              formElement.map(element=>(
                  <Input 
                    key={element.id}
                    //to pass the the acutal element such as input,email,options etc
                    elementtype={element.config.elementtype}
                    //to pass the elements like placeholder etc
                    elementconfig={element.config.elementconfig}
                    //two way binding
                    value={element.config.value}
                    //to apply invalid css class
                    inValid={!element.config.valid}
                    //touched=> for handling validation css for 1st loading
                    touched={element.config.touched}

                    //error message for error paragraph
                    errorMessage={element.config.erroMessage}

                    // shouldValidate={element.config.validationRule}

                    //to handle onChange
                    changed={(event)=>{this.inputChangedHandler(event,element.id)}}
                  />
              )
              )
          }
        <Button disabled={!this.state.formIsValid} btnClicked={this.orderHandler} btnType="Success">
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h1>Enter your Contact Information Here:</h1>
        {form}
      </div>
    );
  }
}
