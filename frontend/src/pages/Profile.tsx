import { observer } from "mobx-react-lite";
import ProgrammsLayout from "../components/ProgrammsLayout";
import ChannelsSimplifyLayout from "../components/ChanelsSimplifyLayout";

const Profile = observer(() => {
  return (
    <>
      <section className="profile">
        <div className="container prfile__container">
          <div className="privat-info">
            <h1>Личная информация</h1>
            <p>
              Email: <span className="email">IvanIliin@misos.com</span>
            </p>
          </div>
          <div className="favourites-tvshow">
            <div className="title category-title">Избранные программы</div>
            <ProgrammsLayout />
          </div>
          <div className="favourites-channel">
            <div className="title category-title">Избранные каналы</div>
            <ChannelsSimplifyLayout />
          </div>
        </div>
      </section>
    </>
  );
});

export default Profile;
