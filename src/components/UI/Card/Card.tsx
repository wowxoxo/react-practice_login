import React from "react";

import classes from "./Card.module.css";

interface CardProps {
  className?: string;
  // style?: Object;
  style?: React.CSSProperties;
  // children: JSX.Element | JSX.Element[];
  // children: React.ReactChildren | React.ReactChild[];
  children: React.ReactNode;
}

// TODO
const Card = (props: CardProps) => {
  const cls = `${classes.card} ${props.className ? props.className : ""}`;
  const cls2 = [classes.card, props.className ? props.className : null];
  return (
    <div className={cls2.filter((cls) => cls).join(" ")} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
