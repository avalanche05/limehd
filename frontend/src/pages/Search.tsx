import { observer } from "mobx-react-lite";
import ProgrammsLayout from "../components/ProgrammsLayout";

const ChannelsSimplifyCard = observer(() => {
  return (
    <>
      <div className="channel-simplify-card">
        <div className="channel-image">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/MatchTV_Logo.svg/1200px-MatchTV_Logo.svg.png"
            alt="Channel logo"
          />
        </div>
        <div className="channel-info">
          <span className="name">Матч!</span>
          <p className="desc">Краткое описание</p>
        </div>
      </div>
    </>
  );
});

const ChannelsSimplifyLayout = observer(() => {
  return (
    <>
      <div className="row">
        <div className="card-place">
          <ChannelsSimplifyCard />
        </div>
        <div className="card-place">
          <ChannelsSimplifyCard />
        </div>
        <div className="card-place">
          <ChannelsSimplifyCard />
        </div>
        <div className="card-place">
          <ChannelsSimplifyCard />
        </div>
      </div>
    </>
  );
});

const Search = observer(() => {
  return (
    <>
      <section className="search-response">
        <div className="container search__container">
          <span className="title">Вот что мы нашли по запросу: ""</span>
          <div className="tvshow-response">
            <div className="title category-title category-title-programms">
              Программы
            </div>
            <ProgrammsLayout />
          </div>
          <div className="channel-response">
            <div className="title category-title">Каналы</div>
            <ChannelsSimplifyLayout />
          </div>
        </div>
      </section>
    </>
  );
});

export default Search;
