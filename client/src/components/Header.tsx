const Header = () => {
  return (
    <header
      id="header"
      data-testid="header"
      className="flex justify-between p-8 align-middle items-center w-full md:px-10 lg:px-20 xl:px-60"
    >
      <div id="logo">
        <a href="/">
          <span>Savora</span>
        </a>
      </div>
      <nav id="navbar" className="">
        <ul className="flex">
          <li className="p-2 mx-2">
            <a href="/">Dashboard</a>
          </li>
          <li className="p-2 mx-2">
            <a href="/expenses">Expenses</a>
          </li>
          <li className="p-2 mx-2">
            <a href="/options">Options</a>
          </li>
          <li className="p-2 mx-2">
            <a href="/help">Help</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
