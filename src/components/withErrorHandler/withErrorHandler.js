import React,{Component} from 'react';
import Modal from '../Modal/Modal';
import Aux from '../../hoc/Aux';



// The interceptor basically catches any request made by the app and interrupts it to do some logic, and eventually,
//  after it's done with the logic, it has to return the request result (whether a request config or a response) in order 
//to allow the part where the request was initiated to continue running (or even for log purposes in the request case), hence 
//returning req and res here. Also for One, we use the error property of the state object 
// in order to show the Modal conditionally. So, to control this error property and switch it
//  between true and false, we use these two interceptors which work as follows:  
 
//  1- When a request to the server is initiated, we catch it in the first interceptor
//  2- In the first interceptor, after we catch (or listen to) the request, we setState
//  error to null, and null basically evaluates to false in the condition statement we 
//  use on the Modal component. (Actually, error will be already null at this moment as
//  we defined it in the first place as null), and after that, we return the request 
//  config object (most likely for log purposes)
//  3- Then we get a response back from the server, at this moment the 
//  second interceptor listens to it and basically receives two props 
//  (or functions I'm not sure) from this response, a- the response itself
//   to return it, and b- an error if there is one.

// 4- If there is no error, the interceptor will simply return
//  the response so it can be used normally where the request was initiated.

//  5- However, if there is any problem reaching the server or fetching the data
//  correctly, then the second interceptor will set the value of the error property
//  in the state to the error object it has received from the response (and since the 
//  error property now has a value, it will evaluate to true, hence showing the Modal)

// 6- Now, if we got an error and shown the Modal once, and now the error 
// in the state has value, now imagine that we made another request, here we want
//  to make sure that the error property is empty and ready to receive any new error,
//   hence comes the real role of the first interceptor which is clearing the error property 
//   before the server responds back with the new response (although in my opinion, it's not
//    very necessary since the second interceptor overwrite whatever stored in error anyway,
//     but maybe I'm wrong and missing something!)


const withErrorHandler =(WrapperComponent, axios)=>{

   
  return  class extends Component{
        state ={
            error : null
        }

        //initially this was componentDidMount, the problem was that : the wrapped component's
        //componentDidmount will be completed first and then the componentDidMount "over here" would 
        //run because that is how the life cycle methods are.
        //LIFE CYCLE:
        //constructor=>componentWillMount=>render()=>render child => ComponendDIdmount

        componentWillMount(){
           this.reqInterceptor= axios.interceptors.request.use(req=>{
               // console.log(req);
                this.setState({error:null});
                return req;
            })

            this.resInterceptor =axios.interceptors.response.use(res =>res,error=>{
               this.setState({error:error});
            })
        }

        componentWillUnmount(){
            //the object would be created each time this file/class is called. In order to 
            // remove that we can use componentWillUnmount to remove the axios instance.
            //this will be helpful when we have multiple pages

            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);

        }

        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }

        render(){
            return(
                <Aux>
                <Modal 
                show={this.state.error} 
                modalClosed={this.errorConfirmedHandler}>

                    {/* modal component will always be there. so it will throw an error initally.
                    so we can use terneary operator */}
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrapperComponent {...this.props} />
            </Aux>
            )
        }

    } 

}

export default withErrorHandler;