import { observer } from "mobx-react-lite";
import ProgrammCard from "../components/ProgrammCard";
import { useStores } from "../hooks/useStores";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";

const Home = observer(() => {
  const { rootStore } = useStores();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    rootStore
      .fetchPrograms()
      .catch(() => {
        messageApi.error("Ошибка загрузки программ");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {contextHolder}

      <Spin spinning={loading}>
        <section className="recs">
          <div className="container recs__container">
            <div className="main-rec">
              <ProgrammCard
                program={
                  rootStore.programs.length ? rootStore.programs[0] : null
                }
              />
            </div>
            <div className="other-recs">
              {rootStore.programs.map((program, index) => {
                if (index !== 0) {
                  return (
                    <div className="card-place">
                      <ProgrammCard key={program.id} program={program} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </section>
      </Spin>
    </>
  );
});

export default Home;
