import { Link } from "react-router-dom";

export default function SearchItem({ item }) {
  return (
    <Link to={item.data.permalink}>
      <div key={item.data.id} className=" bg-red-400 p-5 m-5 ">
        <h3>{item.data.title}</h3>
      </div>
    </Link>
  );
}
