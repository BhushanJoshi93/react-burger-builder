import React,{Component} from "react";
import Aux from '../../hoc/Aux'
import CustomButton from '../UI/CustomButton/CustomButton';

class OrderSummary extends Component
{
  componentWillUpdate(){
    //console.log("OderSUmamary will update");
  }
  render(){

      const ingredientSummary=Object.keys(this.props.ingredients).map(
          igkey=>{
            //Cheese:1
              return <li key={igkey}> <span style={{textTransform:"capitalize"}}>{igkey}</span>: {this.props.ingredients[igkey]}</li>
          }
      );
    return (
      <Aux>
          <h3>Your Order:</h3>
          <p>Here is your order summary</p>
          <ul>
          {ingredientSummary}
          </ul>
          <p><strong>Total Price: {this.props.price}</strong></p>
          <CustomButton btnClicked={this.props.purchaseCancelled} btnType={"Success"}>CANCEL</CustomButton>
          <CustomButton btnClicked={this.props.purchaseContinued} btnType={"Danger"}>CONTINUE</CustomButton>
      </Aux>
    );
  }
}

export default OrderSummary;
