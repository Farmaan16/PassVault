import { useEffect, useRef, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eye2.png")) {
      ref.current.src = "icons/eyecross3.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eye2.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    console.log(form);
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setForm({ site: "", username: "", password: "" });
      // console.log(...passwordArray, form);
    } else {
      alert("Please fill all the fields");
    }
  };
  const deletePassword = (id) => {
    console.log("Deleting password with id", id);
    let c = window.confirm("Are you sure you want to delete this password?");
    if (c) {
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }

    // console.log(...passwordArray, form);
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    toast("Copied: " + text + "", {
      position: "bottom-left",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition="Zoom"
      />

      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-red-300 opacity-20 blur-[100px]"></div>
      </div>

      <div className=" md:mycontainer  p-2 pt-3 min-h-[92vh] ">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-red-700">&lt;</span>
          <span>Pass</span>
          <span className="text-red-700">Vault/&gt;</span>
        </h1>
        <p className="text-black text-lg text-center font-bold">
          Your own password manager
        </p>
        <div className=" flex  flex-col text-black p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website url"
            className="rounded-full border border-red-900 text-black w-full p-4 py-1"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
              className="rounded-full border border-red-900 text-black w-full p-4 py-1"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                className="rounded-full border border-red-900 text-black w-full p-4 py-1"
              />
              <span
                style={{ width: "30px", height: "30px" }}
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2"
                  style={{ width: "100%", height: "100%" }}
                  src="icons/eye2.png"
                  alt="Eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className=" flex rounded-full   bg-red-600 text-black hover:bg-red-700 gap-2 border border-black justify-center items-center font-bold px-4 py-1 w-fit"
          >
            {" "}
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <div className="flex justify-center">
            <h2 className="font-bold text-2xl py-4  ">Your Passwords</h2>
          </div>
          {passwordArray.length === 0 && (
            <div className="text-center">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
              <thead className="bg-red-700 text-gray">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-red-100 ">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="  border border-white py-2 text-center ">
                      <div className="flex items-center justify-center">
                        {" "}
                        <a
                          className="hover:underline"
                          href={item.site}
                          target="_blank"
                        >
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "5px",
                              paddingLeft: "5px",
                            }}
                            src="https://cdn.lordicon.com/yrbmguoo.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" border border-white py-2 text-center">
                      <div className="flex items-center justify-center">
                        <span> {item.username}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "5px",
                              paddingLeft: "5px",
                            }}
                            src="https://cdn.lordicon.com/yrbmguoo.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" border border-white py-2 text-center ">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "5px",
                              paddingLeft: "5px",
                            }}
                            src="https://cdn.lordicon.com/yrbmguoo.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" border border-white py-2 text-center ">
                      <span
                        className="cursor-pointer mx-4"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{
                            width: "20px",
                            height: "20px",
                            paddingTop: "5px",
                            paddingLeft: "5px",
                          }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-4"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{
                            width: "20px",
                            height: "20px",
                            paddingTop: "5px",
                            paddingLeft: "5px",
                          }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
