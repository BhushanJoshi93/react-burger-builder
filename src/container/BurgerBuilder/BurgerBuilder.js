import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-instance';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICE = {
  cheese: 0.5,
  salad: 1,
  meat: 0.5,
  bacon: 0.5
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2,
    purchasable: false, //for buy now button on Build controls
    purchasingHideShow:false, //for modal
    loading:false, //for Loading screen
    error:false //for catching error in componentDidMount
  };

  //component did mount is called after render method.
  componentDidMount(){
//    console.log("[Burger Builder Props:]",this.props);
    axios.get('/ingredients.json')
    .then(response =>{
      this.setState({
        ingredients: response.data
      })
    })
    .catch(error =>{
      this.setState({error:true});
    })
  }



  updatePurchasableState(ingredients) {
    const ingObject = { ...ingredients };
    let value = 0;
    for (let key in ingObject) {
      if (ingObject.hasOwnProperty(key)) {
        value = ingObject[key] + value;
      }
    }
    console.log(value);
    if (value <= 0) {
      this.setState({ purchasable: false });
    } else {
      this.setState({ purchasable: true });
    }
  }

  addIngredientsHandler = (type) => {
    // console.log("Type:",type);
    // console.log(this.state.ingredients[type]);
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    //make copy of the old ingredient object
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchasableState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceDeletion = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeletion;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchasableState(updatedIngredients);
  }


  purchasedHandler=()=>{
    this.setState({purchasingHideShow:true});
  }

  modalClosedHandler=()=>{
    this.setState({purchasingHideShow:false});
  }

  purchaseContinueHandler =()=>{
   // alert('You pressed Continue');

  const queryParams=[];
  for (let i in this.state.ingredients){
    //the below line would be Salad=1 and so on
    queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))

  }

  queryParams.push('price='+this.state.totalPrice);
  const queryString=queryParams.join('&');
  this.props.history.push(
    {
      pathname:'/checkout',
      search: '?'+ queryString
    }
    );
  }


  render() {

    const disabledBtnObj = { ...this.state.ingredients };
    for (let key in disabledBtnObj) {
      disabledBtnObj[key] = disabledBtnObj[key] <= 0; //this returns true or false
    }
    //salad:true,bacon:false etc etc

    let orderSummary =null;

    
    let burger = !this.state.error ? <Spinner /> : <p>Application not usable</p>
    if (this.state.ingredients){
      burger = ( 
        <Aux>
        <Burger ingredients={this.state.ingredients} /> <BuildControls
          ingredientsAdded={this.addIngredientsHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabledInfo={disabledBtnObj}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          orderNowClicked={this.purchasedHandler} /> </Aux>);

          orderSummary=  <OrderSummary
          price = {this.state.totalPrice}
          purchaseCancelled={this.modalClosedHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}/>;
       
    }
    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasingHideShow} modalClosed={this.modalClosedHandler}>
          {orderSummary}
        </Modal>
        {burger}
       
      </Aux>
    );
  }
}
export default withErrorHandler(BurgerBuilder,axios);
