const Footer = () => {
  return (
    <div className="bg-zinc-900 text-gray-200 flex flex-col justify-center items-center  w-full p-3">
      {/* <div className="logo font-bold text-gray-300 ">
        <span className="text-red-700">&lt;</span>
        <span>Pass</span>
        <span className="text-red-700">Vault/&gt;</span>
      </div> */}

      <div className="flex justify-center items-center font-bold ">
        Created by
        <img
          className=" rounded-full  w-5 mx-1 "
          src="https://avatars.githubusercontent.com/u/129519857?v=4"
          alt=""
        />{" "}
        <a
          target="_blank"
          className="hover:bg-zinc-800  rounded-2xl px-2 py-0.5"
          href="https://github.com/Farmaan16"
        >
          Farmaan
        </a>
      </div>
    </div>
  );
};

export default Footer;
