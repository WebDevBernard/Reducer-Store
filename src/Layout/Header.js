import classes from "./Header.module.css";
import meals from "../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
export default function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onHandleOpenModal} />
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="Table full of food" />
      </div>
    </>
  );
}
