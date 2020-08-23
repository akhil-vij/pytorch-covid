import React from "react";

import { Embed } from "semantic-ui-react";

const videos = [
  {
    id: "syXd7kgLSN8",
    thumbnail: "/assets/images/thumbnails/video_1.png",
    source: "youtube",
    active: true,
  },
  {
    id: "g9jEk_gi__g",
    thumbnail: "/assets/images/thumbnails/video_2.png",
    source: "youtube",
    active: true,
  },
  {
    id: "PWzbArPgo-o",
    thumbnail: "/assets/images/thumbnails/video_3.png",
    source: "youtube",
  },
  {
    id: "BtN-goy9VOY",
    thumbnail: "/assets/images/thumbnails/video_4.png",
    source: "youtube",
  },
  {
    id: "8PSBOZUelTc",
    thumbnail: "/assets/images/thumbnails/video_5.png",
    source: "youtube",
  },
  {
    id: "WXMpAraPZeg",
    thumbnail: "/assets/images/thumbnails/video_6.png",
    source: "youtube",
  },
  {
    id: "adB8RW4I3o4",
    thumbnail: "/assets/images/thumbnails/video_7.png",
    source: "youtube",
  },
];

function prepareEmbed() {
  return videos.map((video, index) => {
    return (
      <Embed
        id={video.id}
        placeholder={video.thumbnail}
        source={video.source}
        active={video.active}
      />
    );
  });
}

function Resources(props) {
  return <div className="app__resource"> {prepareEmbed()}</div>;
}

export default Resources;
