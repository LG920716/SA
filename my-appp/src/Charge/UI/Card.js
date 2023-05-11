import "./Card.css";

export default function Card(props) {
  const classes = "myCard " + props.className;

  return <div className={classes}>{props.children}</div>;
}
