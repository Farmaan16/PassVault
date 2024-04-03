const Navbar = () => {
  return (
    <nav className=" bg-zinc-900 text-gray-300 ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl ">
          <span className="text-red-700">&lt;</span>
          <span>Pass</span>
          <span className="text-red-700">Vault/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4 font-bold">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="text-gray-200 bg-zinc-700  rounded-xl flex my-4 justify-center items-center hover:bg-zinc-950 ">
          <img className="invert p-1 w-8" src="icons/Github.svg" alt="Github" />
          <a
            className="font-bold px-1 "
            href="https://github.com/Farmaan16/PassVault.git"
            target="_blank"
          >
            Github
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
