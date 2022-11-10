import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/componnts/CSSReset";
import Menu from "../src/componnts/Menu";
import { StyledTimeline } from "../src/componnts/Timeline";

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("Angular");

  return (
    <>
      <CSSReset />
      <div>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlists={config.playlists} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.header`
  .img-perfil {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 25px;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px;
  }
  /*.img-banner {
    width: 100vw;
    height: 230px;
    left: 0px;
    top: 56px;
  }*/
`;

const StyledBanner = styled.div`
    height: 230px;
    background-image: url(${({banner}) => banner});
`;

function Header() {
  return (
    <StyledHeader>
    <StyledBanner banner={config.banner} />
      {/*{<img className="img-banner" src={config.banner} />}*/}
      <section className="user-info">
        <img
          className="img-perfil"
          src={`https://github.com/${config.github}.png`}
        />
        <div>
          <h2>{config.name}</h2>
          <p> {config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  //Statement
  //Retorno por expressão
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];

        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalzed = video.title.toLowerCase();
                  const searchValueNormalzed = searchValue.toLowerCase();
                  return titleNormalzed.includes(searchValueNormalzed);
                })
                .map((video) => {
                  return (
                    <a href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
