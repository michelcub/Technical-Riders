import { useState } from "react";

import useLoginContext from "../context/LoginContext";
import useAppContext from "../context/AppContext";
import RoleSelectionCards from "../components/RoleSelectionCards";
import { RoleMusician } from "../components/RoleMusician";
import { RoleManager } from "../components/RoleManager";
import { RoleTechnician } from "../components/RoleTechnician";

import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";

const Dashboard = () => {
  const [isSelect, setIsSelect] = useState(null);

  const { store } = useLoginContext();
  const { store: appStore, actions: appActions } = useAppContext();

  if (
    (store?.venueManagerID === null &&
      store?.musicianID === null &&
      store?.technicianID === null) ||
    appStore?.selectNewRole
  ) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-base-300">
        <h1 className="flex justify-center mt-10 text-4xl font-bold">
          ¿A qué te dedicas?
        </h1>
        <h6 className="flex justify-center mt-4 font-bold text-1xl">
          Selecciona tu rol
        </h6>
        <RoleSelectionCards />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-no-repeat bg-fixed bg-[url('https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
      <div
        className={`w-full xl:w-4/7 md:mx-10 backdrop-blur-md bg-base-200/50 p-5 rounded-lg my-10`}
      >
        <div className="flex flex-col md:flex-row h-fit py-10 md:py-16 xl:py-32 max-w-screen justify-center items-center md:gap-12 shadow-md ">
          <div className="text-center bg-base-200 p-10 rounded-xl">
            <div className="flex">
              <img
                src={
                  store?.myUser?.img ||
                  `https://ui-avatars.com/api/?name=${store.myUser?.username}`
                }
                className="w-40 h-40 mx-auto mb-4 rounded-full"
                alt={store?.myUser?.username || "username"}
              />

              {store?.myUser?.img !== null ? (
                <button
                  onClick={() => window.my_modal_1.showModal()}
                  className="absolute p-2 mx-auto mt-32 text-2xl text-white rounded-full ms-48 bg-slate-500"
                >
                  <HiOutlinePencil />
                </button>
              ) : (
                <button
                  onClick={() => window.my_modal_1.showModal()}
                  className="absolute p-2 mx-auto mt-32 text-2xl text-white rounded-full ms-48 bg-slate-500"
                >
                  <AiOutlinePlus />
                </button>
              )}
            </div>
            <h1 className="text-lg">{store.myUser?.username}</h1>
            <div className="flex items-center justify-center p-4 my-8 space-x-24 rounded shadow-md bg-base-300">
              <p>Mensajes</p>
              <button type="button" className="w-32 h-8 btn btn-primary">
                Leer
              </button>
            </div>
            <div className="flex justify-center w-full p-4 gap-3 ">
              <button
                onClick={() => setIsSelect("musician")}
                className={` btn-secondary ${
                  store.musicianID !== null ? "btn" : "hidden"
                } ${isSelect === "musician" ? "btn-active" : ""}`}
              >
                Músico
              </button>
              <button
                onClick={() => setIsSelect("manager")}
                className={` btn-secondary ${
                  store.venueManagerID !== null ? "btn" : "hidden"
                } ${isSelect === "manager" ? "btn-active" : ""}`}
              >
                Promotor
              </button>
              <button
                onClick={() => setIsSelect("technician")}
                className={` btn-secondary ${
                  store.technicianID !== null ? "btn" : "hidden"
                } ${isSelect === "technician" ? "btn-active" : ""}`}
              >
                Técnico
              </button>
            </div>

            {store?.venueManagerID !== null &&
            store?.musicianID !== null &&
            store?.technicianID !== null ? (
              ""
            ) : (
              <button
                onClick={appActions.handleNewRoleSelection}
                type="button"
                className=" btn btn-primary"
              >
                Añadir otro rol
              </button>
            )}
          </div>
          <section className="container w-full md:w-1/2  px-4  shadow-md text-center bg-base-200 p-10 rounded-xl">
            {isSelect === "musician" ? (
              <RoleMusician />
            ) : isSelect === "manager" ? (
              <RoleManager />
            ) : isSelect === "technician" ? (
              <RoleTechnician />
            ) : null}
          </section>
        </div>

        <dialog id="my_modal_1" className="modal">
          <form
            method="dialog"
            className="flex flex-col items-center modal-box"
          >
            <h3 className="text-lg font-bold">Hello!</h3>
            <h4>Agrega tu foto de perfil</h4>
            <div className="flex justify-center modal-action">
              <input onChange={appActions.handleChargeImgProfile} type="file" />
              {/* if there is a button in form, it will close the modal */}
            </div>
            <div className="flex justify-center w-full gap-3 mt-8">
              <button
                onClick={
                  store?.myUser.img === null
                    ? appActions.handleSaveImgProfile
                    : appActions.handleUpdateImgProfile
                }
                type="button"
                className="btn btn-success"
              >
                {store?.myUser?.img === null ? "Save" : "Update"}
              </button>
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Dashboard;
