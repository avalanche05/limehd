import { observer } from "mobx-react-lite";
import ProgrammsLayout from "../components/ProgrammsLayout";
import ChannelsLayout from "../components/ChannelsLayout";
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
            <ChannelsLayout />
          </div>
        </div>
      </section>
    </>
  );
});

export default Search;
