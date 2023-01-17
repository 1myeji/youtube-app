import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { instance } from "../api/api";
import { timeAgo } from "../utils/timeAgo";

const SearchDetail = ({ videoId, duration, views, time }: any) => {
  const [videoResult, setVideoResult] = useState<any>("");
  useEffect(() => {
    videoData();
  }, []);

  const videoData = async () => {
    const response = await instance.get(
      `/videos?part=snippet&part=contentDetails&part=player&part=statistics&id=${videoId}`,
    );
    setVideoResult(response.data.items[0]);
  };

  return (
    <>
      {videoResult && duration ? (
        <Duration>
          <span>{videoResult.contentDetails.duration}</span>
        </Duration>
      ) : null}
      {videoResult && views ? (
        <span>조회수 {videoResult.statistics.viewCount}</span>
      ) : null}
      {videoResult && time ? (
        <span>{timeAgo(videoResult.snippet.publishedAt)}</span>
      ) : null}
    </>
  );
};

const Duration = styled.div`
  padding: 3px 4px;
  background-color: red;
  position: absolute;
  bottom: -15px;
  right: 60px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export default SearchDetail;
