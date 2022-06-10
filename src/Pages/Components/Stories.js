import { useState, useEffect } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { faker } from "@faker-js/faker";

export const USERS = [];

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    registeredAt: faker.date.past(),
  };
}
Array.from({ length: 25 }).forEach(() => {
  USERS.push(createRandomUser());
});

function Stories() {
  const users = USERS;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 4,
    },
  });

  return (
    <Box pt={"20px"}>
      <Box className="navigation-wrapper ">
        <div ref={sliderRef} className="keen-slider">
          {users.map((profiles) => {
            return (
              <Box
                pl={{ xl: " 24", base: "6" }}
                pt="5"
                className="keen-slider__slide "
              >
                <Avatar
                  className="outline"
                  bg={"#1B1B1B"}
                  size="md"
                  src={profiles.avatar}
                />
                <Text pt={2} fontSize={"xs"} noOfLines={1}>
                  {profiles.username}
                </Text>
              </Box>
            );
          })}
        </div>
        {loaded && instanceRef.current && (
          <>
            <ArrowBackIcon
              className="arrow arrow--left"
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <ArrowForwardIcon
              className="arrow arrow--right"
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </Box>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </Box>
  );
}

export default Stories;
