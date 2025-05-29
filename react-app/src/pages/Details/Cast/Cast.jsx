import React from "react";
import "./Cast.scss";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import LazyLoadImg from "../../../components/LazyLoadImg/LazyLoadImg";
import AvatarImg from "../../../assets/avatar.png";

export default function Cast({ cast, loading }) {
  const { url } = useSelector((state) => state.home);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="castSection">
      <ContentWrapper>
        {!loading ? (
          <>
            
            <div className="sectionHeading">Top Cast</div>
            <div className="listItems">
              {cast?.map((c, index) => {
                return (
                  <div key={index} className="listItem">
                    <div className="profileImg">
                      <LazyLoadImg
                        src={
                          c.profile_path
                            ? url.img_url + c.profile_path
                            : AvatarImg
                        }
                      />
                    </div>
                    <div className="name">{c.name}</div>
                    <div className="character">{c.character}</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="castSkeleton">
            {Array.from({ length: 5 }, (_, index) => (
              <React.Fragment key={index}>{loadingSkeleton()}</React.Fragment> //rendering skeleton 5 times
            ))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}
