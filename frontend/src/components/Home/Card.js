import { CardImg } from "../../assets";

const Card = ({ name, icon, Link }) => {
  return (
    <div className="animate-fade-right animate-once">
      <a href={Link}>
        <div className="relative w-32 h-28 sm:w-44 sm:h-40 hover:scale-105">
          <img
            src={CardImg}
            className="rounded-[10px] h-28 sm:h-40 drop-shadow-xl shadow-gray-500"
            alt="Card Img"
          />
          <div className="absolute inset-0 flex flex-col text-xl font-bold text-white">
            <div className="flex justify-end m-3 text-4xl sm:text-5xl sm:m-7">
              {icon && <ion-icon name={icon}></ion-icon>}
            </div>
            <div className="flex items-end mt-3 ml-2 text-sm text-blue-900 sm:m-5 sm:text-base">
              {name}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
