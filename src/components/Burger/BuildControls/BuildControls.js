import React from "react";
import SingleBuildControl from "./SingleBuildControl/SingleBuildControl";
import classes from "./buildControls.css";

const controls = [
  { label: "Cheese", type: "cheese" },
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" }
];

const BuildControl = (props) => {
  console.log("purchasable", props.purchasable);
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((current) => {
        return (
          <SingleBuildControl
            key={current.label}
            label={current.label}
            added={() => props.ingredientsAdded(current.type)}
            removed={() => props.ingredientsRemoved(current.type)}
            disabled={props.disabledInfo[current.type]}
          />
        );
      })}
      <button 
      className={classes.OrderButton} 
      disabled={!props.purchasable}
      onClick ={props.orderNowClicked}
      >
        BUY NOW
      </button>
    </div>
  );
};

export default BuildControl;
